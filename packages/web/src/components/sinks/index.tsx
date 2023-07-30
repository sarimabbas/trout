"use client";

import * as sinkActions from "@/actions/sinks";
import { useOrgOrUserId } from "@/app/_utils/isomorphic";
import {
  Button,
  ColumnDef,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  TypographyH2,
  TypographySubtle,
  toast,
} from "@sarim.garden/ui/client";
import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";
import { UpdateSinkDialog } from "./update-sink-dialog";

interface SinksSectionProps {
  sinks: Awaited<ReturnType<typeof sinkActions.READ>>;
  CREATE: typeof sinkActions.CREATE;
  UPDATE: typeof sinkActions.UPDATE;
  DELETE: typeof sinkActions.DELETE;
}

type Sink = Awaited<ReturnType<typeof sinkActions.READ>>[number];
type SinkWithActions = Sink & {
  actions: {
    UPDATE: typeof sinkActions.UPDATE;
    DELETE: typeof sinkActions.DELETE;
  };
};

export const SinksSection = (props: SinksSectionProps) => {
  const { sinks, CREATE, UPDATE, DELETE } = props;
  const [isPending, startTransition] = useTransition();
  const sinksWithActions: SinkWithActions[] = sinks.map((s) => {
    return {
      ...s,
      actions: {
        UPDATE,
        DELETE,
      },
    };
  });

  return (
    <div className="flex flex-col gap-8">
      <TypographyH2>Sinks</TypographyH2>
      <TypographySubtle>Sinks are where your events are sent.</TypographySubtle>
      <Button
        onClick={() =>
          // @ts-ignore
          startTransition(async () => {
            const sink = await CREATE();
            toast.success(`Created sink "${sink.name}"`);
          })
        }
        className="ml-auto w-fit"
      >
        {isPending ? "Creating..." : "Create new sink"}
      </Button>
      <DataTable columns={columns} data={sinksWithActions} />
    </div>
  );
};

export const columns: ColumnDef<SinkWithActions>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "xata.createdAt",
    header: "Created at",
    id: "createdAt",
    accessorFn: (sink) => {
      // human readable date time
      return new Date(sink.xata.createdAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "xata.updatedAt",
    header: "Updated at",
    id: "updatedAt",
    accessorFn: (sink) => {
      // human readable date time
      return new Date(sink.xata.updatedAt).toLocaleDateString();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionsMenu row={row.original} />;
    },
  },
];

interface ActionsMenuProps {
  row: SinkWithActions;
}

const ActionsMenu = (props: ActionsMenuProps) => {
  const [isPending, startTransition] = useTransition();
  const lookupId = useOrgOrUserId();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* edit a sink */}
        <DropdownMenuLabel>
          <UpdateSinkDialog UPDATE={props.row.actions.UPDATE} sink={props.row}>
            Edit
          </UpdateSinkDialog>
        </DropdownMenuLabel>
        {/* delete a source */}
        <DropdownMenuItem
          onClick={() =>
            // @ts-ignore
            startTransition(async () => {
              await props.row.actions.DELETE({
                sinkId: props.row.id,
              });
              toast.success(`Deleted sink "${props.row.name}"`);
            })
          }
        >
          {isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
