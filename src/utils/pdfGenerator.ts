
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { type ToastProps } from "@/components/ui/toast";

export const generatePDF = async (
  element: HTMLElement,
  toastNotification: (props: ToastProps) => void
): Promise<void> => {
  try {
    toastNotification({
      title: "Создание PDF",
      description: "Пожалуйста, подождите...",
    });
    
    // Create a clone of the receipt container to ensure full content capture
    const receiptClone = element.cloneNode(true) as HTMLElement;
    receiptClone.style.position = 'absolute';
    receiptClone.style.left = '-9999px';
    receiptClone.style.top = '-9999px';
    receiptClone.style.width = `${element.offsetWidth}px`;
    receiptClone.style.backgroundColor = "#000000";
    document.body.appendChild(receiptClone);
    
    // Force all content to be visible and properly rendered
    Array.from(receiptClone.querySelectorAll('*')).forEach(el => {
      const element = el as HTMLElement;
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';
      
      // Ensure text colors are preserved
      if (element.classList.contains('text-white')) {
        element.style.color = '#FFFFFF';
      }
      if (element.classList.contains('text-gray-400')) {
        element.style.color = '#9CA3AF';
      }
    });

    const canvas = await html2canvas(receiptClone, { 
      scale: 3,
      backgroundColor: "#000000",
      useCORS: true,
      logging: false,
      windowWidth: receiptClone.offsetWidth,
      height: receiptClone.scrollHeight,
      onclone: (_, clonedElement) => {
        clonedElement.style.height = 'auto';
        clonedElement.style.overflow = 'visible';
        clonedElement.style.position = 'static';
        clonedElement.style.backgroundColor = '#000000';
      }
    });
    
    // Remove the clone after capturing
    document.body.removeChild(receiptClone);
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    
    // Calculate appropriate size for the image in the PDF
    const imgWidth = pdfWidth - 20; // 10mm margins on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Position the image
    const x = 10; // 10mm from left edge
    const y = 10; // 10mm from top

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("Элкарт_чек.pdf");

    toastNotification({
      title: "Успешно",
      description: "Чек успешно сохранен в формате PDF",
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    toastNotification({
      title: "Ошибка",
      description: "Не удалось создать PDF",
      variant: "destructive",
    });
  }
};
