import { NodeCard } from "@/components/node-card";
import { NodeProps } from "@xyflow/react";

export function ErrorNode({ title, description, node }: { title: string; description: string; node: NodeProps & { data: any; type: any } }) {
  return (
    <NodeCard title={title} node={node}>
      <div className="text-red-500 nowheel p-3 font-mono text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
        {description}
      </div>
    </NodeCard>
  );
}
