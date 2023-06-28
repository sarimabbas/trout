"use client";

import { Source } from "@/app/_utils";
import {
  Button,
  ColumnDef,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@sarim.garden/ui/client";
import { SelectedPick, SourcesRecord } from "@trout/xata";
import { MoreHorizontal } from "lucide-react";
import { EditSourceDialog } from "../edit-source-dialog/edit-source-dialog";

type SourceWithActions = Source & {
  actions: {
    editSource: (formData: FormData) => Promise<void>;
    deleteSource: (formData: FormData) => Promise<void>;
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* edit a source */}
            <DropdownMenuLabel>
              <EditSourceDialog
                editSource={row.original.actions.editSource}
                data={row.original}
              >
                Edit
              </EditSourceDialog>
            </DropdownMenuLabel>
            {/* delete a source */}
            <form>
              <DropdownMenuItem asChild>
                <input
                  type="submit"
                  className="w-full"
                  formAction={() => {
                    const formData = new FormData();
                    formData.append("sourceId", row.original.id);
                    return row.original.actions.deleteSource(formData);
                  }}
                  value="Delete"
                />
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface SourceListProps {
  sources: Readonly<SelectedPick<SourcesRecord, ["*"]>>[];
  createSource: (formData: FormData) => Promise<void>;
  editSource: (formData: FormData) => Promise<void>;
  deleteSource: (formData: FormData) => Promise<void>;
}

export const SourceList = (props: SourceListProps) => {
  const { sources, createSource, editSource, deleteSource } = props;

  const sourcesWithActions = sources.map((source) => {
    return {
      ...source,
      actions: {
        editSource: (props: FormData) => {
          return editSource(props);
        },
        deleteSource: (props: FormData) => {
          return deleteSource(props);
        },
      },
    };
  });

  return (
    <div className="flex flex-col gap-8">
      <form className="ml-auto">
        <Button formAction={createSource} className="w-fit">
          Create new
        </Button>
      </form>
      <DataTable columns={columns} data={sourcesWithActions} />
    </div>
  );
};
