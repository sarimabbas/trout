"use client";

import * as connectionActions from "@/actions/connections";
import * as sinkActions from "@/actions/sinks";
import * as sourceActions from "@/actions/sources";
import { TypographyH2, TypographySubtle } from "@sarim.garden/ui/client";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
} from "reactflow";
import { CustomNode } from "./node";

const nodeTypes = {
  custom: CustomNode,
};

interface ConnectionsProps {
  sources: Awaited<ReturnType<typeof sourceActions.READ>>;
  sinks: Awaited<ReturnType<typeof sinkActions.READ>>;
  connections: Awaited<ReturnType<typeof connectionActions.READ>>;
  CRUPDATE: typeof connectionActions.CRUPDATE;
  DELETE: typeof connectionActions.DELETE;
}

export const ConnectionsSection = (props: ConnectionsProps) => {
  const initialNodes: Node[] = props.sources
    .map((c, idx) => {
      return {
        id: c.id,
        position: { x: c.diagramPosX ?? 0, y: c.diagramPosY ?? idx * 100 },
        data: { label: c.name, type: "source" },
        type: "custom",
      };
    })
    .concat(
      props.sinks.map((c, idx) => {
        return {
          id: c.id,
          position: { x: c.diagramPosX ?? 300, y: c.diagramPosY ?? idx * 100 },
          data: { label: c.name, type: "sink" },
          type: "custom",
        };
      })
    );

  const initialEdges: Edge[] = props.connections.map((c) => {
    return {
      id: c.id,
      source: c.source.id,
      target: c.sink.id,
    };
  });

  return (
    <div className="flex flex-col h-screen gap-8">
      <TypographyH2>Connections</TypographyH2>
      <TypographySubtle>
        Connections direct events from your data sources to your sinks.
      </TypographySubtle>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
          },
        }}
        className="border rounded-md"
        fitView
        fitViewOptions={{
          padding: 0.5,
        }}
        nodeTypes={nodeTypes}
        onConnect={async (c) => {
          await props.CRUPDATE({
            sourceId: c.source,
            sinkId: c.target,
          });
        }}
        onEdgesDelete={async (c) => {
          await Promise.all(
            c.map((edge) => {
              return props.DELETE({
                connectionId: edge.id,
              });
            })
          );
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
