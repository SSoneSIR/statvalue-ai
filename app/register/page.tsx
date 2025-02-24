"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { register } from "../api/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Added state for form submission status
  const router = useRouter();

  const validateForm = (): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    // Add validation logic here
    if (!username) {
      errors.username = "Username is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (password !== confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors; // Make sure this returns an object, even if it's empty
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform client-side validation first
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setError({}); // Reset errors

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirm_password }), // Sending form data as JSON
      });

      const data = await response.json();
      if (!response.ok) {
        // Backend validation errors
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(JSON.stringify(data.errors || data.error));
      }

      toast.success("Registration successful!");
      router.push("/login"); // Redirect to login page after successful registration
    } catch (error: any) {
      // Handle errors (backend or fetch)
      toast.error(error.message || "An error occurred during registration.");
      setError({ form: error.message || "Something went wrong!" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
      <Card className="w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden bg-gray-800 text-white">
        <div className="lg:w-1/2 relative h-48 sm:h-64 lg:h-auto">
          <Image
            src="/register.png"
            alt="Register illustration"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="lg:w-1/2 p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-400">
              Register for StatValue AI
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              Create your account to get started
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
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirm_password}
                  onChange={(e) => setconfirm_password(e.target.value)}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:border-blue-400"
                />
                {error.confirm_password && (
                  <p className="text-red-500">{error.confirm_password}</p>
                )}
              </div>
              {Object.keys(error).map((key) => (
                <p key={key} className="text-red-500">
                  {error[key]}
                </p>
              ))}

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Register
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
function setIsSubmitting(arg0: boolean) {
  throw new Error("Function not implemented.");
}
