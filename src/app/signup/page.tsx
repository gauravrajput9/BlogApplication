"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Github, Chrome } from "lucide-react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: Connect to your signup API
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center">
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Email/Password Signup Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Username</label>
                <Input type="text" placeholder="Enter username" required />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter email" required />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Password</label>
                <Input type="password" placeholder="Enter password" required />
              </div>
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-muted"></div>
              <span className="px-2 text-muted-foreground text-sm">or</span>
              <div className="flex-grow h-px bg-muted"></div>
            </div>

            {/* Social Signup Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => signIn("google")}
              >
                <Chrome className="w-5 h-5" />
                Sign up with Google
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => signIn("github")}
              >
                <Github className="w-5 h-5" />
                Sign up with GitHub
              </Button>
            </div>

            {/* Redirect to Login */}
            <p className="text-center text-sm mt-4 text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
