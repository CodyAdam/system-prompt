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
import { providers } from "@/lib/ai";
import { useApiKeysStore } from "@/lib/api-key-store";
import { baseNodeDataSchema } from "@/lib/base-node";
import { ComputeNodeFunction, ComputeNodeInput, formatInputs } from "@/lib/compute";
import { useWorkflowStore } from "@/lib/workflow-store";
import { RiSearchEyeLine } from "@remixicon/react";
import { Handle, Position, type NodeTypes } from "@xyflow/react";
import { generateText } from "ai";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { DebouncedTextarea } from "../debounced-textarea";
import { buttonVariants } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ErrorNode } from "./error-node";

export const aiNodeDataSchema = baseNodeDataSchema.extend({
  systemPrompt: z.string(),
  modelId: z.string().optional(),
});

type AiNodeData = z.infer<typeof aiNodeDataSchema>;

export const computeAi: ComputeNodeFunction<AiNodeData> = async (
  inputs: ComputeNodeInput[],
  data: AiNodeData,
  abortSignal?: AbortSignal
) => {
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
      prompt: formatInputs(inputs),
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
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const [open, setOpen] = useState(false);
  const { setOpen: setApiKeysOpen } = useApiKeysStore();
  const formatedPrompt = useWorkflowStore((state) => {
    if (!open) {
      return null;
    }
    const rawNode = state.getNode(props.id);
    const validatedNode = aiNodeDataSchema.safeParse(rawNode?.data);
    if (!validatedNode.success) {
      return null;
    }
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

    return formatInputs(
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
          <Dialog open={open} onOpenChange={setOpen}>
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
                <div className="p-3 bg-card rounded-md rounded-b-none border-b-2 border-dashed border-muted whitespace-pre-wrap flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">System prompt</span>
                  <p className=" break-all">{parsedData.data.systemPrompt}</p>
                </div>
                <div className="p-3 bg-card rounded-md rounded-t-none whitespace-pre-wrap flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">User prompt</span>
                  <p className="break-all">{formatedPrompt}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TooltipProvider>
      }
    >
      <div className="p-3 gap-3 flex flex-col h-full overflow-hidden">
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
        {provider && !key && (
          <button onClick={() => setApiKeysOpen(true)} className="text-xs text-destructive -mt-1 hover:underline cursor-pointer text-left underline-offset-4 w-fit">
            API key is not configured for {provider}. Click here to set it.
          </button>
        )}
        <DebouncedTextarea
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
