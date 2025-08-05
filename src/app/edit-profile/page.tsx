"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (email: string) => {
  const res = await fetch("/api/user/get-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Cannot get user");
  }
  return data.user;
};

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const email = session?.user.email;

  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);

  // Use React Query to fetch user
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUser(email!),
    enabled: !!email,
  });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setRole(user.role || "user");
      setBio(user.bio || "");
      setImage(user.image || "/logo.png");
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // TEMPORARY PREVIEW
      setImage(URL.createObjectURL(file));
      // TODO: Upload to Cloudinary & save URL
    }
  };

  const handleSave = async () => {
    if (role === "author" && !bio.trim()) {
      alert("Bio is required for authors");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/user/edit-user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, bio, image }),
    });

    const data = await res.json();
    console.log(data)
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Failed to update profile");
      return;
    }

    // Update session data without reload
    update({ name: data.user.name, image: data.user.image });
    alert("Profile updated successfully!");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

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
            <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <label className="cursor-pointer text-sm text-primary hover:underline">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
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

        {/* Role Field */}
        <div>
          <label className="text-sm font-medium">Role</label>
          <select
            className="mt-1 w-full rounded-md border p-2 bg-background"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="author">Author</option>
          </select>
        </div>

        {/* Bio Field (only for author) */}
        {role === "author" && (
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
        )}

        {/* Save Button */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button onClick={handleSave} className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
