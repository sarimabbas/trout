"use client";

import * as sourceActions from "@/actions/sources";
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

interface UpdateSourceDialogProps {
  source: Awaited<ReturnType<typeof sourceActions.READ>>[number];
  UPDATE: typeof sourceActions.UPDATE;
  children: React.ReactNode;
}

export const UpdateSourceDialog = (props: UpdateSourceDialogProps) => {
  const [open, setOpen] = useState(false);
  const { children, source, UPDATE } = props;
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(source.name);

  const onSubmit = () => {
    startTransition(async () => {
      await UPDATE({
        name,
        sourceId: source.id,
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
          <DialogTitle>Update source</DialogTitle>
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
