"use client";

import { DataTable, ColumnDef } from "@sarim.garden/ui/client";

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

export const SourceList = () => {
  return <DataTable columns={columns} data={data} />;
};

export const SourceListItem = () => {
  return <div className="border rounded-md shadow p-4">Source item</div>;
};
