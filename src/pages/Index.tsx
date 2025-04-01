
import React, { useState } from "react";
import { useGenerateReceipt } from "../hooks/useGenerateReceipt";
import ElcartLogo from "../components/ElcartLogo";
import StatusBadge from "../components/StatusBadge";
import PrintButton from "../components/PrintButton";
import ReceiptForm from "../components/ReceiptForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Receipt, ReceiptFormData } from "@/types/receipt";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const formatRecipient = (recipient: string) => {
  const phonePattern = /^[+]?[0-9]{10,15}$/;

  if (phonePattern.test(recipient)) {
    return recipient;
  }

  const nameParts = recipient.trim().split(/\s+/);
  if (nameParts.length < 2) return recipient; // Если одно слово — возвращаем как есть

  const [firstName, lastName, middleName = ""] = nameParts; // Если нет отчества, ставим пустую строку

  const maskedFirstName = `${firstName.slice(0, 2)}*******`;
  const maskedLastName = `${lastName.slice(0, 2)}*******`;
  const maskedMiddleName = middleName ? `${middleName.slice(0, 2)}**` : ""; // Если нет отчества, ничего не добавляем

  return middleName
    ? `9417 *** *** 0009 (${maskedFirstName} ${maskedLastName} ${maskedMiddleName})`
    : `9417 *** *** 0009 (${maskedFirstName} ${maskedLastName})`;
};

const Index = () => {
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
    const element = document.getElementById("receipt-container");
    const companyInfo = document.getElementById("company-info");
    
    if (!element || !companyInfo) return;

    // First, ensure the company info is visible during capture
    const originalDisplay = companyInfo.style.display;
    companyInfo.style.display = "block";

    html2canvas(element, { 
      scale: 3,
      backgroundColor: "#000000",
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth - 20; // 10mm margins on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Center the receipt on the page
      const x = 10; // 10mm from left edge
      const y = (pdfHeight - imgHeight) / 2 > 10 ? (pdfHeight - imgHeight) / 2 : 10;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save("Элкарт_чек.pdf");

      // Restore original display setting
      companyInfo.style.display = originalDisplay;

      toast({
        title: "Успешно",
        description: "Чек успешно сохранен в формате PDF",
      });
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center p-4">
        <div className="text-white text-xl">Создание чека...</div>
      </div>
    );
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
      <div id="receipt-container" className="max-w-md w-full flex flex-col bg-black p-4 rounded-lg">
        <ElcartLogo />
        <div className="text-white text-center text-xl font-medium mb-6">
          Чек №{receipt.id}
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Тип операции:</div>
          <div className="text-white text-xl">{receipt.operationType}</div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Наименование услуги:</div>
          <div className="text-white text-xl">{receipt.serviceName}</div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Отправитель:</div>
          <div className="text-white text-xl whitespace-nowrap">{receipt.sender}</div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Получатель:</div>
          <div className="text-white text-xl whitespace-nowrap">{formatRecipient(receipt.recipient)}</div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Сумма перевода:</div>
          <div className="text-white text-xl">{receipt.amount.toFixed(2)} {receipt.currency}</div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Комиссия:</div>
          <div className="text-white text-xl">{receipt.commission.toFixed(2)} {receipt.currency}</div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Итого:</div>
          <div className="text-white text-[2.5rem] font-medium">
            {receipt.amount.toFixed(2).replace(".", ",")} <span className="text-xl">{receipt.currency}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Дата оплаты:</div>
          <div className="text-white text-xl">{receipt.paymentDate}</div>
        </div>

        <div className="mb-4">
          <div className="text-gray-400 text-sm">Статус:</div>
          <StatusBadge status={receipt.status} />
        </div>

        {/* Информация о компании - переделан в видимый блок для PDF */}
        <div id="company-info" className="text-gray-400 text-sm mt-6">
          <div>ЗАО Межбанковский процессинговый центр</div>
          <div>720083, Кыргызская Республика</div>
          <div>г. Бишкек, Ауэзова 1/2</div>
          
          {/* Контактная информация */}
          <div className="mt-2">
            <div>
              Тел.: <a className="text-elcart-blue" href="tel:+996312637696">+996 (312) 63 76 96</a>
            </div>
            <div>
              <a className="text-elcart-blue" href="tel:+996312637697">+996 (312) 63 76 97</a>
            </div>
            <div className="flex gap-1">
              <span>E-mail:</span>
              <a className="text-elcart-blue" href="mailto:mobile@ipc.kg">mobile@ipc.kg</a>
            </div>
            <div className="flex gap-1">
              <span>Web:</span>
              <a className="text-elcart-blue" href="https://www.ipc.kg" target="_blank" rel="noopener noreferrer">www.ipc.kg</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-4 w-full max-w-md flex flex-col gap-2">
        <Button onClick={handleDownloadPDF} className="w-full">
          Скачать PDF
        </Button>
        <Button onClick={handleNewReceipt} className="w-full">
          Создать новый чек
        </Button>
      </div>
    </div>
  );
};

export default Index;
