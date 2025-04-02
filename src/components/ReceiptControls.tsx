
import React from "react";
import { Button } from "@/components/ui/button";

interface ReceiptControlsProps {
  onDownloadPDF: () => void;
  onNewReceipt: () => void;
}

const ReceiptControls: React.FC<ReceiptControlsProps> = ({ 
  onDownloadPDF, 
  onNewReceipt 
}) => {
  return (
    <div className="mt-8 mb-4 w-full max-w-md flex flex-col gap-2">
      <Button onClick={onDownloadPDF} className="w-full">
        Скачать PDF
      </Button>
      <Button onClick={onNewReceipt} className="w-full">
        Создать новый чек
      </Button>
    </div>
  );
};

export default ReceiptControls;
