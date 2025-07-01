import { NodeCard } from "@/components/node-card";
import { Button } from "@/components/ui/button";
import { baseNodeDataSchema } from "@/lib/base-node";
import { ComputeNodeFunction } from "@/lib/compute";
import { RiCheckboxMultipleBlankLine, RiCheckboxMultipleFill, RiCodeLine } from "@remixicon/react";
import { Handle, Position, type NodeTypes } from "@xyflow/react";
import { useCallback, useMemo, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { ErrorNode } from "./error-node";

const markdownNodeDataSchema = baseNodeDataSchema.extend({
  text: z.string().optional(),
});

type MarkdownNodeData = z.infer<typeof markdownNodeDataSchema>;

export const computeMarkdown: ComputeNodeFunction<MarkdownNodeData> = async (
  inputs: string[],
  data: MarkdownNodeData
) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    ...data,
    output: inputs.join("\n\n"),
    text: inputs.join("\n\n"),
  };
};

export const MarkdownNode: NodeTypes[keyof NodeTypes] = (props) => {
  const parsedData = useMemo(() => {
    return markdownNodeDataSchema.safeParse(props.data);
  }, [props.data]);

  const [showRaw, setShowRaw] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(parsedData.data?.text || "");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [parsedData.data?.text]);

  const [copied, setCopied] = useState(false);

  if (!parsedData.success) {
    return <ErrorNode title="Invalid Markdown Node Data" description={parsedData.error.message} node={props} />;
  }

  return (
    <NodeCard
      title="Markdown"
      node={props}
      buttons={
        <>
          <Button
            variant="ghost"
            size="icon"
            className="-m-1 size-8"
            onClick={handleCopy}
            disabled={!parsedData.data?.text}
            title={copied ? "Copied" : "Copy to clipboard"}
          >
            {copied ? (
              <RiCheckboxMultipleFill className="size-5" />
            ) : (
              <RiCheckboxMultipleBlankLine className="size-5" />
            )}
          </Button>
          <Button
            variant={showRaw ? "default" : "ghost"}
            size="icon"
            className="-m-1 size-8"
            onClick={() => setShowRaw(!showRaw)}
            disabled={!parsedData.data?.text}
          >
            <RiCodeLine className="size-5" />
          </Button>
        </>
      }
    >
      <div className="h-full overflow-auto p-3 nowheel">
        {showRaw ? (
          <pre className="font-mono h-full select-text cursor-text overflow-auto whitespace-pre-wrap nopan  nodrag">
            {parsedData.data.text}
          </pre>
        ) : (
          <div className="prose mx-auto dark:prose-invert prose-neutral ">
            {parsedData.data.text ? (
              <Markdown remarkPlugins={[remarkGfm]}>{parsedData.data.text}</Markdown>
            ) : (
              <span className="text-muted-foreground text-sm">No text</span>
            )}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </NodeCard>
  );
};
