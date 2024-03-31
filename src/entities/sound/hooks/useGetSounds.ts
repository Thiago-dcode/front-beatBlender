"use client";

import { useQuery } from "@tanstack/react-query";
import {SoundFolder } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
export const useGetSounds = ({ enable = false }: { enable?: boolean }) => {
  return useQuery<SoundFolder[]>({
    queryKey: ["sounds-folder"],
    refetchOnWindowFocus: false,
    staleTime: 60 *60 *24,
    enabled: enable,
    queryFn: () => beatFetcher.get("/sounds-folder"),
  });
};
