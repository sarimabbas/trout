"use client";

import {
  Button,
  ColumnDef,
  DataTable,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@sarim.garden/ui/client";
import { SelectedPick, SourcesRecord } from "@trout/xata";

type Source = Readonly<SelectedPick<SourcesRecord, ["*"]>>;

export const columns: ColumnDef<Source>[] = [
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
];

interface SourceListProps {
  sources: Readonly<SelectedPick<SourcesRecord, ["*"]>>[];
  createSource: (formData: FormData) => Promise<void>;
}

export const SourceList = (props: SourceListProps) => {
  const { sources, createSource } = props;

  return (
    <div className="flex flex-col gap-8">
      <Dialog>
        <DialogTrigger className="self-end" asChild>
          <div>
            <Button>Create new</Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new source</DialogTitle>
          </DialogHeader>
          <form className="gap-4 flex flex-col" action={createSource}>
            <Input
              type="text"
              placeholder="my-source"
              minLength={1}
              name="source"
            />
            <Button type="submit" variant="outline" className="w-fit">
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <DataTable columns={columns} data={sources} />
    </div>
  );
};

export const SourceListItem = () => {
  return <div className="border rounded-md shadow p-4">Source item</div>;
};
