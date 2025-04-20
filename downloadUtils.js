import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";

// 🔧 Helper for Word: Creates a heading and a content paragraph
const createWordSection = (title, content) => [
  new Paragraph({
    children: [
      new TextRun({
        text: `${title}`,
        bold: true,
        size: 26, // ~13pt
      }),
    ],
    spacing: { after: 100 },
    alignment: AlignmentType.LEFT,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: content || "-",
        size: 24, // ~12pt
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.LEFT,
  }),
];

export const downloadDocx = async (data) => {
  const { answer, label, query, reason, url, validation } = data;

  const doc = new Document({
    sections: [
      {
        children: [
          ...createWordSection("Query", query),
          ...createWordSection("Label", label),
          ...createWordSection("Answer", answer),
          ...createWordSection("Reason", reason),
          ...createWordSection("Validation", validation),
          ...createWordSection("URL", url),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "response.docx");
};

// 📕 PDF Download
export const downloadPdf = (data) => {
  const { answer, label, query, reason, url, validation } = data;
  const doc = new jsPDF();

  let y = 10;
  const lineHeight = 8;
  const maxWidth = 180;

  const addSection = (title, content) => {
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(title, 10, y);
    y += lineHeight;

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    const lines = doc.splitTextToSize(content, maxWidth);
    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += lineHeight;
    });

    y += 4;
  };

  addSection("Query", query);
  addSection("Label", label);
  addSection("Answer", answer);
  addSection("Reason", reason);
  addSection("Validation", validation);
  addSection("URL", url);

  doc.save("data.pdf");
};

// 📜 TXT Download
export const downloadTxt = (data) => {
  const { answer, label, query, reason, url, validation } = data;

  const formattedText = `
=== Query ===
${query}

=== Label ===
${label}

=== Answer ===
${answer}

=== Reason ===
${reason}

=== Validation ===
${validation}

=== URL ===
${url}
  `.trim();

  const blob = new Blob([formattedText], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "data.txt");
};
