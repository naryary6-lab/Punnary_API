const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '8679348511:AAEMMhddjhxN6zuX2d2fMSvBxg0CcBGNBg0';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(express.json());

// ១. អនុវត្ត Logic គណនាប្រូម៉ូសិន និងថ្លៃដឹក
function calculatePromotion(cartItems) {
  let subtotal = 0;
  let bigPackCount = 0;
  let smallPackCount = 0;

  cartItems.forEach(item => {
    subtotal += item.price;
    // ឆែកមើលទំហំកញ្ចប់តាមឈ្មោះទំនិញ
    if (item.name.includes('100g')) {
      smallPackCount += 1;
    } else {
      bigPackCount += 1; // 200g, 300g, 500g ចាត់ទុកជាកញ្ចប់ធំ
    }
  });

  let shippingFee = 8000;
  let hasFreeGift = false;
  let promoMessage = "";

  // លក្ខខណ្ឌ ១: ទិញកញ្ចប់ធំ ១០ កញ្ចប់ => Free ដឹក + ថែម ១ កញ្ចប់ធំ
  if (bigPackCount >= 10) {
    shippingFee = 0;
    hasFreeGift = true;
    promoMessage = "🎁 PROMO: ទទួលបានសេវាដឹក FREE + ថែមជូនកញ្ចប់ធំ ១ (ជ្រើសរើសរសជាតិ)!";
  } 
  // លក្ខខណ្ឌ ២: ទិញកញ្ចប់តូច ២០ កញ្ចប់ => Free ដឹក + ថែម ១ កញ្ចប់ធំ
  else if (smallPackCount >= 20) {
    shippingFee = 0;
    hasFreeGift = true;
    promoMessage = "🎁 PROMO: ទទួលបានសេវាដឹក FREE + ថែមជូនកញ្ចប់ធំ ១ (ជ្រើសរើសរសជាតិ)!";
  } 
  // លក្ខខណ្ឌ ៣: ទិញកញ្ចប់តូច ១០ កញ្ចប់ => Free ដឹក
  else if (smallPackCount >= 10) {
    shippingFee = 0;
    promoMessage = "🚀 PROMO: ទទួលបានសេវាដឹក FREE!";
  }

  const grandTotal = subtotal + shippingFee;

  return {
    subtotal,
    shippingFee,
    grandTotal,
    hasFreeGift,
    promoMessage
  };
}

