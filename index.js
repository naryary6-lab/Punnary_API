<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ម៉ូម័រ MOMORE - Food & Snack Store</title>
  <link href="https://fonts.googleapis.com/css2?family=Koulen&family=Siemreap:wght@400;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-gradient: linear-gradient(180deg, #991b1b 0%, #450a0a 100%);
      --accent-yellow: #facc15;
      --card-bg: #fffbeb;
      --text-dark: #450a0a;
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
      padding-bottom: 40px;
    }

    header {
      text-align: center;
      padding: 30px 15px 20px;
      background: radial-gradient(circle, #b91c1c 0%, #7f1d1d 100%);
      border-bottom: 4px solid var(--accent-yellow);
      box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    }

    .brand-title {
      font-family: 'Koulen', cursive;
      font-size: 3.2rem;
      color: #ffffff;
      -webkit-text-stroke: 2px #7f1d1d;
      filter: drop-shadow(0px 4px 0px #facc15);
      line-height: 1.1;
      letter-spacing: 1px;
    }

    .brand-subtitle {
      font-family: 'Koulen', cursive;
      font-size: 1.2rem;
      color: #facc15;
      text-shadow: 1px 1px 2px #000;
      margin-top: 8px;
    }

    .promo-banner {
      background: linear-gradient(90deg, #facc15, #f59e0b);
      color: #7f1d1d;
      text-align: center;
      padding: 10px;
      font-weight: bold;
      font-size: 0.95rem;
      margin: 15px;
      border-radius: 30px;
      border: 2px solid #ffffff;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }

    .container {
      padding: 0 12px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .product-card {
      background-color: var(--card-bg);
      border-radius: 16px;
      padding: 10px;
      text-align: center;
      border: 2px solid var(--accent-yellow);
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .product-img {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid #fde68a;
      background-color: #fef08a;
    }

    .product-title {
      color: var(--text-dark);
      font-size: 0.95rem;
      margin: 8px 0 2px;
      font-weight: bold;
    }

    .product-price {
      color: #dc2626;
      font-family: 'Koulen', cursive;
      font-size: 1.1rem;
      margin-bottom: 8px;
    }

    .add-btn {
      width: 100%;
      background: linear-gradient(180deg, #dc2626 0%, #991b1b 100%);
      color: #facc15;
      border: 1px solid #facc15;
      padding: 8px 0;
      border-radius: 8px;
      font-family: 'Koulen', cursive;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .add-btn:active {
      transform: scale(0.96);
    }

    /* ផ្នែករ៉េស៊ីបកន្ត្រកទំនិញ & Payment */
    .cart-section {
      margin-top: 25px;
      background: var(--card-bg);
      border: 2px solid var(--accent-yellow);
      border-radius: 16px;
      padding: 20px 15px;
      text-align: center;
      color: var(--text-dark);
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    }

    .cart-title {
      font-family: 'Koulen', cursive;
      font-size: 1.5rem;
      color: #b91c1c;
      margin-bottom: 10px;
    }

    .cart-items-list {
      list-style: none;
      text-align: left;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dashed #cbd5e1;
      padding: 6px 0;
      color: #1e293b;
    }

    .total-box {
      font-family: 'Koulen', cursive;
      font-size: 1.6rem;
      color: #dc2626;
      background: #fef08a;
      padding: 8px 0;
      border-radius: 10px;
      margin-bottom: 15px;
      border: 1px dashed #eab308;
    }

    .account-name {
      font-weight: bold;
      font-size: 1rem;
      color: #1e293b;
      margin-bottom: 10px;
    }

    /* ប៊ូតុង Telegram & KHQR */
    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }

    .telegram-btn {
      display: block;
      width: 100%;
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: #ffffff;
      text-decoration: none;
      padding: 12px 15px;
      border-radius: 10px;
      font-family: 'Koulen', cursive;
      font-size: 1.1rem;
      box-shadow: 0 4px 10px rgba(3, 105, 161, 0.4);
      border: 1px solid #7dd3fc;
      cursor: pointer;
    }

    .khqr-btn {
      display: block;
      width: 100%;
      background: linear-gradient(135deg, #15803d, #16a34a);
      color: #ffffff;
      text-decoration: none;
      padding: 12px 15px;
      border-radius: 10px;
      font-family: 'Koulen', cursive;
      font-size: 1.1rem;
      box-shadow: 0 4px 10px rgba(22, 163, 74, 0.4);
      border: 1px solid #86efac;
    }
  </style>
</head>
<body>

  <header>
    <div class="brand-title">ម៉ូម័រ MOMORE</div>
    <div class="brand-subtitle">🍌 ដំណាប់ចេកណាំវ៉ាខ្មែរ 🍌</div>
  </header>

  <div class="promo-banner">
    🔥 កម្មវិធីពិសេស៖ ទិញ ៥ ថែម ១ (BUY 5 GET 1) 🔥
  </div>

  <div class="container">
    <div class="product-grid">

      <!-- Menu ទី១ -->
      <div class="product-card">
        <img src="images/banana-original.jpg" alt="ដំណាប់ចេកខ្មែរ សាច់ទន់ រស់ជាតិដើម" class="product-img">
        <div class="product-title">ដំណាប់ចេកខ្មែរ សាច់ទន់ រស់ជាតិដើម</div>
        <div class="product-price">10,000 ៛</div>
        <button class="add-btn" onclick="addToCart('ដំណាប់ចេកខ្មែរ សាច់ទន់', 10000)">+ កុម្ម៉ង់ទិញ</button>
      </div>

      <!-- Menu ទី២ -->
      <div class="product-card">
        <img src="images/banana-grains.jpg" alt="ដំណាប់ចេក រោយធញ្ញជាតិគ្រប់មុខ" class="product-img">
        <div class="product-title">ដំណាប់ចេក រោយធញ្ញជាតិគ្រប់មុខ</div>
        <div class="product-price">12,000 ៛</div>
        <button class="add-btn" onclick="addToCart('ដំណាប់ចេក រោយធញ្ញជាតិ', 12000)">+ កុម្ម៉ង់ទិញ</button>
      </div>

      <!-- Menu ទី៣ -->
      <div class="product-card">
        <img src="images/banana-almond.jpg" alt="ដំណាប់ចេករោយគ្រាប់ អាល់ម៉ុន" class="product-img">
        <div class="product-title">ដំណាប់ចេករោយគ្រាប់ អាល់ម៉ុន</div>
        <div class="product-price">12,000 ៛</div>
        <button class="add-btn" onclick="addToCart('ដំណាប់ចេករោយ អាល់ម៉ុន', 12000)">+ កុម្ម៉ង់ទិញ</button>
      </div>

      <!-- Menu ទី៤ -->
      <div class="product-card">
        <img src="images/banana-coconut.jpg" alt="ដំណាប់ចេករោយដូង" class="product-img">
        <div class="product-title">ដំណាប់ចេករោយដូង</div>
        <div class="product-price">12,000 ៛</div>
        <button class="add-btn" onclick="addToCart('ដំណាប់ចេករោយដូង', 12000)">+ កុម្ម៉ង់ទិញ</button>
      </div>

    </div>

    <!-- ផ្នែករ៉េស៊ីបកន្ត្រកទំនិញ & ទូទាត់ប្រាក់ -->
    <div class="cart-section">
      <div class="cart-title">🛒 រ៉េស៊ីបបញ្ជាទិញរបស់អ្នក</div>
      <ul id="cart-list" class="cart-items-list">
        <li style="text-align: center; color: #64748b;">មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយ</li>
      </ul>

      <div class="total-box">
        សរុប៖ <span id="total-price">0</span> ៛
      </div>

      <div class="account-name">💳 ឈ្មោះគណនី៖ SORM SOURPUNARY</div>
      
      <div class="btn-group">
        <!-- ប៊ូតុងផ្ញើរ៉េស៊ីបចូល Telegram លេខ 067 6789 56 -->
        <button onclick="sendToTelegram()" class="telegram-btn">
          ✈️ ផ្ញើកុម្ម៉ង់ចូល Telegram (067 6789 56)
        </button>

        <!-- ប៊ូតុងទូទាត់ KHQR -->
        <a href="https://acledabank.com.kh/acleda?payment_data=qWY5B2SAUfIhLblxzOtfu5ckLzMHjaSki6Ru0bsOyNK+ylPBgZ0sHH6BeGUscKoEGb6QgufwUu6yMqn6HT4Eeca24px5MrMJRdBkaYr1RiIKZ6atFD7qirkscOus5envQw5ClFg0yZX6gGE4qCBZfu42/X3B4VODrcoMRGLy6QoSYeB+OECqwnIVZ1T0FCQjYsC36qrYOeaYG9XByWRxYrLXvKOdUab8QkQw2KFRhyE=&key=khqr" target="_blank" class="khqr-btn">
          📲 ទូទាត់ប្រាក់តាម KHQR
        </a>
      </div>
    </div>

  </div>

  <script>
    let cart = [];
    let totalPrice = 0;

    function addToCart(name, price) {
      cart.push({ name, price });
      totalPrice += price;
      updateCartUI();
    }

    function updateCartUI() {
      const cartList = document.getElementById('cart-list');
      const totalPriceEl = document.getElementById('total-price');

      if (cart.length === 0) {
        cartList.innerHTML = '<li style="text-align: center; color: #64748b;">មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយ</li>';
      } else {
        cartList.innerHTML = '';
        cart.forEach((item, index) => {
          cartList.innerHTML += `
            <li class="cart-item">
              <span>${index + 1}. ${item.name}</span>
              <b>${item.price.toLocaleString()} ៛</b>
            </li>
          `;
        });
      }

      totalPriceEl.innerText = totalPrice.toLocaleString();
    }

    // មុខងារផ្ញើសារចូល Telegram លេខ 067 6789 56 (+85567678956)
    function sendToTelegram() {
      if (cart.length === 0) {
        alert('សូមជ្រើសរើសទំនិញមុននឹងផ្ញើ!');
        return;
      }

      let orderText = "សួស្តី! ខ្ញុំចង់កុម្ម៉ង់ទិញ៖\n";
      cart.forEach((item, i) => {
        orderText += `${i + 1}. ${item.name} - ${item.price.toLocaleString()} ៛\n`;
      });
      orderText += `\n💰 សរុបទាំងអស់៖ ${totalPrice.toLocaleString()} ៛`;

      // ភ្ជាប់ជាមួយ Telegram phone +85567678956
      const telegramUrl = `https://t.me/+85567678956?text=${encodeURIComponent(orderText)}`;
      window.open(telegramUrl, '_blank');
    }
  </script>

</body>
</html>
