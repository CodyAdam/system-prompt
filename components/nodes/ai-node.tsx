import { NodeCard } from "@/components/node-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { providers } from "@/lib/ai";
import { useApiKeysStore } from "@/lib/api-key-store";
import { baseNodeDataSchema } from "@/lib/base-node";
import { useCanvasStore } from "@/lib/canvas-store";
import { ComputeNodeFunction } from "@/lib/compute";
import { RiSearchEyeLine } from "@remixicon/react";
import { Handle, Position, type NodeTypes } from "@xyflow/react";
import { generateText } from "ai";
import { useCallback, useMemo } from "react";
import { z } from "zod";
import { Button, buttonVariants } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ErrorNode } from "./error-node";

export const aiNodeDataSchema = baseNodeDataSchema.extend({
  systemPrompt: z.string(),
  modelId: z.string().optional(),
});

type AiNodeData = z.infer<typeof aiNodeDataSchema>;

function formatPrompt(systemPrompt: string, inputs: { output: string; label?: string }[]) {
  return inputs
    .map((input) => {
      if (input.label) {
        return `<${input.label}>\n${input.output.trim()}\n</${input.label}>`;
      }
      return input.output;
    })
    .join("\n\n");
}

export const computeAi: ComputeNodeFunction<AiNodeData> = async (inputs: string[], data: AiNodeData, abortSignal?: AbortSignal) => {
  if (!data.modelId) {
    return {
      ...data,
      error: "No model selected",
    };
  }

  const providerName = Object.keys(providers).find((provider) => providers[provider].models.includes(data.modelId!));
  const provider = providerName ? providers[providerName] : undefined;
  if (!providerName || !provider) {
    return {
      ...data,
      error: `No provider found for model ${data.modelId}`,
    };
  }

  const key = useApiKeysStore.getState().getApiKey(providerName);
  if (!key) {
    return {
      ...data,
      error: `No API key found for model ${data.modelId}`,
    };
  }

  const client = provider.createClient(key);

  let generatedText: string;
  try {
    if (abortSignal?.aborted) {
      throw new Error("Operation was aborted");
    }

    const res = await generateText({
      model: client(data.modelId),
      system: data.systemPrompt,
      prompt: inputs.join("\n\n"),
      abortSignal, // Pass abort signal to AI call
    });
    generatedText = res.text;
  } catch (error) {
    console.error(error);
    return {
      ...data,
      error: `Error generating text: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
    };
  }

  return {
    ...data,
    error: undefined,
    dirty: false,
    output: generatedText,
  };
};

export const AiNode: NodeTypes[keyof NodeTypes] = (props) => {
  const parsedData = useMemo(() => {
    return aiNodeDataSchema.safeParse(props.data);
  }, [props.data]);
  const updateNodeData = useCanvasStore((state) => state.updateNodeData);
  const formatedPrompt = useCanvasStore((state) => {
    const rawNode = state.getNode(props.id);
    const validatedNode = aiNodeDataSchema.safeParse(rawNode?.data);
    if (!validatedNode.success) {
      return null;
    }
    const node = validatedNode.data;
    const parentEdges = state.getEdges().filter((edge) => edge.target === props.id);
    if (parentEdges.length === 0) {
      return null;
    }
    const parentNodes = parentEdges
      .map((edge) => {
        const rawNode = state.getNode(edge.source);
        const validatedNode = z
          .object({
            output: z.string(),
            label: z.string().optional(),
          })
          .safeParse(rawNode?.data);
        if (!validatedNode.success) {
          return null;
        }
        return validatedNode.data;
      })
      .filter((node): node is NonNullable<typeof node> => node !== null);

    return formatPrompt(
      node.systemPrompt,
      parentNodes.map((node) => ({
        output: node.output,
        label: node.label,
      }))
    );
  });

  const handleSystemPromptChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateNodeData(props.id, { systemPrompt: e.target.value, dirty: true, error: undefined });
    },
    [props.id, updateNodeData]
  );

  const handleModelChange = useCallback(
    (value: string) => {
      updateNodeData(props.id, { modelId: value, dirty: true, error: undefined });
    },
    [props.id, updateNodeData]
  );

  const provider = useMemo(() => {
    if (!parsedData.success || !parsedData.data?.modelId) {
      return null;
    }
    return (
      Object.keys(providers).find((provider) => providers[provider].models.includes(parsedData.data.modelId!)) || null
    );
  }, [parsedData.success, parsedData.data?.modelId]);

  const key = useApiKeysStore((state) => (provider ? state.getApiKey(provider) : null));

  if (!parsedData.success) {
    return <ErrorNode title="Invalid AI Node Data" description={parsedData.error.message} node={props} />;
  }

  return (
    <NodeCard
      title="AI model"
      node={props}
      buttons={
        <TooltipProvider>
          <Dialog>
            <DialogTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={buttonVariants({ variant: "ghost", size: "icon", className: "-m-1 size-8" })}>
                    <RiSearchEyeLine className="size-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Preview formatted prompt</TooltipContent>
              </Tooltip>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Preview formatted prompt</DialogTitle>
                <DialogDescription>
                  This is the full prompt after formatting that will be sent to the AI model.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col text-sm">
                <div className="p-3 bg-muted rounded-md rounded-b-none border-b-2 border-dashed border-card whitespace-pre-wrap flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">System prompt</span>
                  <p>{parsedData.data.systemPrompt}</p>
                </div>
                <div className="p-3 bg-muted rounded-md rounded-t-none whitespace-pre-wrap flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">User prompt</span>
                  <p>{formatedPrompt}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TooltipProvider>
      }
    >
      <div className="p-3 space-y-3 flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm text-muted-foreground"> {provider ? `Using ${provider}` : "No model selected"}</p>
          <Select value={parsedData.data.modelId} onValueChange={handleModelChange}>
            <SelectTrigger className="nodrag ml-auto">
              <SelectValue placeholder="Select an AI model" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(providers).map(([provider, { models }]) => (
                <SelectGroup key={provider}>
                  <SelectLabel>{provider}</SelectLabel>
                  {models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
        {provider && !key && <p className="text-xs text-destructive">API key is not configured for {provider}</p>}
        <Textarea
          name="systemPrompt"
          value={parsedData.data.systemPrompt}
          onChange={handleSystemPromptChange}
          placeholder="Enter your system prompt..."
          className="nodrag resize-none flex-1 min-h-0 nowheel nopan"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </NodeCard>
  );
};
