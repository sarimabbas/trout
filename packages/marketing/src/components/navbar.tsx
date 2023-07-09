import { bungee } from "@/fonts";
import { TypographyH3, TypographyLink } from "@sarim.garden/ui/client";
import { cn } from "@sarim.garden/ui/isomorphic";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-8 py-6 border-4 border-blue-200 shadow-sm rounded-xl">
      <TypographyH3 className={cn(bungee.className, "m-0 text-blue-500")}>
        🐟 Trout
      </TypographyH3>
      <ul className="flex items-center gap-4">
        <li>
          <TypographyLink>Sign up</TypographyLink>
        </li>
        <li>
          <TypographyLink>Pricing</TypographyLink>
        </li>
      </ul>
    </div>
  );
};
