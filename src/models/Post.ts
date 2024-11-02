import mongoose, { Schema, Document, model, models } from "mongoose";

export interface Post extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  likes: { type: Number, default:0 }; 
  likedBy: string[],
}

const PostSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: { type:Number, default:0},
    likedBy: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export default models.Post || model<Post>("Post", PostSchema);
