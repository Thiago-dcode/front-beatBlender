"use client";

import { useQuery } from "@tanstack/react-query";
import { getFreeKeyboard } from "../api";
import { Data } from "../type";
import { useAppQuery } from "@/lib/hooks/useQuery";
export const useGetFreeKeyboard = (params: {
  name: string | undefined;
  initialData?: Data;
  enable: boolean;
  stale: number;
}) => {
  return useAppQuery<Data>({
    queryKey: ["free-keyboard", params.name],
    initialData: params?.initialData,
    enabled: params.enable,
    queryFn: () =>
      params.name ? getFreeKeyboard(params.name) : new Promise(() => {}),
  });
};
