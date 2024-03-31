"use client";

import { beatFetcher } from "@/lib/core/httpClient";
import { SoundFolder, SoundFolderWithSounds } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAppQuery } from "@/lib/hooks/useQuery";

export const useGetSoundFolder = (params: {
  id: number | undefined;
  enable: boolean;
  stale: number;
}) => {
  return useAppQuery<SoundFolderWithSounds>({
    queryKey: ["sounds-folder", params.id],
   enabled: params.enable,
    staleTime: params.stale,
    queryFn: () => beatFetcher.get(`/sounds-folder/${params.id}`),
  });
};
