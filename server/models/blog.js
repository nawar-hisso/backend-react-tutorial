import mongoose from "mongoose";
import { DATABASE } from "../configs/database.js";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model(DATABASE.MODEL_NAMES.BLOGS, blogSchema);

export default Blog;
