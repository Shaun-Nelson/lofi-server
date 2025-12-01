import { Types } from "mongoose";

export type SoundId =
  | "rain"
  | "vinyl"
  | "piano"
  | "cafe"
  | "birds"
  | "keyboard";

export interface Sound {
  id: SoundId;
  name: string;
  fileUrl: string;
  defaultVolume: number;
}

export interface MixSoundConfig {
  soundId: SoundId;
  volume: number;
  enabled: boolean;
}

export interface Mix {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  sounds: MixSoundConfig[];
}
