import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog.models";
import User from "@/models/user.models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { authorId: string } }
) {
  try {
    await connectDB();
    const { authorId } = await params;

    
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return NextResponse.json({ error: "Invalid author ID" }, { status: 400 });
    }


    const author = await User.findById(authorId);
    if (!author) {
      return NextResponse.json(
        { errors: "Cannot find the author" },
        { status: 404 }
      );
    }

    // Fetch blogs by this author
    const blogs = await Blog.find({ author: authorId });

    return NextResponse.json(
      {
        author,
        blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { errors: "Something went wrong" },
      { status: 500 }
    );
  }
}
