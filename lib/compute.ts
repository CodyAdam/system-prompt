import { aiNodeDataSchema, computeAi } from "@/components/nodes/ai-node";
import { computeMarkdown } from "@/components/nodes/markdown-node";
import { computePrompt, promptNodeDataSchema } from "@/components/nodes/prompt-node";

export type ComputeNodeFunction<T> = (inputs: ComputeNodeInput[], data: T, abortSignal: AbortSignal, nodeId: string) => Promise<T>;

export type ComputeNodeInput = { output: string; label?: string };

export function formatInputs(inputs: ComputeNodeInput[]) {
  return inputs
    .map((input) => {
      if (input.label) {
        const label = input.label.toLowerCase().replace(/ /g, "_");
        return `<${label}>\n${input.output.trim()}\n</${label}>`; 
      }
      return input.output;
    })
    .join("\n\n");
}

export const computeNode = async (
  type: string,
  inputs: ComputeNodeInput[],
  data: Record<string, unknown>,
  abortSignal: AbortSignal,
  nodeId: string
): Promise<Record<string, unknown>> => {
  try {
    // Check if operation was aborted before starting
    if (abortSignal?.aborted) {
      throw new Error("Operation was aborted");
    }

    switch (type) {
      case "markdown":
        return computeMarkdown(inputs, data, abortSignal, nodeId);
      case "prompt":
        return computePrompt(inputs, promptNodeDataSchema.parse(data), abortSignal, nodeId);
      case "ai":
        return computeAi(inputs, aiNodeDataSchema.parse(data), abortSignal, nodeId);
      default:
        throw new Error(`Node type ${type} not found`);
    }
  } catch (error) {
    return {
      ...data,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
