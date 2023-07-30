"use client";

import * as sinkActions from "@/actions/sinks";
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

interface UpdateSinkDialogProps {
  sink: Awaited<ReturnType<typeof sinkActions.READ>>[number];
  UPDATE: typeof sinkActions.UPDATE;
  children: React.ReactNode;
}

export const UpdateSinkDialog = (props: UpdateSinkDialogProps) => {
  const [open, setOpen] = useState(false);
  const { children, sink, UPDATE } = props;
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(sink.name);
  const [url, setUrl] = useState(sink.url);

  const onSubmit = () => {
    // @ts-ignore
    startTransition(async () => {
      await UPDATE({
        sinkId: sink.id,
        name,
        url,
      });
      setOpen(false);
      toast.success(`Updated sink ${name}`);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update sink</DialogTitle>
        </DialogHeader>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="sink name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={1}
        />
        <Label>URL</Label>
        <Input
          type="url"
          placeholder="sink URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={onSubmit} variant="outline" className="w-fit">
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
