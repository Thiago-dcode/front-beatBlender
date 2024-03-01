import {
  EntityNotFoundError,
  InternalError,
} from "@/lib/exceptions/exceptions";
import { Data } from "./type";
import { Keyboard } from "@/types";
export const getFreeKeyboard = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/free/keyboards/${id}`
  );
  if (!res.ok) {
    console.log(res);
    switch (res.status) {
      case 404:
        throw new EntityNotFoundError(`Free keyboard not found`);
      default:
    }
    throw new Error("Free keyboard not found");
  }
  const data: Data = await res.json();

  return data;
};
export const getFreeKeyboards = async () => {
  try {
    const res = await fetch(`${process.env.HOST}/free/keyboards`);
    if (!res.ok) {
      throw new Error("Free keyboards not found");
    }
    const data: {
      keyboards: Keyboard[];
    } = await res.json();

    return data.keyboards;
  } catch (error) {
    throw new InternalError("Internal error");
  }
};
