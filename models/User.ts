import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: true },
    authProvider: { type: String },
    image: { type: String },
    coverImage: { type: String },
    professionalTitle: { type: String },
    city: { type: String },
    location: { type: String },
    socialMedia: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
    },
    about: { type: String },
    likedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
