export type Method = "POST" | "GET" | "PATCH" | "DELETE" | "PUT" | "OPTIONS";
export type body = { [key: string]: any };
export interface RequestBody {
  options: {
    method: Method;
    resource: string;
  };
  data: body | undefined;
  requestOptions: RequestInit | undefined;
}

export interface Keyboard {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  private: boolean;
  userId: number;
  description?: string;
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
  name: string;
  path: string;
  designUrl: string;
  isPremium: boolean;
  colors: Color[];
}
export interface Color {
  color: string;
  id: number;
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

export interface User {
  avatar: string;
  biography: null | string;
  createdAt: string;
  email: string;
  id: number;
  isActive: boolean;
  name: null | string;
  password: string;
  token: string;
  updatedAt: string;
  username: string;
  avatarUrl: string;
}

export interface UserWithToken {
  user: User;
  accessToken: string;
  refreshToken: string;
}
export interface RefreshToken {
  accessToken: string;
  newRefreshToken: string;
}

export interface AccessToken {
  accessToken: string;
}
