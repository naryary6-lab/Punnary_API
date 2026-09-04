const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const token = '8679348511:AAEMMhddjhxN6zuX2d2fMSvBxg0CcBGNBg0';
const bot = new TelegramBot(token, { polling: true });

// ដាក់ Link រូបភាព ABA KHQR របស់បងត្រង់នេះ
const ABA_QR_IMAGE_URL = 'https://i.ibb.co/sample-aba-qr.jpg';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("MoMore Server Active & Running!");
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/start') {
    bot.sendMessage(chatId, "ស្វាគមន៍មកកាន់ ម៉ូម័រ MoMore Snack Store! 🍌");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
