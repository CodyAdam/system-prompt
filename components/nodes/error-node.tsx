import { NodeCard } from "@/components/node-card";
import { NodeProps } from "@xyflow/react";

export function ErrorNode({ title, description, node }: { title: string; description: string; node: NodeProps }) {
  return (
    <NodeCard title={title} node={node}>
      <div className="text-red-500 nowheel nodrag select-auto cursor-auto nopan p-3 font-mono text-sm whitespace-pre-wrap overflow-y-auto h-full">
        {description}
      </div>
    </NodeCard>
  );
}
