import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Post extends Document {
  title: string;
  content: string;
  author: string; // Clerk User ID
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  likedBy: string[]; // Array of Clerk User IDs
}

const PostSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    
    // Storing Clerk user ID instead of MongoDB ObjectId
    author: { type: String, required: true }, 
    
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] }, // Array of Clerk user IDs
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

export default models.Post || model<Post>("Post", PostSchema);
