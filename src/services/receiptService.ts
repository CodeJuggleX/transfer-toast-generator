
import { ReceiptFormData, Receipt } from "../types/receipt";

const formatSender = (fullName: string): string => {
  const nameParts = fullName.split(" ");
  const [lastName, firstName, middleName] = nameParts;

  const maskPart = (part: string | undefined, visible = 2) =>
    part ? part.slice(0, visible) + "*".repeat(part.length - visible) : "";

  const maskedLastName = maskPart(lastName); // AB********
  const maskedFirstName = maskPart(firstName); // ES******
  const maskedMiddleName = middleName ? maskPart(middleName) : ""; // UU**

  const formattedFIO = `(${maskedLastName} ${maskedFirstName} ${maskedMiddleName})`.trim();
  
  return `9417 *** *** 0009 ${formattedFIO}`;
};

export const generateReceipt = (formData: ReceiptFormData): Promise<Receipt> => {
  return new Promise((resolve) => {
    // Generate a 10-digit receipt number starting with "94"
    const id = "94" + Math.floor(Math.random() * 10000000000).toString().padStart(8, '0');
    
    const now = new Date();
    const formattedDate = now.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    setTimeout(() => {
      resolve({
        id,
        operationType: formData.operationType,
        serviceName: "ELQR",
        sender: formatSender(formData.sender),
        recipient: formData.recipient,
        amount: parseFloat(formData.amount.replace(",", ".")),
        commission: 0.00,
        currency: "сом",
        paymentDate: formattedDate,
        status: "success"
      });
    }, 500);
  });
};

export const fetchReceipt = (id: string): Promise<Receipt> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        operationType: "QR",
        serviceName: "ELQR",
        sender: "9417 *** *** 0009 (AB******** ES****** UU**)",
        recipient: "996704471396",
        amount: 28.00,
        commission: 0.00,
        currency: "сом",
        paymentDate: "30.03.2023 22:20:05",
        status: "success"
      });
    }, 300);
  });
};
