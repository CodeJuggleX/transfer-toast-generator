
export interface ReceiptFormData {
  operationType: string;
  sender: string;
  recipient: string;
  amount: string;
}

export interface Receipt {
  id: string;
  operationType: string;
  serviceName: string;
  sender: string;
  recipient: string;
  amount: number;
  commission: number;
  currency: string;
  paymentDate: string;
  status: 'success' | 'pending' | 'failed';
}
