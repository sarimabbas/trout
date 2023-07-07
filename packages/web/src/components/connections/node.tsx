"use client";

import { Badge } from "@sarim.garden/ui/client";
import { cn } from "@sarim.garden/ui/isomorphic";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export interface CustomNodeProps extends NodeProps {
  data: {
    label: string;
    type: string;
  };
}

const CustomNodeInner = (props: CustomNodeProps) => {
  const { data } = props;
  return (
    <div
      className={cn(
        "bg-white border-2 rounded-md shadow-md flex flex-col items-center gap-2 px-4 py-2",
        {
          "!border-green-400": data.type === "source",
          "!border-orange-400": data.type === "sink",
        }
      )}
    >
      <Badge variant="secondary" className="w-fit">
        {data.type}
      </Badge>
      <div className="text-lg">{data.label}</div>
      {data.type === "source" ? (
        <Handle type="source" position={Position.Right} />
      ) : (
        <Handle type="target" position={Position.Left} />
      )}
    </div>
  );
};

export const CustomNode = memo(CustomNodeInner);
