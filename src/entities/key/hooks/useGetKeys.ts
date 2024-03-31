"use client";
import { key } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
import { useAppQuery } from "@/lib/hooks/useQuery";
export const useGetKeys = ({ enable = false }: { enable?: boolean }) => {
  return useAppQuery<key[]>({
    queryKey: ["keys"],
    staleTime: 60 * 60 * 24,
    enabled: enable,
    queryFn: () => beatFetcher.get("/keys"),
  });
};
