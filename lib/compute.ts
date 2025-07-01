import { aiNodeDataSchema, computeAi } from "@/components/nodes/ai-node";
import { computeMarkdown } from "@/components/nodes/markdown-node";
import { computePrompt, promptNodeDataSchema } from "@/components/nodes/prompt-node";

export type ComputeNodeFunction<T> = (inputs: string[], data: T, abortSignal?: AbortSignal) => Promise<T>;

export const computeNode = async (
  type: string,
  inputs: string[],
  data: Record<string, unknown>,
  abortSignal?: AbortSignal
): Promise<Record<string, unknown>> => {
  try {
    // Check if operation was aborted before starting
    if (abortSignal?.aborted) {
      throw new Error("Operation was aborted");
    }

    switch (type) {
      case "markdown":
        return computeMarkdown(inputs, data, abortSignal);
      case "prompt":
        return computePrompt(inputs, promptNodeDataSchema.parse(data), abortSignal);
      case "ai":
        return computeAi(inputs, aiNodeDataSchema.parse(data), abortSignal);
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
