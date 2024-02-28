export interface Keyboard {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  private: boolean;
  userId: number;
  desig_keyboardId: number | null;
  categories: category[];
}

export interface KeyboardWithKeysAndDesign extends Keyboard {
  keys: key[];
  design: DesignKeyboard;
}

export interface key {
  id: number;
  key: string;
  bgColor?: string;
  keyColor?: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  desig_keyId: number | null;
  categories: category[];
  soundId: number | null;
  sound: Sound;
  effects: Effect[];
}

export type Effect = LoopEffect | VolumeEffect;
export interface LoopEffect {
  id: number;
  name: "loop";
  description: string;
  isActive: boolean;
  isPremium: boolean;
  config: {
    bpm: number;
  };
}
export interface VolumeEffect {
  id: number;
  name: "volume";
  description: string;
  isActive: boolean;
  isPremium: boolean;
  config: {
    level: number;
  };
}
export interface DesignKeyboard {
  id: number;
  name: string;
  path: string;
  designUrl: string;
  isPremium: false;
}
export enum KeySize {
  "sm" = 2,
  "md" = 4,
  "xl" = 7,
}
export interface Sound {
  id: number;
  name: string;
  path: string;
  userId: number;
  size: number;
  sound_folderId: number;
  soundUrl: string;
}
export interface category {
  id: number;
  name: string;
  userId: null | number;
}
