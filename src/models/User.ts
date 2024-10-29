// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default UserModel;
