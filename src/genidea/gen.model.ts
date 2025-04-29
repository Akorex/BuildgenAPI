import mongoose, { Schema } from "mongoose";
import { CreatorProfile, TimeSpan, TaskSchema } from "./gen.interface";

const genSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: String,
      required: true,
    },

    creatorProfile: {
      type: String,
      enum: Object.values(CreatorProfile),
      required: true,
    },

    timeSpan: {
      type: String,
      enum: Object.values(TimeSpan),
      required: true,
    },

    stack: {
      frontend: { type: String, required: true },
      backend: { type: String, required: true },
      auth: { type: String, required: true },
      ai: { type: String, required: true },
      deployment: { type: String, required: true },
    },

    tasks: [TaskSchema],
  },
  { timestamps: true }
);

const genRequest = mongoose.model("genrequest", genSchema);

export default genRequest;
