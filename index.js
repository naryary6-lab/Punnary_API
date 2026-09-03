const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const token = '8679348511:AAEMMhddjhxN6zuX2d2fMSvBxg0CcBGNBg0';
const bot = new TelegramBot(token, { polling: true });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(express.json());

async function askGeminiAI(userMessage) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `អ្នកគឺជា AI ជំនួយការលក់ប្រចាំ "ម៉ូម័រ MoMore Snack Store"។ ឆ្លើយតបជាភាសាខ្មែរ រួសរាយ និងច្បាស់លាស់។`
    });
    const result = await model.generateContent(userMessage);
    return result.response.text();
  } catch (error) {
    return "ចាសបង! តើបងចង់សួរអំពីដំណាប់ចេក ឬចេកបំពង ម៉ូម័រ ដែរឬទេចាស? 🍌";
  }
}

app.get('/', (req, res) => res.send("MoMore Server Active"));

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/start') {
    bot.sendMessage(chatId, "ស្វាគមន៍មកកាន់ ម៉ូម័រ MoMore Snack Store! 🍌");
  } else if (msg.text) {
    bot.sendChatAction(chatId, 'typing');
    const aiResponse = await askGeminiAI(msg.text);
    bot.sendMessage(chatId, aiResponse);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
