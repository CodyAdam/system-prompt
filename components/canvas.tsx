"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCanvasStore, type CanvasState } from "@/lib/canvas-store";
import { RiAddLine, RiArrowUpBoxLine, RiDeleteBin6Line } from "@remixicon/react";
import { Background, Controls, Panel, ReactFlow, type NodeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { AiNode } from "./nodes/ai-node";
import { MarkdownNode } from "./nodes/markdown-node";
import { PromptNode } from "./nodes/prompt-node";

const nodeTypes: NodeTypes = {
  prompt: PromptNode,
  ai: AiNode,
  markdown: MarkdownNode,
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
});

export default function Canvas() {
  const { resolvedTheme } = useTheme();
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteCanvas,
    updateCanvasName,
    getCurrentCanvas,
    currentCanvasId,
    canvases,
    addNode,
  } = useCanvasStore(useShallow(selector));

  const currentCanvas = getCurrentCanvas();

  const handleAddNode = (type: string) => {
    let newNode;
    switch (type) {
      case "prompt":
        newNode = {
          data: { prompt: "New prompt" },
          position: { x: Math.random() * 400, y: Math.random() * 400 },
          type: "prompt",
        };
        break;
      case "ai":
        newNode = {
          data: { prompt: "New prompt" },
          position: { x: Math.random() * 400, y: Math.random() * 400 },
          type: "ai",
        };
        break;
      case "markdown":
        newNode = {
          data: { prompt: "New prompt" },
          position: { x: Math.random() * 400, y: Math.random() * 400 },
          type: "markdown",
        };
        break;
    }
    if (newNode) {
      addNode(newNode);
    }
  };

  const handleDeleteCanvas = () => {
    if (currentCanvasId && confirm("Are you sure you want to delete this canvas? This action cannot be undone.")) {
      deleteCanvas(currentCanvasId);
    }
  };

  const handleCanvasNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentCanvasId) {
      updateCanvasName(currentCanvasId, e.target.value);
    }
  };

  const handleExportToClipboard = () => {
    const canvas = getCurrentCanvas();
    if (canvas) {
      navigator.clipboard.writeText(JSON.stringify(canvas, null, 2));
      toast.success("Canvas copied to clipboard");
    }
  };

  // Don't render if no current canvas
  if (!currentCanvasId || !currentCanvas) {
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
      minZoom={0.2}
      fitViewOptions={{
        padding: 0.4,
        maxZoom: 1,
        minZoom: 0.5,
      }}
      proOptions={{ hideAttribution: true }}
    >
      <Panel position="top-left">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Input
            value={currentCanvas.name}
            onChange={handleCanvasNameChange}
            placeholder="Canvas name..."
            className="w-fit max-w-64 font-semibold not-focus:bg-transparent not-focus:border-transparent not-focus:ring-0 dark:not-focus:bg-transparent dark:not-focus:border-transparent dark:not-focus:ring-0 not-focus:-translate-x-4 transition-all not-focus:shadow-none"
          />
        </div>
      </Panel>
      <Background bgColor="var(--color-background)" />
      <Controls />
      <Panel position="top-right">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportToClipboard}>
            <RiArrowUpBoxLine className="size-4" />
            Export to clipboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDeleteCanvas}
            className="text-destructive hover:text-destructive"
          >
            <RiDeleteBin6Line className="size-4" />
            Delete Canvas
          </Button>
        </div>
      </Panel>
      <Panel position="bottom-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleAddNode("prompt")}>
            <RiAddLine className="size-4 shrink-0" />
            Prompt node
          </Button>
          <Button variant="outline" onClick={() => handleAddNode("ai")}>
            <RiAddLine className="size-4 shrink-0" />
            AI node
          </Button>
          <Button variant="outline" onClick={() => handleAddNode("markdown")}>
            <RiAddLine className="size-4 shrink-0" />
            Markdown node
          </Button>
        </div>
      </Panel>
    </ReactFlow>
  );
}
