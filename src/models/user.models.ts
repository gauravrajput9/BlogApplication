import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; 
  image?: string;  
  role: "user" | "author" | "admin";
  bio?: string;      
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    image: {
      type: String,
      default: "/logo.png",
    },
    role: {
      type: String,
      enum: ["user", "author", "admin"],
      default: "user",
    },
    bio: {
      type: String,
      required: function (this: IUser) {
        return this.role === "author";
      },
      trim: true,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
