import mongoose from "mongoose";

const genSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});
