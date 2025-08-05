import { connectDB } from "@/lib/mongodb"
import User from "@/models/user.models"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        await connectDB()
        const email = await req.json()

        if(!email){
            return NextResponse.json({
                errors: "Cannot find the user finding option(email)"
            },{status: 400})
        }

        const user = await User.findOne(email)
        if(!user){
            return NextResponse.json({
                errors: "cannot find the user"
            },{status: 404})
        }

        return NextResponse.json({
            user
        },{status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error
        })
    }
}