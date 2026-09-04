
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ១. Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ២. System Instruction សម្រាប់ Gemini AI
const SYSTEM_INSTRUCTION = `
អ្នកគឺជា AI ជំនួយការផ្នែកលក់ស្វ័យប្រវត្តិរបស់ "ម៉ូម័រ MoMore Snack Store" (ដំណាប់ចេកទន់ៗ និងចេកបំពងស្រួយ)។

[មុខទំនិញ និង តម្លៃ]:
1. ដំណាប់ចេក (200g = 10,000៛ - 12,000៛ | 300g ស្នូលសូកូឡា = 20,000៛)
2. ចេកបំពង (Original 500g = 15,000៛ | រសជាតិផ្សេងៗ 200g = 14,000៛ / 100g = 7,000៛)

[ប្រូម៉ូសិន & ថ្លៃដឹក]:
- ថ្លៃដឹកជញ្ជូនស្ដង់ដារ៖ 8,000៛
- ចេកបំពងកញ្ចប់ធំ ១០ កញ្ចប់ => FREE ដឹក + ថែម ១ កញ្ចប់ធំ ឥតគិតថ្លៃ
- ចេកបំពងកញ្ចប់តូច ២០ កញ្ចប់ => FREE ដឹក + ថែម ១ កញ្ចប់ធំ ឥតគិតថ្លៃ
- ចេកបំពងកញ្ចប់តូច ១០ កញ្ចប់ => FREE ដឹក

ភារកិច្ចរបស់អ្នក៖ ឆ្លើយតបសំណួរអតិថិជនយ៉ាងរួសរាយ គណនាលុយ និងចេញវិក្កយបត្រជាភាសាខ្មែរជូនអតិថិជនដោយស្វ័យប្រវត្តិ។
`;

// ៣. API Endpoint សម្រាប់ AI Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: { systemInstruction: SYSTEM_INSTRUCTION }
    });
    res.json({ reply: response.text });
  } catch (error) {
    res.status(500).json({ error: 'ប្រព័ន្ធ AI រវល់ បន្តិច' });
  }
});

// ៤. Function គណនាប្រម៉ូសិន & ថ្លៃដឹក
function calculateOrderTotal(cartItems) {
  let subtotal = 0;
  let bigPackCount = 0;
  let smallPackCount = 0;

  cartItems.forEach(item => {
    subtotal += item.price * item.quantity;
    
    if (item.id.startsWith('C-')) {
      if (item.is_big_pack) {
        bigPackCount += item.quantity;
      } else {
        smallPackCount += item.quantity;
      }
    }
  });

  let shippingFee = 8000;
  let hasFreeGift = false;
  let promoMessage = "";

  if (bigPackCount >= 10) {
    shippingFee = 0;
    hasFreeGift = true;
    promoMessage = "PROMO: ទទួលបានសេវាដឹក FREE + ថែមជូនកញ្ចប់ធំ ១ (ជ្រើសរើសរសជាតិ)!";
  } else if (smallPackCount >= 20) {
    shippingFee = 0;
    hasFreeGift = true;
    promoMessage = "PROMO: ទទួលបានសេវាដឹក FREE + ថែមជូនកញ្ចប់ធំ ១ (ជ្រើសរើសរសជាតិ)!";
  } else if (smallPackCount >= 10) {
    shippingFee = 0;
    promoMessage = "PROMO: ទទួលបានសេវាដឹក FREE!";
  }

  const grandTotal = subtotal + shippingFee;

  return { subtotal, shippingFee, grandTotal, hasFreeGift, promoMessage };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
