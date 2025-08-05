import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog.models";
import User from "@/models/user.models";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { errors: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const allUsers = await User.find();
    console.log("All users in DB:", allUsers);

    const user = await User.findOne({ email: session.user.email });
    console.log(session.user.email);
    if (!user) {
      return NextResponse.json({ errors: "User not found" }, { status: 404 });
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { errors: "Title and content are required" },
        { status: 400 }
      );
    }

    const duplicateBlog = await Blog.findOne({
      title: title.trim(),
      content: content.trim(),
      author: user._id,
    });

    if (duplicateBlog) {
      return NextResponse.json(
        { errors: "You have already created this blog" },
        { status: 409 }
      );
    }

    let createdBlog = await Blog.create({
      title,
      content,
      author: user._id,
    });

    // 3. Populate author for response
    createdBlog = await createdBlog.populate("author", "name email");

    return NextResponse.json({ createdBlog }, { status: 201 });
  } catch (error: any) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { errors: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    // Fetch all blogs and populate author info
    const blogs = await Blog.find().populate("author", "name email image");

    if (!blogs || blogs.length === 0) {
      return NextResponse.json({ errors: "No blogs found" }, { status: 404 });
    }

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { errors: "Internal Server Error" },
      { status: 500 }
    );
  }
}
