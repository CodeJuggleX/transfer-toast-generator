
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
      <Button 
        onClick={onDownloadPDF} 
        variant="default"
        className="w-full bg-elcart-blue hover:bg-elcart-blue/90"
      >
        Скачать PDF
      </Button>
      <Button 
        onClick={onNewReceipt} 
        variant="outline" 
        className="w-full text-white border-gray-700 hover:bg-gray-800"
      >
        Создать новый чек
      </Button>
    </div>
  );
};

export default ReceiptControls;
