"use client";

import { useQuery } from "@tanstack/react-query";
import { getFreeKeyboard } from "../api";
import { Data } from "../type";
import { useAppQuery } from "@/lib/hooks/useQuery";
import { useState } from "react";
import { KeyboardWithKeysAndDesign } from "@/types";
import { beatFetcher } from "@/lib/core/httpClient";
export const useGetFreeKeyboard = (params: {
  name: string;
  initialData?: KeyboardWithKeysAndDesign;
  enable: boolean;
  stale: number;
}) => {


  return useAppQuery<KeyboardWithKeysAndDesign>({
    queryKey: ["free-keyboard", params.name],
    initialData: params?.initialData,
    enabled: params.enable,
    staleTime: params.stale,
    queryFn: () => beatFetcher.get(`/free/keyboards/${params.name}`),
  });
};
