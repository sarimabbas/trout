import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sarim.garden/ui/client";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

export const MoreDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-[1.2rem] w-[1.2rem] dark:text-white" />
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
