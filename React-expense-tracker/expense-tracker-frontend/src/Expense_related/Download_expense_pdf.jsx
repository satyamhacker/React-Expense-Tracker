import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function DownloadPDF([expenses]) {
  console.log("expenses", expenses);

  const pdfRef = useRef();

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfElement = pdfRef.current;

    if (pdfElement) {
      const canvas = await html2canvas(pdfElement);
      const imgData = canvas.toDataURL("image/png");
      // Add image to PDF
      pdf.addImage(imgData, "PNG", 10, 10, 190, 250);
      pdf.save("expenses.pdf");
    }
  };
  generatePDF();
}

export default DownloadPDF;
