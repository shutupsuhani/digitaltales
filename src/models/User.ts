// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  firstname?: string;  
  lastname?: string;  
  email: string;
  username: string;    
  password?: string;  
  googleId?: string;   
  photoURL?: string;   
}

const userSchema = new Schema<User>({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true },
  photoURL: { type: String },
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default UserModel;
