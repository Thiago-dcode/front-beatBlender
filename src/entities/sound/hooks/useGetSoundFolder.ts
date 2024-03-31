"use client";

import { beatFetcher } from "@/lib/core/httpClient";
import { SoundFolder, SoundFolderWithSounds } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetSoundFolder = (params: {
  id: number | undefined;
  enable: boolean;
  stale: number;
}) => {
  return useQuery<SoundFolderWithSounds>({
    queryKey: ["free-keyboard", params.id],
    refetchOnWindowFocus: false,
    enabled: params.enable,
    queryFn: () => beatFetcher.get(`/sounds-folder/${params.id}`),
  });
};
