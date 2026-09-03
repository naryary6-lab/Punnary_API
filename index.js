const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ១. Configuration
const token = '8679348511:AAEMMhddjhxN6zuX2d2fMSvBxg0CcBGNBg0';
const bot = new TelegramBot(token, { polling: true });

// ដាក់ Link រូបភាព ABA KHQR ពិតប្រាកដរបស់បងត្រង់នេះ (ជំនួស Link ខាងក្រោម)
សួស្តី! នេះជា KHQR របស់ខ្ញុំឈ្មោះ  "SORM SOURPUNARY" 
សូមចុចតំណភ្ជាប់នេះដើម្បីទូទាត់ៈ
https://acledabank.com.kh/acleda?payment_data=qWY5B2SAUfIhLblxzOtfu5ckLzMHjaSki6Ru0bsOyNK+ylPBgZ0sHH6BeGUscKoEGb6QgufwUu6yMqn6HT4Eeca24px5MrMJRdBkaYr1RiIKZ6atFD7qirkscOus5envQw5ClFg0yZX6gGE4qCBZfu42/X3B4VODrcoMRGLy6QoSYeB+OECqwnIVZ1T0FCQjYsC36qrYOeaYG9XByWRxYrLXvKOdUab8QkQw2KFRhyE=&key=khqr
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(express.json());

// ២. Gemini AI Auto-reply
async function askGeminiAI(userMessage) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `អ្នកគឺជា AI ជំនួយការលក់ស្វ័យប្រវត្តិប្រចាំ "ម៉ូម័រ MoMore Snack Store"។
តួនាទី៖ ឆ្លើយតបសំណួរអតិថិជនជាភាសាខ្មែរ ឱ្យមានភាពរួសរាយ រហ័ស ទាក់ទាញ និងច្បាស់លាស់។

ព័ត៌មានផលិតផល និងតម្លៃ៖
១. ដំណាប់ចេក ណាំវ៉ាខ្មែរ (បន្ទះសំប៉ែត ទន់ស្វិត)
២. ចេកបំពងស្រួយ ម៉ូម័រ
សូមណែនាំអតិថិជនឱ្យចុចប៊ូតុង "🛍️ បើកហាង MoMore Mini App" ដើម្បីជ្រើសរើសទំនិញ និងធ្វើការកុម្ម៉ង់។`
    });

    const result = await model.generateContent(userMessage);
    return result.response.text();
  } catch (error) {
    return "ចាសបង! តើបងចង់សួរព័ត៌មានបន្ថែមអំពីដំណាប់ចេក ឬចេកបំពង ម៉ូម័រ ដែរឬទេចាស? 🍌";
  }
}

// ៣. Logic គណនាប្រូម៉ូសិន
function calculatePromotion(cartItems) {
  let subtotal = 0;
  let bigPackCount = 0;
  let smallPackCount = 0;

  cartItems.forEach(item => {
    subtotal += item.price;
    if (item.name.includes('100g')) {
      smallPackCount += 1;
    } else {
      bigPackCount += 1;
    }
  });

  let shippingFee = 8000;
  let promoMessage = "";

  if (bigPackCount >= 10 || smallPackCount >= 20) {
    shippingFee = 0;
    promoMessage = "🎁 ថែមជូនពិសេស៖ FREE ថ្លៃដឹក + ថែម ១ កញ្ចប់ធំ!";
  } else if (smallPackCount >= 10) {
    shippingFee = 0;
    promoMessage = "🚀 ថែមជូនពិសេស៖ FREE ថ្លៃដឹក!";
  }

  const grandTotal = subtotal + shippingFee;
  return { subtotal, shippingFee, grandTotal, promoMessage };
}

