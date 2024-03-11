import React from "react";
import { useSession as nextSession } from "next-auth/react";
import { useEffect } from "react";
import { beatFetcher } from "@/lib/core/httpClient";
export default function useSession() {
  const session = nextSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      beatFetcher.setHeaders({
        authorization: `Bearer ${session.data?.user?.jwt}`,
      });
    }
  }, [session]);
  return session;
}
