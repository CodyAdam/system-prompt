"use client";

import { useCanvasStore, type CanvasState } from "@/lib/canvas-store";
import { Background, Controls, ReactFlow, SelectionMode, type NodeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { useShallow } from "zustand/react/shallow";
import { CanvasPanels } from "./canvas-panels";
import { AiNode } from "./nodes/ai-node";
import { AnnotationNode } from "./nodes/annotation-node";
import { MarkdownNode } from "./nodes/markdown-node";
import { PromptNode } from "./nodes/prompt-node";

const panOnDrag = [1, 2];

const nodeTypes: NodeTypes = {
  prompt: PromptNode,
  ai: AiNode,
  markdown: MarkdownNode,
  annotation: AnnotationNode,
};

const selector = (state: CanvasState) => ({
  nodes: state.getNodes(),
  edges: state.getEdges(),
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteCanvas: state.deleteCanvas,
  updateCanvasName: state.updateCanvasName,
  getCurrentCanvas: state.getCurrentCanvas,
  currentCanvasId: state.currentCanvasId,
  canvases: state.canvases,
  addNode: state.addNode,
  abortAllOperations: state.abortAllOperations,
  isRunning: state.getNodes().some((node) => node.data.loading),
});

export default function Canvas() {
  const { resolvedTheme } = useTheme();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, currentCanvasId } = useCanvasStore(
    useShallow(selector)
  );

  // Don't render if no current canvas
  if (!currentCanvasId) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No canvas selected</p>
          <p className="text-sm text-muted-foreground">Create a canvas from the sidebar to get started</p>
        </div>
      </div>
    );
  }

  return (
    <ReactFlow
      key={currentCanvasId}
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      colorMode={resolvedTheme === "dark" ? "dark" : "light"}
      className="w-full h-full animate-in fade-in-0 duration-300"
      fitView
      panOnScroll
      selectionOnDrag
      panOnDrag={panOnDrag}
      selectionMode={SelectionMode.Partial}
      deleteKeyCode={["Backspace", "Delete"]}
      minZoom={0.2}
      fitViewOptions={{
        padding: 0.1,
        maxZoom: 1,
        minZoom: 0.3,
      }}
      proOptions={{ hideAttribution: true }}
    >
      <Background bgColor="var(--color-background)" />
      <Controls />
      <CanvasPanels />
    </ReactFlow>
  );
}
