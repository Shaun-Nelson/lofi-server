import { Document, Schema, model } from "mongoose";
import { Sound } from "../types/index";

export interface ISound extends Document, Sound {}

const SoundSchema = new Schema<ISound>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fileUrl: { type: String, required: true, unique: true },
    defaultVolume: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ISound>("Sound", SoundSchema);
