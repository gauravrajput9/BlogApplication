"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked:
      "This email is already linked to another sign-in method. Please use the provider you originally signed up with.",
    Default: "An unknown error occurred. Please try again.",
  };

  const message = errorMessages[error || "Default"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Sign-in Error</h1>
      <p className="text-lg mb-6">{message}</p>
      <Link
        href="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Login
      </Link>
    </div>
  );
}
