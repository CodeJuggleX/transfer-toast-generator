
import { useMutation } from "@tanstack/react-query";
import { generateReceipt } from "../services/receiptService";
import { Receipt, ReceiptFormData } from "../types/receipt";

export const useGenerateReceipt = () => {
  return useMutation<Receipt, Error, ReceiptFormData>({
    mutationFn: (formData) => generateReceipt(formData),
  });
};
