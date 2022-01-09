import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    RSAPublicKey: {
      type: String,
      required: true,
      default: true,
    },
    RSAencodeKey: {
      type: String,
    },
    n: {
      type: String,
      required: true,
    },
    images: [],
    user: [],
  },
  { timestamps: true }
);

export const userModel = mongoose.model("users", schema);
