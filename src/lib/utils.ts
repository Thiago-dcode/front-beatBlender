import { type ClassValue, clsx } from "clsx";
import { cookies } from "next/headers";
import * as jose from "jose";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function verifyJwt(
  token: string,
  secretKey: string
): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(secretKey);
    const decoded = await jose.jwtVerify(token, secret);
    if (decoded) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export function truncateString(str: string, length = 10) {
  let newStr = str.trim();
  if (str.length > length) newStr = str.slice(0, length);
  return newStr;
}

export function jsonToFormData(obj: { [key: string]: any }) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}
export function formDataToJson(formData: FormData) {
  let obj: { [key: string]: string | Blob } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
