"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  { href: "/", label: "Home" },
  { href: "/compare", label: "Compare Players" },
  { href: "/predict", label: "Predict Value" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-wrap h-14 items-center justify-between">
        {/* Logo on the far left */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img
              src="/logo.png"
              alt="StatValue AI Logo"
              className="h-8 w-auto"
            />
          </Link>
          <span className="hidden font-bold sm:inline-block">StatValue AI</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === route.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Login and Register buttons */}
        <div className="hidden md:flex space-x-1">
          <Link href="/login" className="hidden md:inline-flex">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register" className="hidden md:inline-flex">
            <Button>Register</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-lg font-medium"
                >
                  {route.label}
                </Link>
              ))}
              <Link href="/login" className="text-lg font-medium">
                Login
              </Link>
              <Link href="/register" className="text-lg font-medium">
                Register
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
