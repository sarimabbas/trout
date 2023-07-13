"use client";

import * as sourceActions from "@/actions/sources";
import {
  getCliCommand,
  getWebhookUrl,
  useOrgOrUserId,
} from "@/app/_utils/isomorphic";
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
import Link from "next/link";
import { useTransition } from "react";
import { UpdateSourceDialog } from "./update-source-dialog";

interface SourceListProps {
  sources: Awaited<ReturnType<typeof sourceActions.READ>>;
  CREATE: typeof sourceActions.CREATE;
  UPDATE: typeof sourceActions.UPDATE;
  DELETE: typeof sourceActions.DELETE;
}

type Source = Awaited<ReturnType<typeof sourceActions.READ>>[number];
type SourceWithActions = Source & {
  actions: {
    UPDATE: typeof sourceActions.UPDATE;
    DELETE: typeof sourceActions.DELETE;
  };
};

export const SourcesSection = (props: SourceListProps) => {
  const { sources, CREATE, UPDATE, DELETE } = props;
  const [isPending, startTransition] = useTransition();
  const sourcesWithActions: SourceWithActions[] = sources.map((source) => {
    return {
      ...source,
      actions: {
        UPDATE,
        DELETE,
      },
    };
  });

  return (
    <div className="flex flex-col gap-8">
      <TypographyH2>Sources</TypographyH2>
      <TypographySubtle>
        Receive events with sources. Each source has its own dedicated URL. You
        can also use the local CLI to listen on a source.
      </TypographySubtle>
      <Button
        onClick={() =>
          startTransition(async () => {
            const source = await CREATE();
            toast.success(`Created source "${source.name}"`);
          })
        }
        className="ml-auto w-fit"
      >
        {isPending ? "Creating..." : "Create new source"}
      </Button>
      <DataTable columns={columns} data={sourcesWithActions} />
    </div>
  );
};

export const columns: ColumnDef<SourceWithActions>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "xata.createdAt",
    header: "Created at",
    id: "createdAt",
    accessorFn: (source) => {
      // human readable date time
      return new Date(source.xata.createdAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "xata.updatedAt",
    header: "Updated at",
    id: "updatedAt",
    accessorFn: (source) => {
      // human readable date time
      return new Date(source.xata.updatedAt).toLocaleDateString();
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
  row: SourceWithActions;
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
        {/* copy webhook URL */}
        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(
              getWebhookUrl(props.row.webhookToken)
            );
            toast.success("Copied webhook URL");
          }}
        >
          Copy webhook URL
        </DropdownMenuItem>
        {/* copy CLI command */}
        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(
              getCliCommand(props.row.cliToken)
            );
            toast.success("Copied CLI command");
          }}
        >
          Copy CLI command
        </DropdownMenuItem>
        {/* edit a source */}
        <DropdownMenuLabel>
          <UpdateSourceDialog
            UPDATE={props.row.actions.UPDATE}
            source={props.row}
          >
            Edit
          </UpdateSourceDialog>
        </DropdownMenuLabel>
        {/* delete a source */}
        <DropdownMenuItem
          onClick={() =>
            startTransition(async () => {
              await props.row.actions.DELETE({
                sourceId: props.row.id,
              });
              toast.success(`Deleted source "${props.row.name}"`);
            })
          }
        >
          {isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
