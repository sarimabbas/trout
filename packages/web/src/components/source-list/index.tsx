"use client";

import type { ICreateSource, IDeleteSource, IEditSource } from "@/app/_actions";
import {
  Source,
  getCliCommand,
  getWebhookUrl,
  useOrgOrUserId,
} from "@/app/_utils";
import {
  Button,
  ColumnDef,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  toast,
} from "@sarim.garden/ui/client";
import { SelectedPick, SourcesRecord } from "@trout/xata";
import { MoreHorizontal } from "lucide-react";
import { useTransition } from "react";
import { EditSourceDialog } from "../edit-source-dialog/edit-source-dialog";

type SourceWithActions = Source & {
  actions: {
    editSource: IEditSource;
    deleteSource: IDeleteSource;
  };
};

export const columns: ColumnDef<SourceWithActions>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
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
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* copy webhook URL */}
        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(getWebhookUrl(props.row.id));
            toast.success("Copied webhook URL");
          }}
        >
          Copy webhook URL
        </DropdownMenuItem>
        {/* copy CLI command */}
        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(
              getCliCommand(lookupId, props.row.id)
            );
            toast.success("Copied CLI command");
          }}
        >
          Copy CLI command
        </DropdownMenuItem>
        {/* edit a source */}
        <DropdownMenuLabel>
          <EditSourceDialog
            editSource={props.row.actions.editSource}
            data={props.row}
          >
            Edit
          </EditSourceDialog>
        </DropdownMenuLabel>
        {/* delete a source */}
        <DropdownMenuItem
          onClick={() =>
            startTransition(async () => {
              await props.row.actions.deleteSource({
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

interface SourceListProps {
  sources: Readonly<SelectedPick<SourcesRecord, ["*"]>>[];
  createSource: ICreateSource;
  editSource: IEditSource;
  deleteSource: IDeleteSource;
}

export const SourceList = (props: SourceListProps) => {
  const { sources, createSource, editSource, deleteSource } = props;
  const [isPending, startTransition] = useTransition();

  const sourcesWithActions = sources.map((source) => {
    return {
      ...source,
      actions: {
        editSource,
        deleteSource,
      },
    };
  });

  return (
    <div className="flex flex-col gap-8">
      <Button
        onClick={() =>
          startTransition(async () => {
            const source = await createSource();
            toast.success(`Created source "${source.name}"`);
          })
        }
        className="w-fit ml-auto"
      >
        {isPending ? "Creating..." : "Create new"}
      </Button>
      <DataTable columns={columns} data={sourcesWithActions} />
    </div>
  );
};
