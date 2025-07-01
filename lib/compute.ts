import { computeAi } from '@/components/nodes/ai-node';
import { computeMarkdown } from '@/components/nodes/markdown-node';
import { computePrompt } from '@/components/nodes/prompt-node';
import { toast } from 'sonner';

export type ComputeNodeFunction<T> = (inputs: string[], data: T) => Promise<T>;

export const computeNode = async (type: string, inputs: string[], data: any) => {
  switch (type) {
    case "markdown":
      return computeMarkdown(inputs, data);
    case "prompt":
      return computePrompt(inputs, data);
    case "ai":
      return computeAi(inputs, data);
    default:
      toast.error(`Node type ${type} not found`);
  }
};
