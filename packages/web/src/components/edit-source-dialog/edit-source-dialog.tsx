"use client";

import type { IEditSource } from "@/app/_actions";
import { Source } from "@/app/_utils";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  toast,
} from "@sarim.garden/ui/client";
import { useState, useTransition } from "react";

interface EditSourceDialogProps {
  children: React.ReactNode;
  editSource: IEditSource;
  data: Source;
}

export const EditSourceDialog = (props: EditSourceDialogProps) => {
  const [open, setOpen] = useState(false);
  const { children, editSource } = props;
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(props.data.name);

  const onSubmit = () => {
    startTransition(async () => {
      await editSource({
        name,
        sourceId: props.data.id,
      });
      setOpen(false);
      toast.success(`Updated source ${name}`);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit source</DialogTitle>
        </DialogHeader>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="source name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={1}
        />
        <Button onClick={onSubmit} variant="outline" className="w-fit">
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
