"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function EditProfilePage() {
  const { data: session } = useSession();

  const [name, setName] = useState(session?.user?.name || "");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(session?.user?.image || "/default-avatar.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // API call to update profile
    console.log({ name, bio, image });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-card border rounded-2xl shadow-lg p-6 flex flex-col gap-6"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-24 h-24">
            <AvatarImage src={image} alt="Profile" />
            <AvatarFallback>
              {session?.user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <label className="cursor-pointer text-sm text-primary hover:underline">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            Change photo
          </label>
        </div>

        {/* Name Field */}
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            className="mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {/* Bio Field */}
        <div>
          <label className="text-sm font-medium">Bio</label>
          <Textarea
            className="mt-1 resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell something about yourself"
            rows={3}
          />
        </div>

        {/* Save Button */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
