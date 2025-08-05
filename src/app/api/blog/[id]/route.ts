import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/blog.models";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = await params.id;
  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }
    const blog = await Blog.findById(id).populate({
        path: "author",
        select: "name email"
    })

    if(!blog){
        return NextResponse.json({
            errors: "Cannot Find the Blog"
        },{
            status: 404
        })
    }
    return NextResponse.json({
        blog
    },{
        status: 201
    })
  } catch (error) {
    return NextResponse.json(
      {
        errors: error,
      },
      {
        status: 500,
      }
    );
  }
}
