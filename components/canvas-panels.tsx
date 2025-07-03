"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCleanedCanvas, useCanvasStore, type CanvasState } from "@/lib/canvas-store";
import { RiAiGenerate2, RiArrowUpBoxLine, RiChatQuoteLine, RiDeleteBin2Line, RiMarkdownLine, RiStopLine, RiTextSnippet } from "@remixicon/react";
import { Panel, useReactFlow } from "@xyflow/react";
import Link from "next/link";
import { memo, useCallback } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const TopLeftPanel = memo(function TopLeftPanel() {
  const { updateCanvasName, currentName, currentCanvasId } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      updateCanvasName: state.updateCanvasName,
      currentName: state.getCurrentCanvas()?.name,
      currentCanvasId: state.currentCanvasId,
    }))
  );

  const handleCanvasNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (currentCanvasId) {
        updateCanvasName(currentCanvasId, e.target.value);
      }
    },
    [currentCanvasId, updateCanvasName]
  );

  if (currentName === undefined) return null;

  return (
    <Panel position="top-left">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Input
          value={currentName}
          onChange={handleCanvasNameChange}
          placeholder="Canvas name..."
          className="w-fit max-w-64 font-semibold not-focus:bg-transparent not-focus:border-transparent not-focus:ring-0 dark:not-focus:bg-transparent dark:not-focus:border-transparent dark:not-focus:ring-0 not-focus:-translate-x-4 transition-all not-focus:shadow-none"
        />
      </div>
    </Panel>
  );
});

const TopRightPanel = memo(function TopRightPanel() {
  const { deleteCanvas, getCurrentCanvas, currentCanvasId, abortAllOperations, isRunning } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      deleteCanvas: state.deleteCanvas,
      getCurrentCanvas: state.getCurrentCanvas,
      currentCanvasId: state.currentCanvasId,
      abortAllOperations: state.abortAllOperations,
      isRunning: state.getNodes().some((node) => node.data.loading),
    }))
  );

  const handleDeleteCanvas = useCallback(() => {
    if (currentCanvasId && confirm("Are you sure you want to delete this canvas? This action cannot be undone.")) {
      deleteCanvas(currentCanvasId);
    }
  }, [currentCanvasId, deleteCanvas]);

  const handleExportToClipboard = useCallback(() => {
    const canvas = getCurrentCanvas();
    if (canvas) {
      navigator.clipboard.writeText(JSON.stringify(getCleanedCanvas(canvas), null, 2));
      toast.success("Canvas copied to clipboard");
    }
  }, [getCurrentCanvas]);

  return (
    <Panel position="top-right">
      <div className="flex items-center gap-2">
        {isRunning && (
          <Button variant="outline" size="sm" onClick={abortAllOperations}>
            <RiStopLine className="size-4" />
            Stop all
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={handleExportToClipboard}>
          <RiArrowUpBoxLine className="size-4" />
          <span className="hidden sm:block">Export to clipboard</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteCanvas}
          className="text-destructive hover:text-destructive"
        >
          <RiDeleteBin2Line className="size-4" />
          <span className="hidden sm:block">Delete Canvas</span>
        </Button>
      </div>
    </Panel>
  );
});

const BottomCenterPanel = memo(function BottomCenterPanel() {
  const instance = useReactFlow();
  const addNode = useCanvasStore((state: CanvasState) => state.addNode);

  const handleAddNode = useCallback(
    (type: string) => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const position = instance.screenToFlowPosition({ x: screenWidth / 2, y: screenHeight / 2 });
      switch (type) {
        case "prompt":
          addNode({
            data: { prompt: "" },
            position,
            height: 500,
            width: 450,
            type: type,
          });
          break;
        case "ai":
          addNode({
            data: { systemPrompt: "" },
            position,
            height: 500,
            width: 450,
            type: type,
          });
          break;
        case "markdown":
          addNode({
            data: {},
            position,
            height: 500,
            width: 450,
            type: type,
          });
          break;
        case "annotation":
          addNode({
            data: { text: "" },
            position,
            height: 150,
            width: 400,
            type: type,
          });
          break;
      }
    },
    [addNode, instance]
  );

  return (
    <Panel position="bottom-center">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => handleAddNode("prompt")}>
          <RiTextSnippet className="size-5 shrink-0" />
          <span className="hidden sm:block">Prompt</span>
        </Button>
        <Button variant="outline" onClick={() => handleAddNode("ai")}>
          <RiAiGenerate2 className="size-5 shrink-0" />
          <span className="hidden sm:block">AI</span>
        </Button>
        <Button variant="outline" onClick={() => handleAddNode("markdown")}>
          <RiMarkdownLine className="size-5 shrink-0" />
          <span className="hidden sm:block">Markdown</span>
        </Button>
        <Button variant="outline" onClick={() => handleAddNode("annotation")}>
          <RiChatQuoteLine className="size-5 shrink-0" />
          <span className="hidden sm:block">Annotation</span>
        </Button>
      </div>
    </Panel>
  );
});

const BottomRightPanel = memo(function BottomRightPanel() {
  return (
    <Panel position="bottom-right">
      <span className="text-xs text-muted-foreground">
        by{" "}
        <Link href="https://x.com/codyadm" target="_blank" className="underline">
          Cody Adam
        </Link>
      </span>
    </Panel>
  );
});

export const CanvasPanels = memo(function CanvasPanels() {
  return (
    <>
      <TopLeftPanel />
      <TopRightPanel />
      <BottomCenterPanel />
      <BottomRightPanel />
    </>
  );
});
