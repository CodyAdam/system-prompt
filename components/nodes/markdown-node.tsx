import { NodeCard } from "@/components/node-card";
import { Button } from "@/components/ui/button";
import { baseNodeDataSchema } from "@/lib/base-node";
import { ComputeNodeFunction, ComputeNodeInput, formatInputs } from "@/lib/compute";
import { RiArrowRightUpLine, RiCheckboxMultipleBlankLine, RiCheckboxMultipleFill, RiCodeLine } from "@remixicon/react";
import { Handle, Position, type NodeTypes } from "@xyflow/react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { ErrorNode } from "./error-node";

const markdownNodeDataSchema = baseNodeDataSchema.extend({
  text: z.string().optional(),
});

export type MarkdownNodeData = z.infer<typeof markdownNodeDataSchema>;

export const computeMarkdown: ComputeNodeFunction<MarkdownNodeData> = async (
  inputs: ComputeNodeInput[],
  data: MarkdownNodeData,
  abortSignal: AbortSignal
) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Check if operation was aborted
  if (abortSignal?.aborted) {
    throw new Error("Operation was aborted");
  }

  return {
    ...data,
    dirty: false,
    error: undefined,
    output: formatInputs(inputs),
    text: formatInputs(inputs),
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

  function parseMarkdown(md: string) {
    // replace all xml like "<this_is_xml>" to "\n`<this_is_xml>`\n"
    // replace all xml like "</this_is_xml>" to "\n`</this_is_xml>`\n"
    return md
      .replaceAll(/<([^>\/]+)>/g, (match, p1) => {
        return `\n*\`<${p1}>\`*\n`;
      })
      .replaceAll(/<\/([^>]+)>/g, (match, p1) => {
        return `\n*\`</${p1}>\`*\n`;
      });
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
      <div className="h-full overflow-auto p-6 nowheel nopan cursor-auto select-text nodrag">
        {showRaw ? (
          <pre className="font-mono text-sm h-full overflow-auto whitespace-pre-wrap ">{parsedData.data.text}</pre>
        ) : (
          <div className="prose prose-sm mx-auto prose-neutral dark:prose-invert prose-h1:font-display prose-h1:font-bold prose-h2:font-display prose-h2:font-bold prose-h3:font-display prose-h3:font-bold prose-strong:font-semibold prose-em:text-foreground prose-strong:text-foreground prose-code:before:content-none prose-code:after:content-none prose-ol:ml-0 prose-ol:list-outside prose-ol:list-decimal prose-ul:list-outside prose-ul:list-disc prose-thead:text-left break-words">
            {parsedData.data.text ? (
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ children, href }) => {
                    return (
                      <Link
                        href={href ?? "#"}
                        target={"_blank"}
                        className="bg-blue-500/20 text-foreground hover:bg-blue-500/10 rounded-sm px-2 py-0.5 no-underline"
                      >
                        {children}&nbsp;
                        <RiArrowRightUpLine className="text-blue-500 inline-block size-5 -translate-y-px" />
                      </Link>
                    );
                  },
                  code: ({ children }) => {
                    return <code className="bg-muted rounded-md px-1">{children}</code>;
                  },
                  pre: ({ children }) => {
                    return <pre className="w-full overflow-x-auto [&>code]:!bg-transparent rounded-md p-2">{children}</pre>;
                  },
                }}
              >
                {parseMarkdown(parsedData.data.text)}
              </Markdown>
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
