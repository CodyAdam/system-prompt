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

const canvasDataSchema = z.object({
  name: z.string(),
  nodes: z.array(nodeSchema),
  edges: z.array(edgeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Canvas State Management
export interface Canvas {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CanvasState {
  canvases: Canvas[];
  currentCanvasId: string | null;
  abortController: AbortController;

  // Canvas management
  createCanvas: (name?: string) => string;
  deleteCanvas: (id: string) => void;
  switchCanvas: (id: string) => void;
  updateCanvasName: (id: string, name: string) => void;
  importFromJson: (json: string) => void;

  // Current canvas getters
  getCurrentCanvas: () => Canvas | null;
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
  addEdgeToCanvas: (edge: Omit<Edge, "id">) => void;

  // Abort controller helper
  getAbortSignal: () => AbortSignal;

  // Node execution
  runNode: (nodeId: string, firstRun?: boolean) => void;
  abortAllOperations: () => void;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Create consistent empty arrays to avoid infinite loops
const EMPTY_NODES: Node[] = [];
const EMPTY_EDGES: Edge[] = [];

const defaultNodes: Node[] = [
  {
    id: "1",
    data: { prompt: "Yesterday, I seen a dog in the park, and he's owner was throwing a ball." },
    position: { x: 0, y: 0 },
    width: 500,
    height: 200,
    type: "prompt",
  },
  {
    id: "2",
    data: { systemPrompt: "proofread this text", modelId: undefined },
    position: { x: 0, y: 300 },
    width: 500,
    height: 200,
    type: "ai",
  },
  {
    id: "3",
    data: { text: undefined },
    position: { x: 0, y: 600 },
    width: 600,
    height: 600,
    type: "markdown",
  },
];

const defaultEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2", type: "default", animated: false },
  { id: "2-3", source: "2", target: "3", type: "default", animated: false },
];

export const useCanvasStore = create<CanvasState>()(
  persist(
    (set, get) => ({
      abortController: new AbortController(),
      canvases: [],
      currentCanvasId: null,

      createCanvas: (name?: string) => {
        const id = generateId();
        const newCanvas: Canvas = {
          id,
          name: name || `Canvas ${get().canvases.length + 1}`,
          nodes: [...defaultNodes],
          edges: [...defaultEdges],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          canvases: [...state.canvases, newCanvas],
          currentCanvasId: id,
        }));

        return id;
      },

      deleteCanvas: (id: string) => {
        set((state) => {
          const newCanvases = state.canvases.filter((canvas) => canvas.id !== id);
          const newCurrentId =
            state.currentCanvasId === id ? (newCanvases.length > 0 ? newCanvases[0].id : null) : state.currentCanvasId;

          return {
            canvases: newCanvases,
            currentCanvasId: newCurrentId,
          };
        });
      },

      getAbortSignal: () => {
        return get().abortController.signal;
      },

      switchCanvas: (id: string) => {
        // Abort current operations
        get().abortController.abort();

        const canvas = get().canvases.find((c) => c.id === id);
        if (canvas) {
          set({
            currentCanvasId: id,
            abortController: new AbortController(), // Create new controller for new canvas
            canvases: get().canvases.map((c) =>
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
          const validationResult = canvasDataSchema.safeParse(jsonData);

          if (!validationResult.success) {
            const errorMessage = validationResult.error.issues
              .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
              .join(", ");
            toast.error(`Invalid canvas format: ${errorMessage}`);
            return;
          }

          const canvasData = validationResult.data;
          const id = generateId();
          const newCanvas: Canvas = {
            id,
            name: canvasData.name,
            nodes: canvasData.nodes as Node[],
            edges: canvasData.edges as Edge[],
            updatedAt: canvasData.updatedAt || new Date(),
            createdAt: canvasData.createdAt || new Date(),
          };
          set((state) => ({
            canvases: [...state.canvases, newCanvas],
            currentCanvasId: id,
          }));
        } catch (error) {
          toast.error("Failed to import canvas", {
            description: "Check the console for more details.",
          });
          console.error(error);
        }
      },

      updateCanvasName: (id: string, name: string) => {
        set((state) => ({
          canvases: state.canvases.map((canvas) =>
            canvas.id === id ? { ...canvas, name, updatedAt: new Date() } : canvas
          ),
        }));
      },

      getCurrentCanvas: () => {
        const { canvases, currentCanvasId } = get();
        return canvases.find((canvas) => canvas.id === currentCanvasId) || null;
      },

      getNodes: () => {
        const currentCanvas = get().getCurrentCanvas();
        return currentCanvas?.nodes || EMPTY_NODES;
      },

      getEdges: () => {
        const currentCanvas = get().getCurrentCanvas();
        return currentCanvas?.edges || EMPTY_EDGES;
      },

      onNodesChange: (changes) => {
        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          const updatedNodes = applyNodeChanges(changes, currentCanvas.nodes);

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id ? { ...canvas, nodes: updatedNodes, updatedAt: new Date() } : canvas
            ),
          };
        });
      },

      onEdgesChange: (changes) => {
        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          const updatedEdges = applyEdgeChanges(changes, currentCanvas.edges);

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id ? { ...canvas, edges: updatedEdges, updatedAt: new Date() } : canvas
            ),
          };
        });
      },

      onConnect: (connection) => {
        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          const updatedEdges = addEdge(connection, currentCanvas.edges);

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id ? { ...canvas, edges: updatedEdges, updatedAt: new Date() } : canvas
            ),
          };
        });
      },

      updateNodeData: (nodeId: string, data: Record<string, unknown>) => {
        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          const updatedNodes = currentCanvas.nodes.map((node) =>
            node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
          );

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id ? { ...canvas, nodes: updatedNodes, updatedAt: new Date() } : canvas
            ),
          };
        });
      },

      updateEdgeProps: (edgeId: string, props: Partial<Edge>) => {
        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          const updatedEdges = currentCanvas.edges.map((edge) => (edge.id === edgeId ? { ...edge, ...props } : edge));

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id ? { ...canvas, edges: updatedEdges, updatedAt: new Date() } : canvas
            ),
          };
        });
      },

      addNode: (nodeData) => {
        const id = generateId();
        const newNode: Node = { ...nodeData, id, selected: true };

        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id
                ? {
                    ...canvas,
                    nodes: [...canvas.nodes.map((node) => ({ ...node, selected: false })), newNode],
                    updatedAt: new Date(),
                  }
                : canvas
            ),
          };
        });
      },

      removeNode: (nodeId: string) => {
        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          const updatedNodes = currentCanvas.nodes.filter((node) => node.id !== nodeId);
          const updatedEdges = currentCanvas.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id
                ? {
                    ...canvas,
                    nodes: updatedNodes,
                    edges: updatedEdges,
                    updatedAt: new Date(),
                  }
                : canvas
            ),
          };
        });
      },

      addEdgeToCanvas: (edgeData) => {
        const id = generateId();
        const newEdge: Edge = { ...edgeData, id };

        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id
                ? {
                    ...canvas,
                    edges: [...canvas.edges, newEdge],
                    updatedAt: new Date(),
                  }
                : canvas
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
          newData = await Promise.race([computeNode(node.type, inputs, nodeData, abortSignal), timeoutPromise]);
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
          canvases: state.canvases.map((canvas) => ({
            ...canvas,
            edges: canvas.edges.map((edge) => ({ ...edge, animated: false })),
            nodes: canvas.nodes.map((node) => ({ ...node, data: { ...node.data, loading: false } })),
          })),
        }));
      },
    }),
    {
      name: "canvas-storage",
      partialize: (state) => ({
        canvases: state.canvases,
        currentCanvasId: state.currentCanvasId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.abortController = new AbortController();
        }
      },
    }
  )
);
