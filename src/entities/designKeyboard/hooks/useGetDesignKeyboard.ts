"use client";

import { useQuery } from "@tanstack/react-query";
import { DesignKeyboard } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
export const useGetDesignKeyboard = ({
  enable = false,
}: {
  enable?: boolean;
}) => {
  return useQuery<DesignKeyboard[]>({
    queryKey: ["design-keyboards"],
    refetchOnWindowFocus: false,
    enabled: enable,
    queryFn: () => beatFetcher.get("/design-keyboard"),
  });
};
