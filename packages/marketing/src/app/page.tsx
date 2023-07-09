import { Navbar } from "@/components/navbar";
import {
  Button,
  TypographyH4,
  TypographyInlineCode,
  TypographyP,
} from "@sarim.garden/ui/client";
import { cn } from "@sarim.garden/ui/isomorphic";
import { Inbox, Send, TerminalSquare } from "lucide-react";
import { Bungee } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const bungee = Bungee({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className="container flex flex-col items-center gap-16 py-10 mx-auto text-center md:px-40 lg:px-64">
      <Navbar />
      {/* headline */}
      <div className={cn("text-6xl text-blue-500 ", bungee.className)}>
        Webhooks 🎣 made easy
      </div>
      {/* cover */}
      {/* <div className="w-full bg-gray-200 shadow-sm rounded-xl aspect-video" /> */}
      <img
        alt="cover"
        src="/cover.png"
        className="object-scale-down w-full shadow-lg rounded-xl"
      />
      {/* feature section header */}
      <div className={cn("text-2xl text-blue-500 ", bungee.className)}>
        All the features an indie needs
      </div>
      {/* features */}
      <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* sources */}
        <GridItem>
          <Inbox className="w-8 h-8 text-blue-500" />
          <TypographyH4 className="m-0">Receive with sources</TypographyH4>
          <TypographyP className="!m-0">
            Each source comes with a unique URL you can plug into your external
            services
          </TypographyP>
        </GridItem>
        {/* local */}
        <GridItem>
          <TerminalSquare className="w-8 h-8 text-blue-500" />
          <TypographyH4 className="m-0">Local development</TypographyH4>
          <TypographyP className="!m-0">
            Listen to events locally using the CLI
            <br />
            <TypographyInlineCode className="w-fit">
              npm i @trout.run/cli
            </TypographyInlineCode>
          </TypographyP>
        </GridItem>
        {/* sinks */}
        <GridItem>
          <Send className="w-8 h-8 text-blue-500" />
          <TypographyH4 className="m-0">Send to sinks</TypographyH4>
          <TypographyP className="!m-0">
            Redirect webhook events to any URL, with automatic retries
          </TypographyP>
        </GridItem>
      </div>
      {/* cta */}
      <div className="flex items-center gap-4">
        <Link href="https://getwaitlist.com/waitlist/8877">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-500"
          >
            Sign up
          </Button>
        </Link>
        <Link href="https://docs.trout.run">
          <Button variant="secondary" className="px-8 py-6 text-lg">
            Read the docs
          </Button>
        </Link>
      </div>
    </main>
  );
}

interface GridItemProps {
  children: React.ReactNode;
}

const GridItem = (props: GridItemProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-8 border-4 border-blue-200 shadow-sm rounded-xl">
      {props.children}
    </div>
  );
};
