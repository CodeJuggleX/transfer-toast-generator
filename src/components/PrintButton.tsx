
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const PrintButton: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 print:hidden"
    >
      <Printer className="mr-2 h-4 w-4" />
      Печать
    </Button>
  );
};

export default PrintButton;
