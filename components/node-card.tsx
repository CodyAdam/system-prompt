import { Button } from "@/components/ui/button";
import { BaseNodeData } from "@/lib/base-node";
import { cn } from "@/lib/utils";
import { useWorkflowStore } from "@/lib/workflow-store";
import {
  RiDeleteBin2Line,
  RiErrorWarningFill,
  RiExpandDiagonalS2Line,
  RiFileCopyLine,
  RiLoader5Line,
  RiPlayLine
} from "@remixicon/react";
import { Node, NodeProps, NodeResizeControl, NodeToolbar } from "@xyflow/react";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function NodeCard({
  children,
  title,
  isError,
  buttons,
  node,
}: {
  children: React.ReactNode;
  title: string | React.ReactNode;
  isError?: boolean;
  buttons?: React.ReactNode;
  node: NodeProps<Node<BaseNodeData>>;
}) {
  
  const removeNode = useWorkflowStore((state) => state.removeNode);
  const runNode = useWorkflowStore((state) => state.runNode);
  const isLoading = useMemo(() => node.data?.loading === true, [node.data]);
  const addNode = useWorkflowStore((state) => state.addNode);
  const error = useMemo(() => {
    const validatedError = z.string().safeParse(node.data?.error);
    return validatedError.success ? validatedError.data : null;
  }, [node.data]);

  const handleDuplicate = useCallback(() => {
    addNode({
      ...node,
      position: { x: node.positionAbsoluteX + 100, y: node.positionAbsoluteY + 100 },
    });
  }, [node, addNode]);

  const handleDelete = useCallback(() => {
    removeNode(node.id);
  }, [node.id, removeNode]);

  const handleRun = useCallback(() => {
    runNode(node.id, true);
  }, [node.id, runNode]);

  return (
    <div
      className={cn(
        "flex flex-col bg-card rounded-xl h-full transition-all text-card-foreground border border-border",
        isError && "border-red-500 dark:border-red-900 bg-red-50 dark:bg-red-950"
      )}
    >
      <div
        className={cn(
          "bg-card transition-colors border-b p-3  flex items-center gap-3 rounded-t-xl",
          node.selected && "bg-muted",
          isLoading && "dark:bg-blue-500 bg-blue-200"
        )}
      >
        <div
          className={cn(
            "text-sm text-muted-foreground transition-colors",
            node.selected && "text-primary",
            isLoading && "dark:text-white text-foreground",
            error && "text-red-500"
          )}
        >
          {title}
        </div>
        {node.data?.dirty && (
          <div
            title="This node has outdated results, run it again to refresh"
            className="size-1.5 shrink-0 -ml-1 bg-orange-500/50 rounded-full"
          ></div>
        )}
        <div className="ml-auto"></div>
        {error && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="-m-1 size-8" size={"icon"}>
                  <RiErrorWarningFill className="size-5 text-red-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="whitespace-pre-wrap max-w-lg">{error}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {buttons}
        <Button
          title="Run this node"
          variant="ghost"
          className="-m-1 size-8"
          disabled={isLoading}
          size={"icon"}
          onClick={handleRun}
        >
          {isLoading ? <RiLoader5Line className="size-5 animate-spin" /> : <RiPlayLine className="size-5" />}
        </Button>
      </div>
      {node.selected && (
        <NodeResizeControl
          minWidth={300}
          minHeight={200}
          className="hover:text-foreground text-muted-foreground !border-none !bg-transparent"
        >
          <RiExpandDiagonalS2Line className="size-5 shrink-0" />
        </NodeResizeControl>
      )}

      <NodeToolbar className="flex gap-2 items-center">
        <Button title="Duplicate this node" variant="default" size={"icon"} onClick={handleDuplicate}>
          <RiFileCopyLine className="size-5" />
        </Button>
        <Button title="Delete this node" variant="default" size={"icon"} onClick={handleDelete}>
          <RiDeleteBin2Line className="size-5" />
        </Button>
      </NodeToolbar>
      {children}
    </div>
  );
}
