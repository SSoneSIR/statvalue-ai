"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { useAuth } from "../app/context/AuthContext";

const routes = [
  { href: "/", label: "Home" },
  { href: "/compare", label: "Compare Players" },
  { href: "/predict", label: "Predict Value" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-wrap h-14 items-center justify-between">
        {/* Logo */}
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

          {/* Show Admin only if logged in as admin */}
          {user && user.role === "admin" && (
            <Link
              href="/admin"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/admin" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Login/Register or Logout */}
        <div className="hidden md:flex space-x-1">
          {user ? (
            <>
              <span className="text-foreground/80">
                Welcome, {user.username}
              </span>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link key={route.href} href={route.href}>
                  {route.label}
                </Link>
              ))}
              {user && user.role === "admin" && (
                <Link href="/admin">Admin</Link>
              )}
              {user ? (
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Register</Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
