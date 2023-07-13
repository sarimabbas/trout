"use client";

import * as connectionActions from "@/actions/connections";
import * as sinkActions from "@/actions/sinks";
import * as sourceActions from "@/actions/sources";
import { TypographyH2, TypographySubtle } from "@sarim.garden/ui/client";
import { Info } from "lucide-react";
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

interface ConnectionsSectionProps {
  sources: Awaited<ReturnType<typeof sourceActions.READ>>;
  sinks: Awaited<ReturnType<typeof sinkActions.READ>>;
  connections: Awaited<ReturnType<typeof connectionActions.READ>>;
  connectionCRUPDATE: typeof connectionActions.CRUPDATE;
  connectionDELETE: typeof connectionActions.DELETE;
  sourceUPDATE: typeof sourceActions.UPDATE;
  sinkUPDATE: typeof sinkActions.UPDATE;
}

export const ConnectionsSection = (props: ConnectionsSectionProps) => {
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
      source: c.source?.id,
      target: c.sink?.id,
    };
  });

  return (
    <div className="flex flex-col h-screen gap-8">
      <TypographyH2>Connections</TypographyH2>
      <TypographySubtle>
        Connections direct events from your sources to sinks.
      </TypographySubtle>
      <ReactFlow
        // force refresh when org changes
        key={props.sources.length + props.sinks.length}
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
          await props.connectionCRUPDATE({
            sourceId: c.source,
            sinkId: c.target,
          });
        }}
        onEdgesDelete={async (c) => {
          await Promise.all(
            c.map((edge) => {
              return props.connectionDELETE({
                connectionId: edge.id,
              });
            })
          );
        }}
        onNodeDragStop={async (e, node, nodes) => {
          if (node.data.type === "source") {
            await props.sourceUPDATE({
              sourceId: node.id,
              diagramPosX: Math.round(node.position.x),
              diagramPosY: Math.round(node.position.y),
            });
          } else {
            await props.sinkUPDATE({
              sinkId: node.id,
              diagramPosX: Math.round(node.position.x),
              diagramPosY: Math.round(node.position.y),
            });
          }
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      <div className="flex items-center gap-4 p-4 border rounded-md">
        <TypographySubtle>
          <Info size={24} />
        </TypographySubtle>
        <TypographySubtle>
          Drag from a source outlet to a sink inlet to create a connection.
          Select a connection and hit backspace on your keyboard to delete it.
        </TypographySubtle>
      </div>
    </div>
  );
};
