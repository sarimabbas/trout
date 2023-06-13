"use client";

import { DataTable, ColumnDef, Button } from "@sarim.garden/ui/client";
import { SourcesRecord, SelectedPick } from "@trout/xata";

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
}

export const SourceList = (props: SourceListProps) => {
  const { sources } = props;

  console.log({ sources: JSON.stringify(sources, null, 2) });

  return (
    <div className="flex flex-col gap-8">
      <Button className="self-end">Create new</Button>
      <DataTable columns={columns} data={sources} />
    </div>
  );
};

export const SourceListItem = () => {
  return <div className="border rounded-md shadow p-4">Source item</div>;
};
