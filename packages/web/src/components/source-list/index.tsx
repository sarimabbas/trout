"use client";

import { DataTable, ColumnDef } from "@sarim.garden/ui/client";
import { SourcesRecord, SelectedPick } from "@trout/xata";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const data: Payment[] = [
  {
    id: "1",
    amount: 100,
    status: "pending",
    email: "eemail",
  },
];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

interface SourceListProps {
  sources: Readonly<SelectedPick<SourcesRecord, ["*"]>>[];
}

export const SourceList = (props: SourceListProps) => {
  const { sources } = props;
  return <DataTable columns={columns} data={data} />;
};

export const SourceListItem = () => {
  return <div className="border rounded-md shadow p-4">Source item</div>;
};