// ២. ទំព័រមុខហាង Mini App
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
        
        header { text-align: center; padding: 20px 10px; background: linear-gradient(135deg, #1f1c2c, #928dab); border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.5); margin-bottom: 15px; border: 1px solid rgba(255, 255, 255, 0.1); }
        header h1 { font-family: 'Koulen', cursive; color: #FFD700; font-size: 2.2rem; letter-spacing: 1.5px; text-shadow: 0 2px 10px rgba(255,215,0,0.4); }
        header p { color: #e0e0e0; font-size: 0.85rem; font-weight: 600; letter-spacing: 2px; }
        
        .promo-banner { background: linear-gradient(90deg, #FF416C, #FF4B2B); color: #fff; padding: 12px; border-radius: 12px; margin-bottom: 20px; text-align: center; font-weight: 700; font-size: 0.8rem; line-height: 1.5; box-shadow: 0 4px 15px rgba(255,65,108,0.3); }
        
        .section-title { color: #FFD700; font-size: 1.1rem; margin: 25px 0 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .section-title::before { content: ''; width: 4px; height: 18px; background: #FFD700; border-radius: 2px; }
        
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
        .product-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 12px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; }
        .product-title { font-size: 0.82rem; font-weight: 600; margin-bottom: 6px; color: #f0f0f0; line-height: 1.3; }
        .product-price { color: #FFD700; font-size: 1rem; font-weight: 700; margin: 6px 0; }
        
        .add-btn { background: linear-gradient(135deg, #FF416C, #FF4B2B); color: white; border: none; padding: 8px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; width: 100%; box-shadow: 0 3px 10px rgba(255,65,108,0.2); }
        .footer-cart { position: fixed; bottom: 15px; left: 15px; right: 15px; background: rgba(20, 20, 28, 0.95); backdrop-filter: blur(15px); border: 1px solid rgba(255, 215, 0, 0.3); padding: 12px 20px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 999; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
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
        <div class="product-card"><div><div class="product-title">Original (500g)</div><div class="product-price">15,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង Original 500g', 15000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">Milk Chocolate (200g)</div><div class="product-price">14,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង Chocolate 200g', 14000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">Milk Chocolate (100g)</div><div class="product-price">7,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង Chocolate 100g', 7000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">Milk Cheese (200g)</div><div class="product-price">14,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង Cheese 200g', 14000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">Milk Cheese (100g)</div><div class="product-price">7,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង Cheese 100g', 7000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">Spicy Garlic 🧄 (200g)</div><div class="product-price">14,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង Spicy Garlic 200g', 14000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">Spicy Garlic 🧄 (100g)</div><div class="product-price">7,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង Spicy Garlic 100g', 7000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">BBQ 🍖 (200g)</div><div class="product-price">14,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង BBQ 200g', 14000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">BBQ 🍖 (100g)</div><div class="product-price">7,000 ៛</div></div><button class="add-btn" onclick="addToCart('ចេកបំពង BBQ 100g', 7000)">+ បន្ថែម</button></div>
    </div>

    <div class="section-title">🍌 ដំណាប់ចេក ណាំវ៉ាខ្មែរ (៩ មុខ)</div>
    <div class="product-grid">
        <div class="product-card"><div><div class="product-title">រសជាតិដើម (200g)</div><div class="product-price">10,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេក រសជាតិដើម 200g', 10000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">រោយល្ង ស/ខ្មៅ (200g)</div><div class="product-price">10,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេក រោយល្ង 200g', 10000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">រោយអាល់ម៉ុន (200g)</div><div class="product-price">12,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេក អាល់ម៉ុន 200g', 12000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">ធញ្ញជាតិគ្រប់មុខ (200g)</div><div class="product-price">12,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេក ធញ្ញជាតិ 200g', 12000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">រោយដូង (200g)</div><div class="product-price">12,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេក រោយដូង 200g', 12000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">ដំណាប់ចេកមូល (200g)</div><div class="product-price">10,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេកមូល 200g', 10000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">ស្នូលសូកូឡាដូង លាយល្ង (300g)</div><div class="product-price">20,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេក ស្នូលសូកូឡាដូងល្ង 300g', 20000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">ស្នូលសូកូឡាចន្ទី (300g)</div><div class="product-price">20,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេក ស្នូលសូកូឡាចន្ទី 300g', 20000)">+ បន្ថែម</button></div>
        <div class="product-card"><div><div class="product-title">ស្នូលសូកូឡាដូង (300g)</div><div class="product-price">20,000 ៛</div></div><button class="add-btn" onclick="addToCart('ដំណាប់ចេក ស្នូលសូកូឡាដូង 300g', 20000)">+ បន្ថែម</button></div>
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

// ៣. ប្រព័ន្ធទទួល Order និងចេញវិក្កយបត្រ Receipt
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.web_app_data) {
    try {
      const data = JSON.parse(msg.web_app_data.data);
      const promoResult = calculatePromotion(data.items);

      let orderList = data.items.map(i => `• ${i.name} - ${i.price.toLocaleString()} ៛`).join('\n');
      
      let receiptMessage = 
`==========================
🏷️ **ម៉ូម័រ MOMORE SNACK STORE**
==========================
🧾 **វិក្កយបត្របញ្ជាទិញ / RECEIPT**

📦 **មុខទំនិញដែលបានជ្រើសរើស៖**
${orderList}

--------------------------
💵 **តម្លៃទំនិញ (Subtotal):** ${promoResult.subtotal.toLocaleString()} ៛
🚚 **ថ្លៃដឹកជញ្ជូន (Shipping):** ${promoResult.shippingFee.toLocaleString()} ៛
${promoResult.promoMessage ? `\n${promoResult.promoMessage}\n` : ''}--------------------------
💰 **សរុបត្រូវទូទាត់ (Grand Total):** ${promoResult.grandTotal.toLocaleString()} ៛
==========================

📲 **សូមស្កែន QR Code ខាងក្រោមដើម្បីទូទាត់ប្រាក់ ៖**`;

      await bot.sendMessage(chatId, receiptMessage, { parse_mode: 'Markdown' });
      
      // បញ្ជូន ABA KHQR Code
      await bot.sendMessage(chatId, `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MoMore_ABA_Payment_${promoResult.grandTotal}`);

    } catch (e) {
      bot.sendMessage(chatId, "មានបញ្ហាក្នុងការរៀបចំវិក្កយបត្រ!");
    }
  } else if (msg.text === '/start') {
    const appUrl = process.env.RENDER_EXTERNAL_URL || 'https://momore-bot.onrender.com';
    
    bot.sendMessage(chatId, "ស្វាគមន៍មកកាន់ ម៉ូម័រ MoMore Snack Store! 🍌\nសូមចុចប៊ូតុងខាងក្រោមដើម្បីចូលមើលមុខហាង និងកុម្ម៉ង់ទំនិញ៖", {
      reply_markup: {
        keyboard: [
          [{ text: "🛍️ បើកហាង MoMore Mini App", web_app: { url: appUrl } }]
        ],
        resize_keyboard: true
      }
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