// ៤. ទំព័រ Web App (HTML + CSS មានរូបភាពទំនិញ)
const htmlContent = `
<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ម៉ូម័រ MoMore Snack Store</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700&family=Koulen&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Kantumruy Pro', sans-serif; }
        body { background: #0d0d11; color: #FFFFFF; padding: 16px; padding-bottom: 110px; }
        header { text-align: center; padding: 20px 10px; background: linear-gradient(135deg, #1f1c2c, #928dab); border-radius: 16px; margin-bottom: 15px; }
        header h1 { font-family: 'Koulen', cursive; color: #FFD700; font-size: 2.2rem; }
        header p { color: #e0e0e0; font-size: 0.85rem; font-weight: 600; }
        .promo-banner { background: linear-gradient(90deg, #FF416C, #FF4B2B); color: #fff; padding: 12px; border-radius: 12px; margin-bottom: 20px; text-align: center; font-weight: 700; font-size: 0.8rem; line-height: 1.5; }
        .section-title { color: #FFD700; font-size: 1.1rem; margin: 25px 0 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .section-title::before { content: ''; width: 4px; height: 18px; background: #FFD700; border-radius: 2px; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
        .product-card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 10px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; }
        .product-img { width: 100%; height: 110px; object-fit: cover; border-radius: 10px; margin-bottom: 8px; background: #222; }
        .product-title { font-size: 0.82rem; font-weight: 600; margin-bottom: 4px; color: #f0f0f0; }
        .product-price { color: #FFD700; font-size: 0.95rem; font-weight: 700; margin: 4px 0; }
        .add-btn { background: linear-gradient(135deg, #FF416C, #FF4B2B); color: white; border: none; padding: 8px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; width: 100%; }
        .footer-cart { position: fixed; bottom: 15px; left: 15px; right: 15px; background: rgba(20, 20, 28, 0.95); border: 1px solid rgba(255, 215, 0, 0.3); padding: 12px 20px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 999; }
        .checkout-btn { background: linear-gradient(135deg, #FFD700, #FFA500); color: #000; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; }
    </style>
</head>
<body>
    <header>
        <h1>ម៉ូម័រ MOMORE</h1>
        <p>PREMIUM SNACK STORE</p>
    </header>
    
    <div class="promo-banner">
        🔥 ទិញកញ្ចប់ធំ ១០ = FREE ដឹក + ថែម ១ កញ្ចប់ធំ!<br>
        ✨ ទិញកញ្ចប់តូច ២០ = FREE ដឹក + ថែម ១ កញ្ចប់ធំ | ទិញ ១០ = FREE ដឹក!
    </div>

    <div class="section-title">🍌 ចេកបំពងស្រួយ ម៉ូម័រ</div>
    <div class="product-grid">
        <div class="product-card">
            <div>
                <img class="product-img" src="https://placehold.co/200x200/222/FFD700?text=Banana+Chips" alt="Original">
                <div class="product-title">Original (500g)</div>
                <div class="product-price">15,000 ៛</div>
            </div>
            <button class="add-btn" onclick="addToCart('ចេកបំពង Original 500g', 15000)">+ បន្ថែម</button>
        </div>
        <div class="product-card">
            <div>
                <img class="product-img" src="https://placehold.co/200x200/222/FFD700?text=Chocolate" alt="Chocolate">
                <div class="product-title">Milk Chocolate (200g)</div>
                <div class="product-price">14,000 ៛</div>
            </div>
            <button class="add-btn" onclick="addToCart('ចេកបំពង Chocolate 200g', 14000)">+ បន្ថែម</button>
        </div>
        <div class="product-card">
            <div>
                <img class="product-img" src="https://placehold.co/200x200/222/FFD700?text=Cheese" alt="Cheese">
                <div class="product-title">Milk Cheese (200g)</div>
                <div class="product-price">14,000 ៛</div>
            </div>
            <button class="add-btn" onclick="addToCart('ចេកបំពង Cheese 200g', 14000)">+ បន្ថែម</button>
        </div>
        <div class="product-card">
            <div>
                <img class="product-img" src="https://placehold.co/200x200/222/FFD700?text=Spicy+Garlic" alt="Garlic">
                <div class="product-title">Spicy Garlic 🧄 (200g)</div>
                <div class="product-price">14,000 ៛</div>
            </div>
            <button class="add-btn" onclick="addToCart('ចេកបំពង Spicy Garlic 200g', 14000)">+ បន្ថែម</button>
        </div>
    </div>

    <div class="section-title">🍌 ដំណាប់ចេក ណាំវ៉ាខ្មែរ</div>
    <div class="product-grid">
        <div class="product-card">
            <div>
                <img class="product-img" src="https://placehold.co/200x200/222/FFD700?text=Original+Jam" alt="ដំណាប់ចេក">
                <div class="product-title">រសជាតិដើម (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <button class="add-btn" onclick="addToCart('ដំណាប់ចេក រសជាតិដើម 200g', 10000)">+ បន្ថែម</button>
        </div>
        <div class="product-card">
            <div>
                <img class="product-img" src="https://placehold.co/200x200/222/FFD700?text=Sesame" alt="រោយល្ង">
                <div class="product-title">រោយល្ង ស/ខ្មៅ (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <button class="add-btn" onclick="addToCart('ដំណាប់ចេក រោយល្ង 200g', 10000)">+ បន្ថែម</button>
        </div>
        <div class="product-card">
            <div>
                <img class="product-img" src="https://placehold.co/200x200/222/FFD700?text=Almond" alt="អាល់ម៉ុន">
                <div class="product-title">រោយអាល់ម៉ុន (200g)</div>
                <div class="product-price">12,000 ៛</div>
            </div>
            <button class="add-btn" onclick="addToCart('ដំណាប់ចេក អាល់ម៉ុន 200g', 12000)">+ បន្ថែម</button>
        </div>
    </div>

    <div class="footer-cart">
        <div style="font-weight: 700; font-size: 0.9rem;">សរុប: <span id="total-price" style="color:#FFD700; font-size: 1.05rem;">0</span> ៛</div>
        <button class="checkout-btn" onclick="sendOrder()">កម៉្មង់ឥឡូវនេះ 🛒</button>
    </div>

    <script>
        let tg = window.Telegram.WebApp;
        tg.expand();
        let totalPrice = 0;
        let cart = [];

        function addToCart(name, price) {
            cart.push({ name, price });
            totalPrice += price;
            document.getElementById('total-price').innerText = totalPrice.toLocaleString();
        }

        function sendOrder() {
            if (cart.length === 0) return alert("សូមជ្រើសរើសទំនិញ!");
            tg.sendData(JSON.stringify({ items: cart }));
        }
    </script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(htmlContent);
});

// ៥. Telegram Bot Message Handler
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.web_app_data) {
    try {
      const data = JSON.parse(msg.web_app_data.data);
      const promoResult = calculatePromotion(data.items);
      
      let orderList = data.items.map((i, index) => `${index + 1}. ${i.name} - ${i.price.toLocaleString()} ៛`).join('\n');
      
      let receiptMessage = 
`🧾 **វិក្កយបត្របញ្ជាទិញ / ORDER RECEIPT**
----------------------------------------
🏷️ **ហាង ម៉ូម័រ MOMORE SNACK STORE**
----------------------------------------

