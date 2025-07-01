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
import z from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { computeNode } from "./compute";
import { toast } from 'sonner';

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
interface Canvas {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CanvasState {
  canvases: Canvas[];
  currentCanvasId: string | null;

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
  updateNodeData: (nodeId: string, data: any) => void;
  updateEdgeProps: (edgeId: string, props: Partial<Edge>) => void;
  addNode: (node: Omit<Node, "id">) => void;
  removeNode: (nodeId: string) => void;
  addEdgeToCanvas: (edge: Omit<Edge, "id">) => void;

  // Node execution
  runNode: (nodeId: string) => void;
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

      switchCanvas: (id: string) => {
        const canvas = get().canvases.find((c) => c.id === id);
        if (canvas) {
          set({ currentCanvasId: id });
        }
      },

      importFromJson: (json: string) => {
        try {
          const jsonData = JSON.parse(json);
          const validationResult = canvasDataSchema.safeParse(jsonData);
          
          if (!validationResult.success) {
            const errorMessage = validationResult.error.issues
              .map(issue => `${issue.path.join('.')}: ${issue.message}`)
              .join(', ');
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

      updateNodeData: (nodeId: string, data: any) => {
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
        const newNode: Node = { ...nodeData, id };

        set((state) => {
          const currentCanvas = state.getCurrentCanvas();
          if (!currentCanvas) return state;

          return {
            canvases: state.canvases.map((canvas) =>
              canvas.id === currentCanvas.id
                ? {
                    ...canvas,
                    nodes: [...canvas.nodes, newNode],
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
        const currentCanvas = get().getCurrentCanvas();
        return currentCanvas?.nodes.find((node) => node.id === nodeId) || null;
      },

      runNode: async (nodeId: string) => {
        const node = get()
          .getNodes()
          .find((node) => node.id === nodeId);
        if (!node || !node.type) return;

        const parentEdges = get()
          .getEdges()
          .filter((e) => e.target === nodeId);
        parentEdges.forEach((e) => {
          get().updateEdgeProps(e.id, { animated: true });
        });
        const parentNodes = get()
          .getNodes()
          .filter((n) => parentEdges.some((e) => e.source === n.id));
        const inputs = [];
        for (const n of parentNodes) {
          const parsedData = z
            .object({
              output: z.string().optional(),
              dirty: z.boolean().optional(),
            })
            .safeParse(n.data);

          if (!parsedData.success || parsedData.data.dirty || !parsedData.data.output) {
            // output missing, we need to run the parent node or is dirty
            get().runNode(n.id);
            return; 
          }
          inputs.push(parsedData.data.output || "");
        }

        const nodeData = node.data;
        get().updateNodeData(nodeId, {
          ...nodeData,
          loading: true,
        });

        const newData = await computeNode(node.type, inputs, nodeData);

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
    }),
    {
      name: "canvas-storage",
    }
  )
);
