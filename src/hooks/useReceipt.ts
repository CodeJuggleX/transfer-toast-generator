
import { useQuery } from "@tanstack/react-query";
import { fetchReceipt } from "../services/receiptService";
import { Receipt } from "../types/receipt";

export const useReceipt = (id: string) => {
  return useQuery({
    queryKey: ['receipt', id],
    queryFn: () => fetchReceipt(id),
  });
};
