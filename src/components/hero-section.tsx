"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const features = [
    "Create posts effortlessly",
    "Read blogs from others",
    "Comment and engage with the community",
  ];

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 bg-background">
      {/* Left Side: Text Content */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Share Your <span className="text-primary">Tech Ideas</span> with the World
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A modern blog platform for tech enthusiasts to create, read, and discuss cutting-edge innovations.
        </motion.p>

        {/* Feature Points */}
        <motion.ul
          className="space-y-3 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle2 className="text-primary w-5 h-5" />
              <span className="text-lg">{feature}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-4 pt-6 justify-center md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/blog">
            <Button size="lg" variant="outline">
              Explore Blogs
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side: Hero Image */}
      <motion.div
        className="flex-1 mt-12 md:mt-0 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Image
          src="https://png.pngtree.com/thumb_back/fh260/background/20220506/pngtree-dark-grunge-room-web-design-concept-blogging-platform-photo-image_17739772.jpg"
          alt="Tech Blog Illustration"
          width={500}
          height={400}
          priority
          className="rounded-2xl shadow-lg"
        />
      </motion.div>
    </section>
  );
}
