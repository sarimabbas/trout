"use client";

import * as accessTokenActions from "@/actions/accessTokens";
import {
  Button,
  ColumnDef,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Toggle,
  TypographyH2,
  TypographyInlineCode,
  TypographySubtle,
  toast,
} from "@sarim.garden/ui/client";
import { Dot, Eye, EyeOff, MoreHorizontal } from "lucide-react";
import { useState, useTransition } from "react";
import { UpdateAccessTokenDialog } from "./update-access-token-dialog";

interface AccessTokensSectionProps {
  accessTokens: Awaited<ReturnType<typeof accessTokenActions.READ>>;
  CREATE: typeof accessTokenActions.CREATE;
  UPDATE: typeof accessTokenActions.UPDATE;
  DELETE: typeof accessTokenActions.DELETE;
}

type AccessToken = Awaited<ReturnType<typeof accessTokenActions.READ>>[number];
type AccessTokenWithActions = AccessToken & {
  actions: {
    UPDATE: typeof accessTokenActions.UPDATE;
    DELETE: typeof accessTokenActions.DELETE;
  };
};

export const AccessTokensSection = (props: AccessTokensSectionProps) => {
  const { accessTokens, CREATE, UPDATE, DELETE } = props;
  const [isPending, startTransition] = useTransition();
  const accessTokensWithActions: AccessTokenWithActions[] = accessTokens.map(
    (accessToken) => {
      return {
        ...accessToken,
        actions: {
          UPDATE,
          DELETE,
        },
      };
    }
  );

  return (
    <div className="flex flex-col gap-8">
      <TypographyH2>Access tokens</TypographyH2>
      <TypographySubtle>
        Use access tokens to authorize the CLI to receive events. Keep these
        safe!
      </TypographySubtle>
      <Button
        onClick={() =>
          startTransition(async () => {
            const accessToken = await CREATE();
            toast.success(`Created access token "${accessToken.name}"`);
          })
        }
        className="ml-auto w-fit"
      >
        {isPending ? "Creating..." : "Create new access token"}
      </Button>
      <DataTable columns={columns} data={accessTokensWithActions} />
    </div>
  );
};

export const columns: ColumnDef<AccessTokenWithActions>[] = [
  {
    accessorKey: "id",
    header: "Token",
    cell: ({ row }) => {
      return <ToggleHiddenField value={row.original.id} />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "xata.createdAt",
    header: "Created at",
    id: "createdAt",
    accessorFn: (accessToken) => {
      // human readable date time
      return new Date(accessToken.xata.createdAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "xata.updatedAt",
    header: "Updated at",
    id: "updatedAt",
    accessorFn: (accessToken) => {
      // human readable date time
      return new Date(accessToken.xata.updatedAt).toLocaleDateString();
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionsMenu row={row.original} />;
    },
  },
];

interface ActionsMenuProps {
  row: AccessTokenWithActions;
}

const ActionsMenu = (props: ActionsMenuProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* copy token */}
        <DropdownMenuItem
          onClick={async () => {
            await navigator.clipboard.writeText(props.row.id);
            toast.success("Copied access token");
          }}
        >
          Copy access token
        </DropdownMenuItem>
        {/* edit an access token */}
        <DropdownMenuLabel>
          <UpdateAccessTokenDialog
            UPDATE={props.row.actions.UPDATE}
            accessToken={props.row}
          >
            Edit
          </UpdateAccessTokenDialog>
        </DropdownMenuLabel>
        {/* delete an access token */}
        <DropdownMenuItem
          onClick={() =>
            startTransition(async () => {
              await props.row.actions.DELETE({
                accessTokenId: props.row.id,
              });
              toast.success(`Deleted access token "${props.row.name}"`);
            })
          }
        >
          {isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToggleHiddenFieldProps {
  value: string;
}

const ToggleHiddenField = (props: ToggleHiddenFieldProps) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="flex items-center gap-2 w-fit">
      <Toggle
        pressed={isHidden}
        onPressedChange={setIsHidden}
        aria-label="Toggle access token visibility"
      >
        {isHidden ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </Toggle>
      {isHidden ? (
        Array(10)
          .fill(0)
          .map((_, idx) => <Dot key={idx} className="w-4 h-4" />)
      ) : (
        <TypographyInlineCode>{props.value}</TypographyInlineCode>
      )}
    </div>
  );
};
