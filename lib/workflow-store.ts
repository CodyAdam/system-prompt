import {
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import { toast } from "sonner";
import z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { computeNode, ComputeNodeInput } from "./compute";
import { nanoid } from "nanoid";
import { newWorkflow, templates } from "./templates";

// Zod schemas for validation
const nodeSchema = z.object({
  id: z.string(),
  data: z.record(z.unknown()).default({}),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  width: z.number().optional(),
  height: z.number().optional(),
  type: z.string().optional(),
});

const edgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  type: z.string().optional(),
  animated: z.boolean().optional(),
});

const workflowDataSchema = z.object({
  name: z.string(),
  nodes: z.array(nodeSchema),
  edges: z.array(edgeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Workflow State Management
export interface Workflow {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface WorkflowState {
  workflows: Workflow[];
  currentWorkflowId: string | null;
  abortController: AbortController;

  // Workflow management
  createWorkflow: (name?: string) => string;
  deleteWorkflow: (id: string) => void;
  switchWorkflow: (id: string) => void;
  updateWorkflowName: (id: string, name: string) => void;
  importFromJson: (json: string) => void;

  // Current workflow getters
  getCurrentWorkflow: () => Workflow | null;
  getNodes: () => Node[];
  getEdges: () => Edge[];
  getNode: (nodeId: string) => Node | null;

  // React Flow handlers
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  // Node/Edge management
  updateNodeData: (nodeId: string, data: Record<string, unknown>) => void;
  updateEdgeProps: (edgeId: string, props: Partial<Edge>) => void;
  addNode: (node: Omit<Node, "id">) => void;
  removeNode: (nodeId: string) => void;
  addEdgeToWorkflow: (edge: Omit<Edge, "id">) => void;

  // Abort controller helper
  getAbortSignal: () => AbortSignal;

  // Node execution
  runNode: (nodeId: string, firstRun?: boolean) => void;
  abortAllOperations: () => void;
}

const generateId = () => nanoid();

// Create consistent empty arrays to avoid infinite loops
const EMPTY_NODES: Node[] = [];
const EMPTY_EDGES: Edge[] = [];

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      abortController: new AbortController(),
      workflows: templates,
      currentWorkflowId: templates[0].id,

      createWorkflow: (name?: string) => {
        const id = generateId();
        const workflow: Workflow = {
          id,
          name: name || `Workflow ${get().workflows.length + 1}`,
          nodes: [...newWorkflow.nodes],
          edges: [...newWorkflow.edges],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          workflows: [...state.workflows, workflow],
          currentWorkflowId: id,
        }));

        return id;
      },

      deleteWorkflow: (id: string) => {
        set((state) => {
          const newWorkflows = state.workflows.filter((workflow) => workflow.id !== id);
          const newCurrentId =
            state.currentWorkflowId === id ? (newWorkflows.length > 0 ? newWorkflows[0].id : null) : state.currentWorkflowId;

          return {
            workflows: newWorkflows,
            currentWorkflowId: newCurrentId,
          };
        });
      },

      getAbortSignal: () => {
        return get().abortController.signal;
      },

      switchWorkflow: (id: string) => {
        // Abort current operations
        get().abortController.abort();

        const workflow = get().workflows.find((c) => c.id === id);
        if (workflow) {
          set({
            currentWorkflowId: id,
            abortController: new AbortController(), // Create new controller for new workflow
            workflows: get().workflows.map((c) =>
              c.id === id
                ? {
                    ...c,
                    edges: c.edges.map((e) => ({ ...e, animated: false })),
                    nodes: c.nodes.map((n) => ({ ...n, data: { ...n.data, loading: false } })),
                  }
                : c
            ),
          });
        }
      },

      importFromJson: (json: string) => {
        try {
          const jsonData = JSON.parse(json);
          const validationResult = workflowDataSchema.safeParse(jsonData);

          if (!validationResult.success) {
            const errorMessage = validationResult.error.issues
              .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
              .join(", ");
            toast.error(`Invalid workflow format: ${errorMessage}`);
            return;
          }
          const id = generateId();
          const workflowData = validationResult.data;
          const newWorkflow: Workflow = {
            id,
            name: workflowData.name,
            nodes: workflowData.nodes,
            edges: workflowData.edges,
            updatedAt: new Date(),
            createdAt: new Date(),
          };
          set((state) => ({
            workflows: [...state.workflows, newWorkflow],
            currentWorkflowId: id,
          }));
        } catch (error) {
          toast.error("Failed to import workflow", {
            description: "Check the console for more details.",
          });
          console.error(error);
        }
      },

      updateWorkflowName: (id: string, name: string) => {
        set((state) => ({
          workflows: state.workflows.map((workflow) =>
            workflow.id === id ? { ...workflow, name, updatedAt: new Date() } : workflow
          ),
        }));
      },

      getCurrentWorkflow: () => {
        const { workflows, currentWorkflowId } = get();
        return workflows.find((workflow) => workflow.id === currentWorkflowId) || null;
      },

      getNodes: () => {
        const currentWorkflow = get().getCurrentWorkflow();
        return currentWorkflow?.nodes || EMPTY_NODES;
      },

      getEdges: () => {
        const currentWorkflow = get().getCurrentWorkflow();
        return currentWorkflow?.edges || EMPTY_EDGES;
      },

      onNodesChange: (changes) => {
        set((state) => {
          const currentWorkflow = state.getCurrentWorkflow();
          if (!currentWorkflow) return state;

          const updatedNodes = applyNodeChanges(changes, currentWorkflow.nodes);

          return {
            workflows: state.workflows.map((workflow) =>
              workflow.id === currentWorkflow.id ? { ...workflow, nodes: updatedNodes, updatedAt: new Date() } : workflow
            ),
          };
        });
      },

      onEdgesChange: (changes) => {
        set((state) => {
          const currentWorkflow = state.getCurrentWorkflow();
          if (!currentWorkflow) return state;

          const updatedEdges = applyEdgeChanges(changes, currentWorkflow.edges);

          return {
            workflows: state.workflows.map((workflow) =>
              workflow.id === currentWorkflow.id ? { ...workflow, edges: updatedEdges, updatedAt: new Date() } : workflow
            ),
          };
        });
      },

      onConnect: (connection) => {
        set((state) => {
          const currentWorkflow = state.getCurrentWorkflow();
          if (!currentWorkflow) return state;

          const updatedEdges = addEdge(connection, currentWorkflow.edges);

          return {
            workflows: state.workflows.map((workflow) =>
              workflow.id === currentWorkflow.id ? { ...workflow, edges: updatedEdges, updatedAt: new Date() } : workflow
            ),
          };
        });
      },

      updateNodeData: (nodeId: string, data: Record<string, unknown>) => {
        set((state) => {
          const currentWorkflow = state.getCurrentWorkflow();
          if (!currentWorkflow) return state;

          const updatedNodes = currentWorkflow.nodes.map((node) =>
            node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
          );

          return {
            workflows: state.workflows.map((workflow) =>
              workflow.id === currentWorkflow.id ? { ...workflow, nodes: updatedNodes, updatedAt: new Date() } : workflow
            ),
          };
        });
      },

      updateEdgeProps: (edgeId: string, props: Partial<Edge>) => {
        set((state) => {
          const currentWorkflow = state.getCurrentWorkflow();
          if (!currentWorkflow) return state;

          const updatedEdges = currentWorkflow.edges.map((edge) => (edge.id === edgeId ? { ...edge, ...props } : edge));

          return {
            workflows: state.workflows.map((workflow) =>
              workflow.id === currentWorkflow.id ? { ...workflow, edges: updatedEdges, updatedAt: new Date() } : workflow
            ),
          };
        });
      },

      addNode: (nodeData) => {
        const id = generateId();
        const newNode: Node = { ...nodeData, id, selected: true };

        set((state) => {
          const currentWorkflow = state.getCurrentWorkflow();
          if (!currentWorkflow) return state;

          return {
            workflows: state.workflows.map((workflow) =>
              workflow.id === currentWorkflow.id
                ? {
                    ...workflow,
                    nodes: [...workflow.nodes.map((node) => ({ ...node, selected: false })), newNode],
                    updatedAt: new Date(),
                  }
                : workflow
            ),
          };
        });
      },

      removeNode: (nodeId: string) => {
        set((state) => {
          const currentWorkflow = state.getCurrentWorkflow();
          if (!currentWorkflow) return state;

          const updatedNodes = currentWorkflow.nodes.filter((node) => node.id !== nodeId);
          const updatedEdges = currentWorkflow.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);

          return {
            workflows: state.workflows.map((workflow) =>
              workflow.id === currentWorkflow.id
                ? {
                    ...workflow,
                    nodes: updatedNodes,
                    edges: updatedEdges,
                    updatedAt: new Date(),
                  }
                : workflow
            ),
          };
        });
      },

      addEdgeToWorkflow: (edgeData) => {
        const id = generateId();
        const newEdge: Edge = { ...edgeData, id };

        set((state) => {
          const currentWorkflow = state.getCurrentWorkflow();
          if (!currentWorkflow) return state;

          return {
            workflows: state.workflows.map((workflow) =>
              workflow.id === currentWorkflow.id
                ? {
                    ...workflow,
                    edges: [...workflow.edges, newEdge],
                    updatedAt: new Date(),
                  }
                : workflow
            ),
          };
        });
      },

      getNode: (nodeId: string) => {
        const node =
          get()
            .getNodes()
            .find((node) => node.id === nodeId) || null;
        return node;
      },

      runNode: async (nodeId: string, firstRun = false) => {
        const node = get().getNode(nodeId);
        if (!node || !node.type || node.data.loading) return;

        const abortSignal = get().abortController.signal;

        // Check if execution is aborted
        if (abortSignal?.aborted) return;

        if (firstRun) {
          // recursively make all child dirty
          function makeChildDirty(nodeId: string) {
            const childEdges = get()
              .getEdges()
              .filter((e) => e.source === nodeId);
            const childNodes = get()
              .getNodes()
              .filter((n) => childEdges.some((e) => e.target === n.id));
            childNodes.forEach((n) => {
              get().updateNodeData(n.id, { dirty: true });
              makeChildDirty(n.id);
            });
          }
          makeChildDirty(nodeId);
        }

        const parentEdges = get()
          .getEdges()
          .filter((e) => e.target === nodeId);
        parentEdges.forEach((e) => {
          get().updateEdgeProps(e.id, { animated: true });
        });

        const parentNodes = get()
          .getNodes()
          .filter((n) => parentEdges.some((e) => e.source === n.id))
          .sort((a, b) => a.position.x - b.position.x);
        const inputs: ComputeNodeInput[] = [];

        for (const n of parentNodes) {
          // Check if execution is aborted
          if (abortSignal?.aborted) {
            // Clean up animations if aborted
            parentEdges.forEach((e) => {
              get().updateEdgeProps(e.id, { animated: false });
            });
            return;
          }

          const parsedData = z
            .object({
              output: z.string().optional(),
              dirty: z.boolean().optional(),
              loading: z.boolean().optional(),
              label: z.string().optional(),
            })
            .safeParse(n.data);

          if (!parsedData.success || parsedData.data.dirty || parsedData.data.output === undefined) {
            // output missing, we need to run the parent node or is dirty
            get().runNode(n.id);
            return;
          }
          inputs.push({
            output: parsedData.data.output,
            label: parsedData.data.label,
          });
        }

        // Check if execution is aborted before starting computation
        if (abortSignal?.aborted) {
          parentEdges.forEach((e) => {
            get().updateEdgeProps(e.id, { animated: false });
          });
          return;
        }

        const nodeData = node.data;
        get().updateNodeData(nodeId, {
          ...nodeData,
          loading: true,
        });

        // Create abortable timeout promise
        const timeoutPromise = new Promise<typeof nodeData>((resolve, reject) => {
          const timeout = setTimeout(
            () =>
              resolve({
                ...nodeData,
                error: "Node execution timed out after 500 seconds",
              }),
            500000
          );

          abortSignal?.addEventListener("abort", () => {
            clearTimeout(timeout);
            reject(new Error("Operation was aborted"));
          });
        });

        console.log("Running node", node.type);

        let newData: typeof nodeData;
        try {
          newData = await Promise.race([computeNode(node.type, inputs, nodeData, abortSignal, nodeId), timeoutPromise]);
        } catch (error) {
          // Handle abort or other errors
          parentEdges.forEach((e) => {
            get().updateEdgeProps(e.id, { animated: false });
          });

          get().updateNodeData(nodeId, {
            ...nodeData,
            loading: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
          return;
        }

        // Check if execution is aborted after computation
        if (abortSignal?.aborted) {
          parentEdges.forEach((e) => {
            get().updateEdgeProps(e.id, { animated: false });
          });
          get().updateNodeData(nodeId, {
            ...nodeData,
            loading: false,
          });
          return;
        }

        parentEdges.forEach((e) => {
          get().updateEdgeProps(e.id, { animated: false });
        });

        get().updateNodeData(nodeId, {
          ...newData,
          loading: false,
        });

        if (newData?.error) {
          // stop here
          return;
        }

        // Check if execution is aborted before running connected nodes
        if (abortSignal?.aborted) return;

        // get all edges that are connected to the node
        const connectedEdges = get()
          .getEdges()
          .filter((e) => e.source === nodeId);
        const connectedNodes = get()
          .getNodes()
          .filter((n) => connectedEdges.some((e) => e.target === n.id));

        // run all of them
        connectedNodes.forEach((n) => {
          get().runNode(n.id);
        });
      },

      abortAllOperations: () => {
        // Abort current operations
        get().abortController.abort();

        // Create new controller and reset all loading states
        set((state) => ({
          abortController: new AbortController(),
          workflows: state.workflows.map(getCleanedWorkflow),
        }));
      },
    }),
    {
      name: "workflow-storage",
      partialize: (state) => ({
        workflows: state.workflows.map(getCleanedWorkflow),
        currentWorkflowId: state.currentWorkflowId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.abortController = new AbortController();
        }
      },
    }
  )
);

export function getCleanedWorkflow(workflow: Workflow) {
  return {
    ...workflow,
    edges: workflow.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      animated: false,
    })),
    nodes: workflow.nodes.map((node) => ({
      id: node.id,
      data: { ...node.data, loading: false },
      position: node.position,
      width: node.width,
      height: node.height,
      type: node.type,
    })),
  };
}
