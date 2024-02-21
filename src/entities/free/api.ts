import { EntityNotFoundError } from "@/lib/exceptions/exceptions";
import { Data } from "./type";
export const getFreeKeyboard = async (id: number) => {
  const res = await fetch(`http://localhost:8000/free/keyboards/${id}`);
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
