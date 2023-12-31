import { Navbar } from "@/components/navbar";
import {
  Button,
  TypographyH4,
  TypographyInlineCode,
  TypographyP,
  TypographySubtle,
} from "@sarim.garden/ui/client";
import { cn } from "@sarim.garden/ui/isomorphic";
import { Inbox, Send, TerminalSquare } from "lucide-react";
import { Bungee } from "next/font/google";
import Link from "next/link";

const bungee = Bungee({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className="container flex flex-col items-center gap-16 py-10 mx-auto text-center md:px-16 lg:px-32 xl:px-56">
      <Navbar />
      {/* headline */}
      <div className={cn("text-6xl text-blue-500 ", bungee.className)}>
        Webhooks 🎣 made easy
      </div>
      {/* cover */}
      <video
        src="/promo.mp4"
        autoPlay
        loop
        muted
        controls
        className="w-full border-2 border-gray-200 rounded-xl"
      />
      {/* feature section header */}
      <div className={cn("text-2xl text-blue-500 ", bungee.className)}>
        All the features an indie developer needs
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
              npm i @trout.run/cli -g
            </TypographyInlineCode>
          </TypographyP>
        </GridItem>
        {/* sinks */}
        <GridItem>
          <Send className="w-8 h-8 text-blue-500" />
          <TypographyH4 className="m-0">Send to sinks</TypographyH4>
          <TypographyP className="!m-0">
            Forward webhook events to any URL, with automatic retries
          </TypographyP>
        </GridItem>
      </div>
      {/* cta */}
      <div className="flex items-center gap-4">
        <Link href="https://getwaitlist.com/waitlist/8877">
          <Button
            size="lg"
            className="px-8 py-6 bg-blue-600 md:text-lg hover:bg-blue-500"
          >
            Sign up
          </Button>
        </Link>
        <Link href="https://docs.trout.run">
          <Button variant="secondary" className="px-8 py-6 md:text-lg">
            Read the docs
          </Button>
        </Link>
      </div>
      {/* footer */}
      <div className="flex flex-col items-center gap-4">
        <TypographySubtle className="!m-0">
          ©️ {new Date().getFullYear()}. Made in San Francisco.
        </TypographySubtle>
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
