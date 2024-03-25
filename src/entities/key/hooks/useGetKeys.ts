"use client";

import { useQuery } from "@tanstack/react-query";
import { key } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
export const useGetKeys = ({ enable = false }: { enable?: boolean }) => {
  return useQuery<key[]>({
    queryKey: ["keys"],
    refetchOnWindowFocus: false,
    staleTime: 60 *60 *24,
    enabled: enable,
    queryFn: () => beatFetcher.get("/keys"),
  });
};
