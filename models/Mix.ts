import { Document, Schema, model } from "mongoose";
import { Mix } from "../types/index";

export interface IMix extends Document, Mix {}

const MixSchema = new Schema<IMix>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    sounds: { type: [] },
  },
  {
    timestamps: true,
  }
);

export default model<IMix>("Mix", MixSchema);
