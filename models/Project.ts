import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    cover: { type: String },
    email: { type: String },
    status: { type: String, required: true },
    category: { type: String, required: true },
    techStack: { type: [String], required: true },
    keyFeatures: {
      type: [
        {
          title: { type: [String], required: true },
          description: { type: [String], required: true },
        },
      ],
      required: true,
    },
    gitHub: { type: [String] },
    documentation: { type: [String] },
    liveDemo: { type: [String] },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
