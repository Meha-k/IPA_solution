import { createWorker } from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const file = req.files.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text from PDF
    const filePath = file.filepath;
    const fileBuffer = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pages = pdfDoc.getPages();
    let extractedText = '';

    for (const page of pages) {
      const image = await page.renderToImage();
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(image);
      extractedText += text + '\n';
      await worker.terminate();
    }

    // Use Gemini to process the extracted text
    const prompt = `Extract structured data from this document:\n\n${extractedText}`;
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const structuredData = (await result.response).text();

    res.status(200).json({ text: structuredData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process file' });
  }
}