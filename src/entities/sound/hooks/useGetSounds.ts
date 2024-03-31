"use client";

import { useQuery } from "@tanstack/react-query";
import { SoundFolder } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
import { useAppQuery } from "@/lib/hooks/useQuery";
export const useGetSounds = ({ enable = false }: { enable?: boolean }) => {
  return useAppQuery<SoundFolder[]>({
    queryKey: ["sounds-folder"],
    staleTime: 60 * 60 * 24,
    enabled: enable,
    queryFn: () => beatFetcher.get("/sounds-folder"),
  });
};
