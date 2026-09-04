import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ទាញយកទិន្នន័យទំនិញពី products.json ដើម្បីកុំឱ្យប៉ះពាល់កូដ Server
const productsData = JSON.parse(fs.readFileSync('./products.json', 'utf8'));

// ១. Telegram Bot Config
const token = process.env.BOT_TOKEN || '8679348511:AAEWMhddjhxN6zuX2d2FW5vBxg0CcBGNBg0';
const bot = new TelegramBot(token, { polling: true });

// ២. Gemini AI Config
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ៣. System Instruction សម្រាប់ Gemini AI
const SYSTEM_INSTRUCTION = `
អ្នកគឺជា AI ជំនួយការផ្នែកលក់ស្វ័យប្រវត្តិរបស់ "ម៉ូម័រ MoMore Snack Store" (ដំណាប់ចេកទន់ៗ និងចេកបំពងស្រួយ)។

[បញ្ជីទំនិញបច្ចុប្បន្ន]:
${JSON.stringify(productsData, null, 2)}

[ច្បាប់កំណត់ថ្លៃដឹក និង ប្រូម៉ូសិន]:
- ទីតាំង "ភ្នំពេញ"៖ ថ្លៃដឹកស្ដង់ដារ 8,000៛
  * ទិញចេកបំពងកញ្ចប់ធំ ១០ កញ្ចប់ => FREE ដឹកភ្នំពេញ + ថែម ១ កញ្ចប់ធំ
  * ទិញចេកបំពងកញ្ចប់តូច ២០ កញ្ចប់ => FREE ដឹកភ្នំពេញ + ថែម ១ កញ្ចប់ធំ
  * ទិញចេកបំពងកញ្ចប់តូច ១០ កញ្ចប់ => FREE ដឹកភ្នំពេញ

- ទីតាំង "តាមខេត្ត"៖ ថ្លៃដឹកស្ដង់ដារ 12,000៛ (ឬផ្ញើតាមបេនឡាន/ក្រុមហ៊ុនដឹកជញ្ជូន)
  * ប្រូម៉ូសិនទិញគ្រប់ចំនួន (១០ ឬ ២០ កញ្ចប់) គឺ FREE ត្រឹមថ្លៃផ្ញើទៅបេនឡានក្នុងភ្នំពេញ ប៉ុណ្ណោះ។

ភារកិច្ចរបស់អ្នក៖ សួរបញ្ជាក់ទីតាំងអតិថិជន (ភ្នំពេញ ឬ តាមខេត្ត) មុននឹងគណនាថ្លៃដឹក!
`;

// ៤. API Endpoint សម្រាប់ AI Chat
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

// ៥. API Endpoint ទាញយកបញ្ជីទំនិញ
app.get('/api/products', (req, res) => {
  res.json(productsData);
});

// ៦. Function គណនាប្រម៉ូសិន & ថ្លៃដឹក
function calculatePromotion(cartItems, isProvince = false) {
  let subtotal = 0;
  let bigPackCount = 0;
  let smallPackCount = 0;

  cartItems.forEach(item => {
    subtotal += item.price * item.quantity;
    if (item.id && item.id.startsWith('C-')) {
      if (item.is_big_pack) {
        bigPackCount += item.quantity;
      } else {
        smallPackCount += item.quantity;
      }
    }
  });

  let shippingFee = isProvince ? 12000 : 8000;
  let hasFreeGift = false;
  let promoMessage = "";

  if (bigPackCount >= 10 || smallPackCount >= 20) {
    hasFreeGift = true;
    if (!isProvince) {
      shippingFee = 0;
      promoMessage = "PROMO (ភ្នំពេញ): FREE ដឹកដល់ផ្ទះ + ថែមជូនកញ្ចប់ធំ ១!";
    } else {
      shippingFee = 5000;
      promoMessage = "PROMO (ខេត្ត): ទទួលបានការចុះថ្លៃដឹក + ថែមជូនកញ្ចប់ធំ ១!";
    }
  } else if (smallPackCount >= 10) {
    if (!isProvince) {
      shippingFee = 0;
      promoMessage = "PROMO (ភ្នំពេញ): FREE ដឹកដល់ផ្ទះ!";
    } else {
      shippingFee = 8000;
      promoMessage = "PROMO (ខេត្ត): បញ្ចុះតម្លៃសេវាដឹកជូន!";
    }
  }

  const grandTotal = subtotal + shippingFee;
  return { subtotal, shippingFee, grandTotal, hasFreeGift, promoMessage, isProvince };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
