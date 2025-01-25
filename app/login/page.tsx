"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";

interface LoginError {
  error: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      router.push("/"); // Redirect to home page after successful login
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null && "error" in err) {
        setError((err as { error: string }).error);
      } else {
        setError("An unexpected error occurred during login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
      <Card className="w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden bg-gray-800 text-white">
        <div className="lg:w-1/2 relative h-48 sm:h-64 lg:h-auto">
          <Image
            src="/login.png"
            alt="Login illustration"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="lg:w-1/2 p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-400">
              Login to StatValue AI
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:border-blue-400"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-300">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-400 hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
