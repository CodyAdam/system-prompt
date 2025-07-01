import { NodeCard } from "@/components/node-card";
import { Textarea } from "@/components/ui/textarea";
import { baseNodeDataSchema } from "@/lib/base-node";
import { useCanvasStore } from "@/lib/canvas-store";
import { ComputeNodeFunction } from "@/lib/compute";
import { Handle, Position, type NodeTypes } from "@xyflow/react";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import { Input } from "../ui/input";
import { ErrorNode } from "./error-node";

export const promptNodeDataSchema = baseNodeDataSchema.extend({
  prompt: z.string(),
  label: z.string().optional(),
});

type PromptNodeData = z.infer<typeof promptNodeDataSchema>;

export const computePrompt: ComputeNodeFunction<PromptNodeData> = async (
  inputs: string[],
  data: PromptNodeData,
  abortSignal?: AbortSignal
) => {
  const currentData = { ...data };
  if (inputs.length > 0) {
    currentData.prompt = inputs.join("\n\n");
  }

  await new Promise((resolve) => setTimeout(resolve, 300));

  // Check if operation was aborted
  if (abortSignal?.aborted) {
    throw new Error("Operation was aborted");
  }

  return {
    ...currentData,
    error: undefined,
    dirty: false,
    output: currentData.prompt,
  };
};

export const PromptNode: NodeTypes[keyof NodeTypes] = (props) => {
  const updateNodeData = useCanvasStore((state) => state.updateNodeData);

  const parsedData = useMemo(() => {
    return promptNodeDataSchema.safeParse(props.data);
  }, [props.data]);

  const handlePromptChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNodeData(props.id, { prompt: e.target.value, dirty: true });
    },
    [props.id, updateNodeData]
  );

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      updateNodeData(props.id, {
        label: value.trim() === "" ? undefined : value,
        dirty: true,
      });
    },
    [props.id, updateNodeData]
  );

  if (!parsedData.success) {
    return <ErrorNode title="Invalid Prompt Node Data" description={parsedData.error.message} node={props} />;
  }

  return (
    <NodeCard
      title={
        <div className="flex items-center gap-2">
          <p>Prompt</p>
          <Input
            value={parsedData.data.label || ""}
            onChange={handleLabelChange}
            placeholder="Enter a label..."
            className="w-full bg-transparent -my-2 h-8 text-sm nodrag"
          />
        </div>
      }
      node={props}
    >
      <Textarea
        name="prompt"
        value={parsedData.data.prompt}
        onChange={handlePromptChange}
        placeholder="Enter your prompt..."
        className="nodrag resize-none w-full !ring-0 h-full border-none rounded-none rounded-b-xl nowheel nopan"
      />
      <Handle type="source" position={Position.Bottom}></Handle>
      <Handle type="target" position={Position.Top} />
    </NodeCard>
  );
};
