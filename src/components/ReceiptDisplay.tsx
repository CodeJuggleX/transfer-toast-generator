
import React, { forwardRef } from "react";
import ElcartLogo from "./ElcartLogo";
import StatusBadge from "./StatusBadge";
import { Receipt } from "@/types/receipt";

interface ReceiptDisplayProps {
  receipt: Receipt;
  formatRecipient: (recipient: string) => string;
}

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

const ReceiptDisplay = forwardRef<HTMLDivElement, ReceiptDisplayProps>(
  ({ receipt }, ref) => {
    return (
      <div 
        id="receipt-container" 
        ref={ref} 
        className="max-w-md w-full flex flex-col bg-black p-4 rounded-lg"
      >
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
          <div className="text-white text-xl whitespace-nowrap">
            {formatRecipient(receipt.recipient)}
          </div>
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

        <div className="text-gray-400 text-sm mt-6 border-t border-gray-800 pt-4">
          <div>ЗАО Межбанковский процессинговый центр</div>
          <div>720083, Кыргызская Республика</div>
          <div>г. Бишкек, Ауэзова 1/2</div>
          
          <div className="mt-2">
            <div>
              Тел.: <a className="text-sky-400" href="tel:+996312637696">+996 (312) 63 76 96</a>
            </div>
            <div>
              <a className="text-sky-400" href="tel:+996312637697">+996 (312) 63 76 97</a>
            </div>
            <div className="flex gap-1">
              <span>E-mail:</span>
              <a className="text-sky-400" href="mailto:mobile@ipc.kg">mobile@ipc.kg</a>
            </div>
            <div className="flex gap-1">
              <span>Web:</span>
              <a className="text-sky-400" href="https://www.ipc.kg" target="_blank" rel="noopener noreferrer">www.ipc.kg</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ReceiptDisplay.displayName = "ReceiptDisplay";

export { formatRecipient };
export default ReceiptDisplay;
