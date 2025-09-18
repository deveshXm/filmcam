import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  tier: 'free' | 'premium';
  imageCount: number;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  imageCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<IUser>('User', UserSchema);
