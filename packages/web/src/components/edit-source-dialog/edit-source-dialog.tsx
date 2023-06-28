"use client";

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
} from "@sarim.garden/ui/client";
import { useState } from "react";

interface EditSourceDialogProps {
  children: React.ReactNode;
  editSource: (formData: FormData) => Promise<void>;
  data: Source;
}

export const EditSourceDialog = (props: EditSourceDialogProps) => {
  const [open, setOpen] = useState(false);
  const { children, editSource } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit source</DialogTitle>
        </DialogHeader>
        <form
          className="gap-4 flex flex-col"
          action={editSource}
          onSubmit={() => {
            setOpen(false);
          }}
        >
          <input type="hidden" name="sourceId" value={props.data.id} />
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="source name"
            defaultValue={props.data.name}
            minLength={1}
            name="name"
          />
          <Button type="submit" variant="outline" className="w-fit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
