"use client";

import { useQuery } from "@tanstack/react-query";
import { DesignKeyboard } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
import { useAppQuery } from "@/lib/hooks/useQuery";

export const useGetDesignKeyboard = ({
  enable = false,
}: {
  enable?: boolean;
}) => {
  return useAppQuery<DesignKeyboard[]>({
    queryKey: ["design-keyboards"],
    enabled: enable,
    queryFn: () => beatFetcher.get("/design-keyboard"),
  });
};
