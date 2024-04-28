import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  username: string;
  interests: string[];
  location: number;
  gender: string;
  university: string;
  image: string;
  completeProfile: boolean;
  score?: number;
  genderInterested: string;
  distance: number;
  limit: {
    count: number;
    date?: string;
  };
  liked?: string[];
  disLiked?: string[];
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String },
  interests: [{ type: String }],
  location: { type: Number },
  university: { type: String },
  image: { type: String },
  gender: { type: String },
  genderInterested: { type: String },
  distance: { type: Number },
  completeProfile: { type: Boolean },
  limit: { type: { count: Number, date: String } },
  liked: [{ type: String }],
  disLiked: [{ type: String }],
});

userSchema.index({ gender: "text", interests: "text", location: 1 });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
