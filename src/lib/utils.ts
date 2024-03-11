import { type ClassValue, clsx } from "clsx";
import { cookies } from "next/headers";
import { Jwt, verify } from "jsonwebtoken";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function verifyJwt(token: string, secretKey: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    verify(token, secretKey, (err: any, decoded) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
