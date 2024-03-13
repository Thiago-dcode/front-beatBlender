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
    const secret = new TextEncoder().encode(secretKey)
    const decoded = await jose.jwtVerify(
      token,
      secret
    );
    if (decoded) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
