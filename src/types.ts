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

export interface KeyboardWithKeys extends Keyboard {
  keys: key[];
}

export interface key {
  id: number;
  letter: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  desig_keyId: number | null;
  categories: category[];
  soundId: number | null;
  sound: Sound;
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
