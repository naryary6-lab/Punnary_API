<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ម៉ូម័រ MOMORE - ហាងបោះដុំ</title>
  <link href="https://fonts.googleapis.com/css2?family=Koulen&family=Siemreap:wght@400;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-gradient: linear-gradient(180deg, #800000 0%, #4a0000 100%);
      --accent-yellow: #facc15;
      --card-bg: #ffffff;
      --text-dark: #222222;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Siemreap', sans-serif;
    }

    body {
      background: var(--bg-gradient);
      color: #ffffff;
      min-height: 100vh;
      padding-bottom: 120px;
    }

    header {
      text-align: center;
      padding: 30px 15px;
      background: radial-gradient(circle, #990000 0%, #4a0000 100%);
      border-bottom: 5px solid var(--accent-yellow);
      box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    }

    .brand-title {
      font-family: 'Koulen', cursive;
      font-size: 3.5rem;
      color: #ffffff;
      -webkit-text-stroke: 2px #4a0000;
      filter: drop-shadow(0px 5px 0px #facc15);
      line-height: 1.1;
    }

    .brand-subtitle {
      font-family: 'Koulen', cursive;
      font-size: 1.6rem;
      color: var(--accent-yellow);
      margin-top: 10px;
    }

    .promo-banner {
      background: linear-gradient(90deg, #facc15, #f59e0b);
      color: #800000;
      text-align: center;
      padding: 15px;
      font-weight: bold;
      font-size: 1.3rem;
      margin: 20px;
      border-radius: 20px;
      border: 3px solid #ffffff;
      box-shadow: 0 5px 12px rgba(0,0,0,0.4);
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 0 15px;
    }

    .product-card {
      background-color: var(--card-bg);
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 25px;
      border: 3px solid var(--accent-yellow);
      box-shadow: 0 8px 16px rgba(0,0,0,0.4);
      text-align: center;
      color: var(--text-dark);
    }

    .product-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 15px;
      border: 2px solid #fde68a;
      background-color: #fef08a;
      margin-bottom: 15px;
    }

    .product-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #800000;
      margin-bottom: 8px;
    }

    .product-price {
      color: #dc2626;
      font-family: 'Koulen', cursive;
      font-size: 1.8rem;
      margin-bottom: 15px;
    }

    .qty-control {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      margin-top: 10px;
    }

    .btn-qty {
      width: 50px;
      height: 50px;
      background: #800000;
      color: var(--accent-yellow);
      border: 2px solid var(--accent-yellow);
      font-size: 2rem;
      font-weight: bold;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .qty-number {
      font-family: 'Koulen', cursive;
      font-size: 2rem;
      width: 60px;
      text-align: center;
      color: #800000;
    }

    .bottom-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #4a0000;
      border-top: 4px solid var(--accent-yellow);
      padding: 15px 20px;
      box-shadow: 0 -5px 15px rgba(0,0,0,0.5);
      z-index: 1000;
    }

    .bottom-content {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .total-text {
      font-family: 'Koulen', cursive;
      font-size: 1.8rem;
      color: var(--accent-yellow);
      text-align: center;
    }

    .btn-telegram {
      background: linear-gradient(135deg, #16a34a, #15803d);
      color: #ffffff;
      border: 2px solid #86efac;
      padding: 14px;
      border-radius: 12px;
      font-family: 'Koulen', cursive;
      font-size: 1.5rem;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
  </style>
</head>
<body>

  <header>
    <div class="brand-title">ម៉ូម័រ MOMORE</div>
    <div class="brand-subtitle">📦 ហាងបោះដុំដំណាប់ចេកខ្មែរ 📦</div>
  </header>

  <div class="promo-banner">
    🔥 ប្រូម៉ូសិនបោះដុំពិសេស៖ ទិញ ៥ កេស ថែម ១ កេស 🔥
  </div>

  <div class="container">

    <div class="product-card">
      <img src="https://via.placeholder.com/500x300?text=MoMore+Original" alt="ដំណាប់ចេក រស់ជាតិដើម" class="product-img">
      <div class="product-title">ដំណាប់ចេកខ្មែរ រស់ជាតិដើម (១ កេស)</div>
      <div class="product-price">១៦០,០០០ ៛ / កេស</div>
      <div class="qty-control">
        <button class="btn-qty" onclick="changeQty(0, -1)">-</button>
        <span class="qty-number" id="qty-0">0</span>
        <button class="btn-qty" onclick="changeQty(0, 1)">+</button>
      </div>
    </div>

    <div class="product-card">
      <img src="https://via.placeholder.com/500x300?text=MoMore+Grains" alt="ដំណាប់ចេក រោយធញ្ញជាតិ" class="product-img">
      <div class="product-title">ដំណាប់ចេករោយធញ្ញជាតិ (១ កេស)</div>
      <div class="product-price">១៩០,០០០ ៛ / កេស</div>
      <div class="qty-control">
        <button class="btn-qty" onclick="changeQty(1, -1)">-</button>
        <span class="qty-number" id="qty-1">0</span>
        <button class="btn-qty" onclick="changeQty(1, 1)">+</button>
      </div>
    </div>

  </div>

  <div class="bottom-bar">
    <div class="bottom-content">
      <div class="total-text">
        លុយសរុប៖ <span id="total-price">0</span> ៛
      </div>
      <button class="btn-telegram" onclick="sendToTelegram()">
        ✈️ ផ្ញើការកុម្ម៉ង់បោះដុំចូល Telegram
      </button>
    </div>
  </div>

  <script>
    const products = [
      { name: "ដំណាប់ចេកខ្មែរ រស់ជាតិដើម (កេស)", price: 160000, qty: 0 },
      { name: "ដំណាប់ចេករោយធញ្ញជាតិ (កេស)", price: 190000, qty: 0 }
    ];

    function changeQty(index, change) {
      if (products[index].qty + change >= 0) {
        products[index].qty += change;
        document.getElementById(`qty-${index}`).innerText = products[index].qty;
        calculateTotal();
      }
    }

    function calculateTotal() {
      let total = 0;
      products.forEach(p => {
        total += p.price * p.qty;
      });
      document.getElementById('total-price').innerText = total.toLocaleString();
    }

    function sendToTelegram() {
      let hasOrder = false;
      let orderText = "សួស្តី! ខ្ញុំជាតំណាងចែកចាយ ចង់កុម្ម៉ង់បោះដុំ៖\n-------------------\n";
      
      products.forEach(p => {
        if (p.qty > 0) {
          hasOrder = true;
          orderText += `📦 ${p.name}: ${p.qty} កេស = ${(p.price * p.qty).toLocaleString()} ៛\n`;
        }
      });

      if (!hasOrder) {
        alert("សូមចុចសញ្ញា (+) ដើម្បីជ្រើសរើសចំនួនកេសមុននឹងផ្ញើ!");
        return;
      }

      let total = products.reduce((sum, p) => sum + (p.price * p.qty), 0);
      orderText += `-------------------\n💰 ទឹកប្រាក់សរុប៖ ${total.toLocaleString()} ៛`;

      const telegramUrl = `https://t.me/+85567678956?text=${encodeURIComponent(orderText)}`;
      window.open(telegramUrl, '_blank');
    }
  </script>

</body>
</html>