📦 **មុខទំនិញដែលបានជ្រើសរើស ៖**
${orderList}

----------------------------------------
💵 **សរុបទំនិញ (Subtotal) ៖** ${promoResult.subtotal.toLocaleString()} ៛
🚚 **ថ្លៃដឹកជញ្ជូន (Shipping) ៖** ${promoResult.shippingFee.toLocaleString()} ៛
${promoResult.promoMessage ? `\n${promoResult.promoMessage}\n` : ''}----------------------------------------
💰 **ទឹកប្រាក់ត្រូវទូទាត់ (Total) ៖** **${promoResult.grandTotal.toLocaleString()} ៛**
========================================

📲 **សូមស្កែន QR Code ខាងក្រោម ដើម្បីទូទាត់ប្រាក់ ៖**
(បន្ទាប់ពីទូទាត់រួច សូមផ្ញើ **Slip ធនាគារ** និង **ទីតាំង/លេខទូរស័ព្ទ** មកកាន់ទីនេះ)`;

      // ផ្ញើវិក្កយបត្រ
      await bot.sendMessage(chatId, receiptMessage, { parse_mode: 'Markdown' });

      // ផ្ញើរូបភាព ABA KHQR Code ពិតប្រាកដ
      await bot.sendPhoto(chatId, ABA_QR_IMAGE_URL, {
        caption: `📌 ស្កែន ABA KHQR ដើម្បីទូទាត់ចំនួន ៖ ${promoResult.grandTotal.toLocaleString()} ៛`
      });

    } catch (e) {
      bot.sendMessage(chatId, "មានបញ្ហាក្នុងការរៀបចំវិក្កយបត្រ!");
    }
  } 
  else if (msg.text === '/start') {
    const appUrl = process.env.RENDER_EXTERNAL_URL || 'https://momore-bot.onrender.com';
    bot.sendMessage(chatId, "ស្វាគមន៍មកកាន់ ម៉ូម័រ MoMore Snack Store! 🍌\nសូមចុចប៊ូតុងខាងក្រោមដើម្បីចូលមើលមុខហាង ឬសួរនាំព័ត៌មានបន្ថែមបានចាស៖", {
      reply_markup: {
        keyboard: [
          [{ text: "🛍️ បើកហាង MoMore Mini App", web_app: { url: appUrl } }]
        ],
        resize_keyboard: true
      }
    });
  } 
  else if (msg.text) {
    bot.sendChatAction(chatId, 'typing');
    const aiResponse = await askGeminiAI(msg.text);
    bot.sendMessage(chatId, aiResponse);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
