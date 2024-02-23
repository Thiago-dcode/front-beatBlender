import { useQuery } from "@tanstack/react-query";
import { getFreeKeyboard } from "../api";
import { Data } from "../type";
export const useGetFreeKeyboard = (params: {
  id: number| undefined;
  initialData?: Data;
}) => {
  return useQuery<Data>({
    queryKey: ["free-keyboard", params.id],
    initialData: params?.initialData,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    enabled: params.id !==undefined,
    queryFn: () => params.id? getFreeKeyboard(params.id):new Promise(()=>{})
   ,
  });
};
