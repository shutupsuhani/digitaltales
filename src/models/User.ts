import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: String, // Clerk's user ID
  email: String,
  username: String,
  image: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
