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
  volume: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MixSoundConfig {
  soundId: SoundId;
  volume: number;
  enabled: boolean;
}

export interface Mix {
  name: string;
  sounds: MixSoundConfig[];
  createdAt: Date;
  updatedAt: Date;
}
