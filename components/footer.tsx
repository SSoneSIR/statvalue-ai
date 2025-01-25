import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-4 px-2 text-center md:h-24 md:flex-row">
        <div className=" flex-1 flex items-left justify-center">
          <p className="text-center text-sm leading-loose">
            &copy; 2024|All rights Reserved| Built by StatValue AI Team. The
            source code is available on{" "}
            <Link
              href="https://github.com/SSoneSIR"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="https://x.com/SS_1822_SS"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/yashaswan-gautam-b65824250/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
