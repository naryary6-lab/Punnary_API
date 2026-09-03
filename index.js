<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ម៉ូម័រ MOMORE - Mini App</title>
  
  <!-- Import Khmer Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Dangrek&family=Koulen&family=Moul&family=Siemreap:wght@400;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-color: #fff9eb;
      --primary-red: #990000;
      --accent-yellow: #facc15;
      --text-dark: #1a1a1a;
      --card-bg: #ffffff;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Siemreap', sans-serif;
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-dark);
      padding-bottom: 80px;
    }

    /* HEADER */
    header {
      background: linear-gradient(135deg, #800000 0%, #b30000 100%);
      text-align: center;
      padding: 20px 15px;
      border-bottom: 5px solid var(--accent-yellow);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .brand-logo {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 3px solid var(--accent-yellow);
      object-fit: cover;
      margin-bottom: 8px;
    }

    .brand-title {
      font-family: 'Moul', cursive;
      font-size: 2.5rem;
      color: var(--accent-yellow);
      text-shadow: 
        3px 3px 0px #000,
        -2px -2px 0px #000,
        2px -2px 0px #000,
        -2px 2px 0px #000;
      line-height: 1.2;
    }

    .brand-subtitle {
      font-family: 'Dangrek', cursive;
      font-size: 1.4rem;
      color: #ffffff;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
      margin-top: 5px;
    }

    /* PROMO BANNER */
    .promo-banner {
      background: #facc15;
      color: #800000;
      text-align: center;
      padding: 12px;
      font-family: 'Koulen', cursive;
      font-size: 1.2rem;
      margin: 15px;
      border-radius: 12px;
      border: 2px solid #800000;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .container {
      max-width: 650px;
      margin: 0 auto;
      padding: 0 12px;
    }

    /* ---------------------------------------------------- */
    /* 🎬 ផ្នែកវីដេអូទំហំ 9:16 (Vertical Video Section) */
    /* ---------------------------------------------------- */
    .video-section-title {
      font-family: 'Dangrek', cursive;
      font-size: 1.3rem;
      color: var(--primary-red);
      margin: 15px 0 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .video-slider {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 10px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      margin-bottom: 20px;
    }

    .video-slider::-webkit-scrollbar {
      display: none;
    }

    .video-card {
      flex: 0 0 200px;
      aspect-ratio: 9 / 16;
      background: #000;
      border-radius: 16px;
      overflow: hidden;
      border: 3px solid var(--accent-yellow);
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
      scroll-snap-align: start;
      position: relative;
    }

    .video-card video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.85));
      color: #fff;
      padding: 20px 8px 8px;
      font-size: 0.85rem;
      font-weight: bold;
      text-align: center;
    }

    /* MENU ITEM LAYOUT (រូបនៅឆ្វេង - ឈ្មោះ/តម្លៃនៅស្តាំ) */
    .product-card {
      background-color: var(--card-bg);
      border-radius: 16px;
      padding: 12px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 15px;
      border: 2px solid #e2e8f0;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .product-img {
      width: 105px;
      height: 105px;
      object-fit: cover;
      border-radius: 12px;
      border: 2px solid #fde68a;
      background-color: #fef3c7;
      flex-shrink: 0;
    }

    .product-info {
      flex-grow: 1;
    }

    .product-title {
      font-family: 'Dangrek', cursive;
      font-size: 1.2rem;
      color: #800000;
      line-height: 1.3;
      margin-bottom: 4px;
    }

    .product-price {
      font-family: 'Koulen', cursive;
      font-size: 1.35rem;
      color: #dc2626;
      margin-bottom: 8px;
    }

    .qty-control {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-qty {
      width: 36px;
      height: 36px;
      background: #800000;
      color: #ffffff;
      border: none;
      font-size: 1.4rem;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .qty-number {
      font-family: 'Koulen', cursive;
      font-size: 1.4rem;
      min-width: 25px;
      text-align: center;
      color: #111;
    }

    /* RECEIPT CART */
    .cart-section {
      background: #ffffff;
      border: 3px solid #800000;
      border-radius: 18px;
      padding: 20px 15px;
      margin-top: 25px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }

    .cart-title {
      font-family: 'Moul', cursive;
      font-size: 1.3rem;
      color: #800000;
      text-align: center;
      border-bottom: 2px dashed #800000;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.95rem;
      padding: 8px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .promo-free-item {
      color: #15803d;
      font-weight: bold;
      background: #f0fdf4;
      padding: 8px 10px;
      border-radius: 8px;
      margin: 8px 0;
      border: 1px solid #bbf7d0;
      font-size: 0.9rem;
    }

    .shipping-box {
      display: flex;
      justify-content: space-between;
      font-size: 1.1rem;
      font-weight: bold;
      color: #1e293b;
      background: #f8fafc;
      padding: 10px 12px;
      border-radius: 8px;
      margin-top: 12px;
      border: 1px solid #cbd5e1;
    }

    .shipping-free {
      color: #16a34a;
    }

    .final-total-container {
      margin-top: 20px;
      background: #800000;
      border-radius: 12px;
      padding: 15px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .final-total-label {
      color: #ffffff;
      font-size: 1.05rem;
      font-weight: bold;
    }

    .final-total-price {
      font-family: 'Koulen', cursive;
      font-size: 2.6rem;
      color: var(--accent-yellow);
      line-height: 1.1;
      text-shadow: 2px 2px 4px #000;
    }

    .qr-container {
      text-align: center;
      margin-top: 20px;
      padding: 15px;
      background: #fffbeb;
      border: 2px dashed #f59e0b;
      border-radius: 12px;
    }

    .qr-image {
      width: 190px;
      height: 190px;
      object-fit: contain;
      border: 2px solid #800000;
      border-radius: 8px;
      margin: 10px 0;
    }

    .thank-you-text {
      font-family: 'Moul', cursive;
      font-size: 1.1rem;
      color: #800000;
      margin-top: 8px;
    }

    .btn-telegram {
      display: block;
      width: 100%;
      background: #16a34a;
      color: #ffffff;
      border: none;
      padding: 15px;
      border-radius: 12px;
      font-family: 'Koulen', cursive;
      font-size: 1.35rem;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      margin-top: 15px;
      box-shadow: 0 4px 10px rgba(22, 163, 74, 0.3);
    }
  </style>
</head>
<body>

  <header>
    <img src="images/logo.jpg" alt="MOMORE Logo" class="brand-logo" onerror="this.src='https://via.placeholder.com/90?text=MOMORE'">
    <div class="brand-title">ម៉ូម័រ MOMORE</div>
    <div class="brand-subtitle">🍌 ហាងទំនិញសម្រន់ & ដំណាប់ចេក 🍌</div>
  </header>

  <div class="promo-banner">
    🎁 ប្រូម៉ូសិន៖ ទិញ ៥ កំប៉ុង ថែម ១ កំប៉ុង + FREE សេវាដឹក!
  </div>

  <div class="container">

    <!-- 🎬 ផ្នែកវីដេអូទំហំ 9:16 (អូសទៅឆ្វេងស្តាំ) -->
    <div class="video-section-title">
      🎬 វីដេអូសកម្មភាពហាង (អូសទៅស្តាំដើម្បីមើលបន្ថែម)
    </div>

    <div class="video-slider">
      <div class="video-card">
        <video autoplay loop muted playsinline poster="images/thumb1.jpg">
          <source src="videos/promo1.mp4" type="video/mp4">
        </video>
        <div class="video-label">🍌 ដំណាប់ចេករសជាតិដើម</div>
      </div>

      <div class="video-card">
        <video autoplay loop muted playsinline poster="images/thumb2.jpg">
          <source src="videos/promo2.mp4" type="video/mp4">
        </video>
        <div class="video-label">✨ រោយគ្រាប់ធញ្ញជាតិ</div>
      </div>

      <div class="video-card">
        <video autoplay loop muted playsinline poster="images/thumb3.jpg">
          <source src="videos/promo3.mp4" type="video/mp4">
        </video>
        <div class="video-label">📦 សកម្មភាពរៀបចំវេចខ្ចប់</div>
      </div>

      <div class="video-card">
        <video autoplay loop muted playsinline poster="images/thumb4.jpg">
          <source src="videos/promo4.mp4" type="video/mp4">
        </video>
        <div class="video-label">🚚 ការដឹកជញ្ជូនជូនអតិថិជន</div>
      </div>
    </div>

    <!-- 📦 បញ្ជីផលិតផលទាំង ២០ មុខ -->
    <div id="product-list"></div>

    <!-- 🧾 ផ្នែកវិក្កយបត្រ (Cart Receipt) -->
    <div class="cart-section">
      <div class="cart-title">🧾 វិក្កយបត្របញ្ជាទិញ</div>

      <div id="cart-items-container">
        <p style="text-align: center; color: #64748b; padding: 10px;">សូមចុចសញ្ញា (+) ដើម្បីជ្រើសរើសទំនិញ</p>
      </div>

      <div class="shipping-box">
        <span>🚚 ថ្លៃដឹកជញ្ជូន៖</span>
        <span id="shipping-cost">7,000 ៛</span>
      </div>

      <div class="final-total-container">
        <div class="final-total-label">💰 ទឹកប្រាក់សរុបត្រូវទូទាត់ពិតប្រាកដ</div>
        <div class="final-total-price"><span id="final-total">0</span> ៛</div>
      </div>

      <div class="qr-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/KHQR_Logo.svg" alt="KHQR Logo" style="height: 30px; margin-bottom: 5px;"><br>
        <div style="font-weight: bold; font-size: 0.95rem; color: #1e293b;">💳 ស្កែនទូទាត់ប្រាក់ (SORM SOURPUNARY)</div>
        <img src="images/khqr.jpg" alt="KHQR Code" class="qr-image" onerror="this.src='https://via.placeholder.com/190x190?text=KHQR+Code'">
        <div class="thank-you-text">អរគុណច្រើនសម្រាប់ការគាំទ្រ!</div>
      </div>

      <button class="btn-telegram" onclick="sendToTelegram()">
        ✈️ ផ្ញើការកុម្ម៉ង់ចូល Telegram (067 6789 56)
      </button>

    </div>

  </div>

  <script>
    const products = [
      { id: 1, name: "ដំណាប់ចេកខ្មែរ សាច់ទន់ រស់ជាតិដើម", price: 10000, img: "banana-original.jpg", qty: 0 },
      { id: 2, name: "ដំណាប់ចេក រោយធញ្ញជាតិគ្រប់មុខ", price: 12000, img: "banana-grains.jpg", qty: 0 },
      { id: 3, name: "ដំណាប់ចេករោយគ្រាប់ អាល់ម៉ុន", price: 12000, img: "banana-almond.jpg", qty: 0 },
      { id: 4, name: "ដំណាប់ចេករោយដូងឈ្ងុយ", price: 12000, img: "banana-coconut.jpg", qty: 0 },
      { id: 5, name: "ចេកអាំងក្រៀម ប៊័រមាស", price: 10000, img: "banana-butter.jpg", qty: 0 },
      { id: 6, name: "ចេកចៀនបន្ទះស្រួលញ៉ាំ (Crispy Banana)", price: 10000, img: "banana-crispy.jpg", qty: 0 },
      { id: 7, name: "ស្វាយអប់សម្ងួត Premium (Dried Mango)", price: 12000, img: "dried-mango.jpg", qty: 0 },
      { id: 8, name: "ខ្នុរសម្ងួត ស្រួយឆ្ងាញ់ (Dried Jackfruit)", price: 12000, img: "dried-jackfruit.jpg", qty: 0 },
      { id: 9, name: "ម្នាស់សម្ងួត ជូរអែម (Dried Pineapple)", price: 12000, img: "dried-pineapple.jpg", qty: 0 },
      { id: 10, name: "ដំឡូងជ្វាចៀន ស្រួយអែម", price: 10000, img: "potato-chips.jpg", qty: 0 },
      { id: 11, name: "តារ៉ូចៀនស្រួយ (Taro Chips)", price: 10000, img: "taro-chips.jpg", qty: 0 },
      { id: 12, name: "គ្រាប់ស្វាយចន្ទី លីងអំបិល", price: 15000, img: "cashew-nuts.jpg", qty: 0 },
      { id: 13, name: "គ្រាប់សណ្តែកដី លីងស្លឹកក្រូច", price: 8000, img: "peanuts.jpg", qty: 0 },
      { id: 14, name: "ត្រាវក្រៀម ប៊័រស្ករ", price: 10000, img: "sweet-taro.jpg", qty: 0 },
      { id: 15, name: "ផ្លែឈើចម្រុះសម្ងួត (Mixed Fruits)", price: 12000, img: "mixed-fruits.jpg", qty: 0 },
      { id: 16, name: "អំពិលម៉ែអែម ជ្រក់ម្ទេស", price: 10000, img: "tamarind.jpg", qty: 0 },
      { id: 17, name: "ចេកឆ្កើះ រសជាតិហឹរផ្អែម", price: 10000, img: "banana-spicy.jpg", qty: 0 },
      { id: 18, name: "ពោតលីង ប៊័រដូង", price: 8000, img: "popcorn.jpg", qty: 0 },
      { id: 19, name: "សារ៉ាយសមុទ្រ បំពងស្រួយ", price: 10000, img: "seaweed.jpg", qty: 0 },
      { id: 20, name: "ប្រអប់កញ្ចប់កាដូ សម្រន់ចម្រុះ", price: 25000, img: "gift-set.jpg", qty: 0 }
    ];

    const standardShipping = 7000;

    function renderProducts() {
      const listEl = document.getElementById('product-list');
      listEl.innerHTML = '';

      products.forEach((p, index) => {
        listEl.innerHTML += `
          <div class="product-card">
            <img src="images/${p.img}" alt="${p.name}" class="product-img" onerror="this.src='https://via.placeholder.com/105?text=MOMORE'">
            <div class="product-info">
              <div class="product-title">${p.name}</div>
              <div class="product-price">${p.price.toLocaleString()} ៛</div>
              <div class="qty-control">
                <button class="btn-qty" onclick="changeQty(${index}, -1)">-</button>
                <span class="qty-number" id="qty-${index}">${p.qty}</span>
                <button class="btn-qty" onclick="changeQty(${index}, 1)">+</button>
              </div>
            </div>
          </div>
        `;
      });
    }

    function changeQty(index, change) {
      if (products[index].qty + change >= 0) {
        products[index].qty += change;
        document.getElementById(`qty-${index}`).innerText = products[index].qty;
        updateReceipt();
      }
    }

    function updateReceipt() {
      const container = document.getElementById('cart-items-container');
      const shippingEl = document.getElementById('shipping-cost');
      const finalTotalEl = document.getElementById('final-total');

      let totalItems = 0;
      let subTotal = 0;
      let itemsHtml = '';

      products.forEach(p => {
        if (p.qty > 0) {
          totalItems += p.qty;
          let itemSum = p.price * p.qty;
          subTotal += itemSum;
          itemsHtml += `
            <div class="cart-item">
              <span>📦 ${p.name} (${p.qty} កំប៉ុង)</span>
              <b>${itemSum.toLocaleString()} ៛</b>
            </div>
          `;
        }
      });

      if (totalItems === 0) {
        container.innerHTML = '<p style="text-align: center; color: #64748b; padding: 10px;">សូមចុចសញ្ញា (+) ដើម្បីជ្រើសរើសទំនិញ</p>';
        shippingEl.innerHTML = '7,000 ៛';
        shippingEl.className = '';
        finalTotalEl.innerText = '0';
        return;
      }

      let freeItems = Math.floor(totalItems / 5);
      let actualShipping = totalItems >= 5 ? 0 : standardShipping;

      if (freeItems > 0) {
        itemsHtml += `
          <div class="promo-free-item">
            🎁 ប្រូម៉ូសិនពិសេស៖ ថែមជូន ${freeItems} កំប៉ុង ឥតគិតថ្លៃ!
          </div>
        `;
      }

      container.innerHTML = itemsHtml;

      if (actualShipping === 0) {
        shippingEl.innerHTML = 'FREE (ឥតគិតថ្លៃ)';
        shippingEl.className = 'shipping-free';
      } else {
        shippingEl.innerHTML = '7,000 ៛';
        shippingEl.className = '';
      }

      let finalTotal = subTotal + actualShipping;
      finalTotalEl.innerText = finalTotal.toLocaleString();
    }

    function sendToTelegram() {
      let totalItems = products.reduce((sum, p) => sum + p.qty, 0);

      if (totalItems === 0) {
        alert("សូមចុចសញ្ញា (+) ដើម្បីជ្រើសរើសចំនួនទំនិញមុននឹងផ្ញើ!");
        return;
      }

      let freeItems = Math.floor(totalItems / 5);
      let subTotal = products.reduce((sum, p) => sum + (p.price * p.qty), 0);
      let actualShipping = totalItems >= 5 ? 0 : standardShipping;
      let finalTotal = subTotal + actualShipping;

      let orderText = "សួស្តី! ខ្ញុំចង់កុម្ម៉ង់ទិញ៖\n-------------------\n";
      
      products.forEach(p => {
        if (p.qty > 0) {
          orderText += `📦 ${p.name}: ${p.qty} កំប៉ុង = ${(p.price * p.qty).toLocaleString()} ៛\n`;
        }
      });

      if (freeItems > 0) {
        orderText += `🎁 ថែមជូនឥតគិតថ្លៃ៖ ${freeItems} កំប៉ុង\n`;
      }

      orderText += `🚚 ថ្លៃដឹកជញ្ជូន៖ ${actualShipping === 0 ? 'FREE (ឥតគិតថ្លៃ)' : '7,000 ៛'}\n`;
      orderText += `-------------------\n💰 ទឹកប្រាក់សរុបត្រូវទូទាត់៖ ${finalTotal.toLocaleString()} ៛`;

      const telegramUrl = `https://t.me/+85567678956?text=${encodeURIComponent(orderText)}`;
      window.open(telegramUrl, '_blank');
    }

    renderProducts();
  </script>

</body>
</html>
