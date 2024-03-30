import {
  EntityNotFoundError,
  HttpClientError,
  InternalError,
} from "@/lib/exceptions/exceptions";
import { Data } from "./type";
import { Keyboard } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
export const getFreeKeyboard = async (name: string) => {
  try {
    const data: Data = await beatFetcher.get(`/free/keyboards/${name}`);

    return data;
  } catch (error) {
    if (error instanceof HttpClientError)
      throw new HttpClientError(error.message);
  }
  throw new InternalError("Unexpected error fetching free keyboard: "+ name);
};
export const getFreeKeyboards = async () => {
  try {
    const data: {
      keyboards: Keyboard[];
    } = await beatFetcher.get(`/free/keyboards`);

    return data.keyboards;
  } catch (error) {
    if (error instanceof HttpClientError)
      throw new HttpClientError(error.message);

    throw new InternalError("Unexpected error fetching free keyboards");
  }
};
