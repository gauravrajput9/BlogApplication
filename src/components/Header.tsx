"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const router = useRouter()

  return (
    <nav className="flex justify-between items-center px-8 py-2 border-b bg-background">
      {/* Left Section: Logo + Heading */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo2.png"
          alt="Logo"
          width={70} // Increased size
          height={70} // Increased size
          priority
        />
        <span className="text-2xl font-extrabold tracking-tight">My Blog</span>
      </Link>

      {/* Center Section: Navigation */}
      <div className="hidden md:flex gap-8 text-lg">
        <Link href="/" className="font-semibold hover:text-primary transition">
          Home
        </Link>
        <Link
          href="/blog"
          className="font-semibold hover:text-primary transition"
        >
          Blog
        </Link>
        <Link
          href="/about"
          className="font-semibold hover:text-primary transition"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="font-semibold hover:text-primary transition"
        >
          Contact
        </Link>
      </div>

      {/* Right Section: Theme + Auth */}
      <div className="flex items-center gap-5">
        <ThemeToggle />

        {!isLoggedIn ? (
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Signup</Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer w-10 h-10">
                <AvatarImage src={session.user.image || "https://i.pravatar.cc/80"} alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-32 flex flex-col items-center gap-2 p-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  signOut({
                    callbackUrl:"/"
                  });
                }}
              >
                Logout
              </Button>
              <Button onClick={() => router.push("/edit-profile")} variant="outline" className="w-full">
                Edit Profile
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
}
