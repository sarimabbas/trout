import { Button } from "@sarim.garden/ui/client";
import { HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@sarim.garden/ui/client";
import Link from "next/link";

export const MoreDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">More links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <Link href="https://github.com/sarimabbas/trout">
          <DropdownMenuItem>👨‍💻&nbsp;&nbsp;GitHub</DropdownMenuItem>
        </Link>
        <Link href="https://docs.trout.run">
          <DropdownMenuItem>📃&nbsp;&nbsp;Docs</DropdownMenuItem>
        </Link>
        <Link href="https://trout.canny.io">
          <DropdownMenuItem>🗺️&nbsp;&nbsp;Roadmap</DropdownMenuItem>
        </Link>
        <Link href="https://trout.canny.io/changelog">
          <DropdownMenuItem>🪵&nbsp;&nbsp;Changelog</DropdownMenuItem>
        </Link>
        <Link href="https://trout.canny.io">
          <DropdownMenuItem>💬&nbsp;&nbsp;Submit feedback</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
