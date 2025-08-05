import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.models";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user?.email;
    if (!email) {
      return NextResponse.json(
        { error: "Email not found in session" },
        { status: 400 }
      );
    }

    const { name, role, bio, image } = await req.json();
    console.log(name, role, bio, image, email)

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name and role are required" },
        { status: 400 }
      );
    }

    if (role === "author" && !bio?.trim()) {
      return NextResponse.json(
        { error: "Bio is required for authors" },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name,
          role,
          bio: role === "author" ? bio : "",
          image,
        },
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Edit profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
