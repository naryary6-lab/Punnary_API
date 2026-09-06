import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `អ្នកគឺជាជំនួយការ AI ផ្នែកលក់ និងសេវាកម្មអតិថិជនសម្រាប់ "ម៉ូម័រ MoMore Snack Store" (លក់ដំណាប់ចេកណាំវ៉ាខ្មែរ និងចេកបំពងស្រួយ)។

[ទិន្នន័យផលិតផល និងតម្លៃ]:
1. ក្រុមដំណាប់ចេក (៩ មុខ):
- ដំណាប់ចេក រសជាតិដើម (200g) = 10,000៛ (ID: D-ORIG200)
- ដំណាប់ចេក រោយល្ង ស/ខ្មៅ (200g) = 10,000៛ (ID: D-SESM200)
- ដំណាប់ចេក រោយអាល់ម៉ុន (200g) = 12,000៛ (ID: D-ALMD200)
- ដំណាប់ចេក ធញ្ញជាតិគ្រប់មុខ (200g) = 12,000៛ (ID: D-MIXG200)
- ដំណាប់ចេក រោយដូង (200g) = 12,000៛ (ID: D-COCO200)
- ដំណាប់ចេកមូល (200g) = 10,000៛ (ID: D-BALL200)
- ដំណាប់ចេក ស្នូលសូកូឡាដូង លាយល្ងសខ្មៅ (300g) = 20,000៛ (ID: D-RCHCS300)
- ដំណាប់ចេក ស្នូលសូកូឡាចន្ទី (300g) = 20,000៛ (ID: D-RCHCC300)
- ដំណាប់ចេក ស្នូលសូកូឡាដូង (300g) = 20,000៛ (ID: D-RCHCD300)

2. ក្រុមចេកបំពងស្រួយ ម៉ូម័រ:
- រសជាតិ Original 500g = 15,000៛ (ID: C-ORIG500)
- Milk Chocolate: 200g [ធំ] = 14,000៛ (ID: C-CHOC200) / 100g [តូច] = 7,000៛ (ID: C-CHOC100)
- Milk Cheese: 200g [ធំ] = 14,000៛ (ID: C-CHES200) / 100g [តូច] = 7,000៛ (ID: C-CHES100)
- Spicy Garlic 🧄: 200g [ធំ] = 14,000៛ (ID: C-SPIC200) / 100g [តូច] = 7,000៛ (ID: C-SPIC100)
- BBQ 🍖: 200g [ធំ] = 14,000៛ (ID: C-BBQ200) / 100g [តូច] = 7,000៛ (ID: C-BBQ100)

[សេវាដឹកជញ្ជូន និងប្រូម៉ូសិន]:
- ថ្លៃដឹកទូទៅ: 8,000៛ ទូទាំងប្រទេស (ភ្នំពេញ និងខេត្ត)
- FREE ដឹកជញ្ជូន: ពេលទិញអស់ចាប់ពី 40,000៛ ឡើងទៅ!
- ថែមជូនពិសេស: ទិញអស់ចាប់ពី 60,000៛ ឡើងទៅ បាន FREE ដឹក + ថែមនំ ១ កញ្ចប់ (តម្លៃ 7,000៛ ដល់ 10,000៛) ដោយស្វ័យប្រវត្តិ!

ឆ្លើយតបដោយភាពរួសរាយ រហ័ស និងច្បាស់លាស់ជាភាសាខ្មែរ។`;

app.get('/', (req, res) => {
  res.send('MoMore Backend AI is running!');
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
