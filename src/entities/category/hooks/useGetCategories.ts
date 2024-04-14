"use client";
import { category, key } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
import { useAppQuery } from "@/lib/hooks/useQuery";
export const useGetCategories = ({ enable = false }: { enable?: boolean }) => {
  return useAppQuery<category[]>({
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 5,
    enabled: enable,
    queryFn: () => beatFetcher.get("/categories"),
  });
};
