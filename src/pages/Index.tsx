
import React, { useState, useRef } from "react";
import { useGenerateReceipt } from "../hooks/useGenerateReceipt";
import PrintButton from "../components/PrintButton";
import ReceiptForm from "../components/ReceiptForm";
import ReceiptDisplay, { formatRecipient } from "../components/ReceiptDisplay";
import ReceiptControls from "../components/ReceiptControls";
import Loading from "../components/Loading";
import ElcartLogo from "../components/ElcartLogo";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdfGenerator";
import { Receipt, ReceiptFormData } from "@/types/receipt";

const Index = () => {
  const receiptContainerRef = useRef<HTMLDivElement>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [showForm, setShowForm] = useState(true);
  const { toast } = useToast();
  const { mutate: generateReceipt, isPending } = useGenerateReceipt();

  const handleFormSubmit = (formData: ReceiptFormData) => {
    generateReceipt(formData, {
      onSuccess: (data) => {
        setReceipt(data);
        setShowForm(false);
      },
      onError: (error) => {
        toast({
          title: "Ошибка",
          description: "Не удалось создать чек: " + error.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleNewReceipt = () => {
    setShowForm(true);
    setReceipt(null);
  };

  const handleDownloadPDF = () => {
    const element = receiptContainerRef.current;
    if (!element) return;
    
    generatePDF(element, toast);
  };

  if (isPending) {
    return <Loading />;
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          <ElcartLogo />
          <h1 className="text-white text-3xl font-medium mb-6 text-center">Создание перевода</h1>
          <ReceiptForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center p-4">
        <div className="text-white text-xl">Чек не найден</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4">
      <PrintButton />
      <ReceiptDisplay 
        ref={receiptContainerRef} 
        receipt={receipt}
        formatRecipient={formatRecipient}
      />
      <ReceiptControls 
        onDownloadPDF={handleDownloadPDF}
        onNewReceipt={handleNewReceipt}
      />
    </div>
  );
};

export default Index;
