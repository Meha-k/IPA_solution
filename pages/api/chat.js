import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Validate input
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Use the `gemini-1.5-flash` model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // Return the response as JSON
    res.status(200).json({ text });
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
}