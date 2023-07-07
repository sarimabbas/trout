"use client";

import * as accessTokenActions from "@/actions/accessTokens";
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

interface UpdateAccessTokenDialogProps {
  accessToken: Awaited<ReturnType<typeof accessTokenActions.READ>>[number];
  UPDATE: typeof accessTokenActions.UPDATE;
  children: React.ReactNode;
}

export const UpdateAccessTokenDialog = (
  props: UpdateAccessTokenDialogProps
) => {
  const [open, setOpen] = useState(false);
  const { children, accessToken, UPDATE } = props;
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(accessToken.name);

  const onSubmit = () => {
    startTransition(async () => {
      await UPDATE({
        accessTokenId: accessToken.id,
        name,
      });
      setOpen(false);
      toast.success(`Updated access token ${name}`);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update access token</DialogTitle>
        </DialogHeader>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="access token name"
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
