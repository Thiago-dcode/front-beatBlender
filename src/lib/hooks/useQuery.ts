"use client";

import { beatFetcher } from "@/lib/core/httpClient";
import { SoundFolder, SoundFolderWithSounds } from "@/types";
import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";
import { HttpClientError } from "../exceptions/exceptions";
import { signOut, useSession } from "next-auth/react";

export function useAppQuery<TData>({
  queryKey,
  enabled,
  initialData = undefined,
  staleTime = 60 * 60 * 5,
  queryFn,
}: {
  initialData?: TData;
  queryKey: QueryKey;
  enabled: boolean;
  staleTime?: number;
  queryFn?: QueryFunction<TData, QueryKey, never>;
}) {
  const query = useQuery<TData>({
    queryKey,

    initialData,
    refetchOnWindowFocus: false,
    enabled,
    staleTime,
    queryFn,
  });

  if (query.error && query.error instanceof HttpClientError) {
    console.log("ERROR IN USEAPPQUERY");
    switch (query.error.statusCode) {
      case 401:
        signOut({
          redirect: true,
          callbackUrl: "/login",
        });
        break;
      case 403:
        signOut({
          redirect: true,
          callbackUrl: "/login",
        });
        break;

      default:
        break;
    }
  }
  return query;
}
