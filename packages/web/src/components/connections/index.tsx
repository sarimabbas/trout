"use client";

import { TypographyH2, TypographySubtle } from "@sarim.garden/ui/client";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

interface ConnectionsProps {}

export const ConnectionsSection = (props: ConnectionsProps) => {
  return (
    <div className="flex flex-col h-screen gap-8">
      <TypographyH2>Connections</TypographyH2>
      <TypographySubtle>
        Connections direct events from your data sources to your sinks.
      </TypographySubtle>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        className="border rounded-md"
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
