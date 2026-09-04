<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MoMore Wholesale - ម៉ូម៉័រ</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Kantumruy Pro', sans-serif; }
        body { background-color: #3b0000; color: #fff; padding: 12px; text-align: center; }
        .brand-header { margin: 10px 0 15px 0; }
        .brand-title { font-size: 24px; font-weight: bold; color: #ffcc00; text-transform: uppercase; letter-spacing: 1px; }
        .brand-subtitle { font-size: 13px; color: #ffe082; margin-top: 2px; }
        .video-container {
            width: 100%; border-radius: 14px; overflow: hidden; border: 2px solid #ffcc00;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5); margin-bottom: 15px; background: #000;
        }
        .video-container video { width: 100%; max-height: 250px; object-fit: cover; display: block; }
        .banner-container {
            background: linear-gradient(135deg, #ff9800, #e65100); border: 2px solid #ffcc00;
            border-radius: 12px; padding: 12px; margin-bottom: 20px; text-align: left;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }
        .banner-title { font-size: 15px; font-weight: bold; color: #fff; }
        .banner-desc { font-size: 12px; color: #fff8e1; margin-top: 4px; line-height: 1.4; }
        .category-title {
            font-size: 16px; font-weight: bold; color: #ffcc00; text-align: left;
            margin: 18px 0 10px 0; border-left: 4px solid #ff9800; padding-left: 8px;
        }
        .pinterest-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; }
        .product-card {
            background: #ffffff; color: #333; border-radius: 14px; overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between;
        }
        .product-img { width: 100%; height: 170px; object-fit: cover; display: block; border-bottom: 1px solid #eee; background-color: #f0f0f0; }
        .product-info { padding: 10px; text-align: left; flex: 1; }
        .product-code { font-size: 10px; font-weight: bold; color: #888; text-transform: uppercase; }
        .product-name { font-size: 13px; font-weight: bold; color: #800000; line-height: 1.3; margin-top: 2px; }
        .product-price { font-size: 13px; font-weight: bold; color: #e53935; margin-top: 4px; }
        .qty-box {
            display: flex; align-items: center; justify-content: space-between;
            background: #f5f5f5; padding: 8px 10px; border-top: 1px solid #eee;
        }
        .btn-qty {
            background: #800000; color: #fff; border: none; width: 28px; height: 28px;
            border-radius: 50%; font-size: 16px; font-weight: bold; cursor: pointer;
        }
        .qty-num { font-size: 15px; font-weight: bold; color: #000; }
        
        .user-info-card {
            background: #fff; color: #000; border-radius: 14px; padding: 15px;
            margin: 20px 0; text-align: left; border: 2px solid #ffcc00;
        }
        .user-info-title {
            font-size: 15px; font-weight: bold; color: #800000; margin-bottom: 12px;
            border-bottom: 1px solid #ddd; padding-bottom: 6px;
        }
        .form-group { margin-bottom: 10px; }
        .form-group label { display: block; font-size: 12px; font-weight: bold; color: #444; margin-bottom: 4px; }
        .form-control {
            width: 100%; padding: 10px; font-size: 13px; border: 1px solid #ccc;
            border-radius: 8px; outline: none; background: #f9f9f9;
        }
        .form-control:focus { border-color: #800000; background: #fff; }

        /* Payment Method Options */
        .payment-method-box {
            background: #fff; color: #000; border-radius: 14px; padding: 15px;
            margin: 20px 0; border: 2px solid #e53935; text-align: left;
        }
        .payment-options { display: flex; gap: 10px; margin-bottom: 12px; }
        .payment-option-btn {
            flex: 1; padding: 10px; font-size: 13px; font-weight: bold; border: 2px solid #ccc;
            border-radius: 8px; background: #f5f5f5; cursor: pointer; text-align: center; color: #333;
        }
        .payment-option-btn.active { border-color: #e53935; background: #ffebee; color: #e53935; }
        
        .khqr-container { display: none; margin-top: 10px; text-align: center; }
        .khqr-img { width: 150px; height: auto; border: 1px solid #ccc; border-radius: 8px; margin: 6px 0; }

        .checkout-box {
            position: sticky; bottom: 10px; background: #230000; padding: 14px;
            border-radius: 14px; border: 2px solid #ffcc00; box-shadow: 0 5px 15px rgba(0,0,0,0.6); z-index: 100;
        }
        .total-text { font-size: 16px; color: #ffcc00; font-weight: bold; margin-bottom: 4px; }
        .delivery-text { font-size: 12px; color: #ffe082; margin-bottom: 10px; }
        .btn-submit {
            background: #2e7d32; color: #fff; border: none; width: 100%; padding: 12px;
            font-size: 15px; font-weight: bold; border-radius: 8px; cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="brand-header">
        <div class="brand-title">ម៉ូម៉័រ MOMORE</div>
        <div class="brand-subtitle">ហាងបោះដុំដំណាប់ចេក និងចេកបំពងស្រួយខ្មែរ</div>
    </div>

    <!-- Video Banner -->
    <div class="video-container">
        <video autoplay loop muted playsinline controls>
            <source src="promo-video.mp4" type="video/mp4">
        </video>
    </div>

    <!-- Promo Banner -->
    <div class="banner-container">
        <div class="banner-title">🔥 ប្រូម៉ូសិនបោះដុំ និងការដឹកជញ្ជូន 🔥</div>
        <div class="banner-desc">
            • <b>កញ្ចប់ធំ (200g):</b> ទិញ 30 កញ្ចប់ => <b>FREE ដឹក + ថែម 2 កញ្ចប់</b><br>
            • <b>កញ្ចប់តូច (100g):</b> ទិញ 60 កញ្ចប់ => <b>FREE ដឹក + ថែម 4 កញ្ចប់</b><br>
            • 🚚 ថ្លៃដឹកជញ្ជូនស្ដង់ដារ៖ 8,000 ៛
        </div>
    </div>

    <!-- Products (11 ដំណាប់ចេក + 9 ចេកបំពង) -> [រក្សាទុកដូចเดิม] -->
    <div class="category-title">🍌 ក្រុមដំណាប់ចេក (១១ មុខ)</div>
    <div class="pinterest-grid" id="product-list-1">
        <!-- (បញ្ចូលកូដផលិតផលទាំង ២០ មុខដដែលនៅទីនេះ ដើម្បីកុំឱ្យវែងពេក ខ្ញុំដាក់មុខងារគំរូខាងក្រោម) -->
        <div class="product-card">
            <img src="d-orig200.jpg" class="product-img" alt="ដំណាប់ចេក រសជាតិដើម" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-ORIG200</div>
                <div class="product-name">ដំណាប់ចេក រសជាតិដើម (200g)</div>
                <div class="product-price">8,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_ORIG200', -1)">-</button>
                <span class="qty-num" id="qty-D_ORIG200">0</span>
                <button class="btn-qty" onclick="changeQty('D_ORIG200', 1)">+</button>
            </div>
        </div>
        <!-- (កូដផលិតផលផ្សេងៗទៀត រក្សាទុកដដែល) -->
    </div>

    <!-- 📍 Delivery Info Form -->
    <div class="user-info-card">
        <div class="user-info-title">📍 ព័ត៌មានដឹកជញ្ជូន និងទំនាក់ទំនង</div>
        <div class="form-group">
            <label for="cust-phone">📱 លេខទូរស័ព្ទទំនាក់ទំនង *</label>
            <input type="tel" id="cust-phone" class="form-control" placeholder="ឧទាហរណ៍៖ 012 345 678" required>
        </div>
        <div class="form-group">
            <label for="cust-address">🏠 អាសយដ្ឋានដឹកជញ្ជូន / រាជធានី-ខេត្ត *</label>
            <input type="text" id="cust-address" class="form-control" placeholder="ឧទាហរណ៍៖ ផ្ទះលេខ..., ផ្លូវ..., រាជធានីភ្នំពេញ" required>
        </div>
        <div class="form-group">
            <label for="provincial-info">📦 សម្រាប់អតិថិជនតាមខេត្ត (ឈ្មោះក្រុមហ៊ុនដឹកជញ្ជូន និងសាខា)</label>
            <input type="text" id="provincial-info" class="form-control" placeholder="ឧទាហរណ៍៖ វីរៈប៊ុនថាំ សាខាផ្សារកណ្តាល ខេត្តសៀមរាប (បើមាន)">
        </div>
    </div>

    <!-- 💳 Payment Method Selection (COD vs KHQR) -->
    <div class="payment-method-box">
        <div style="font-weight: bold; color: #e53935; font-size: 15px; margin-bottom: 8px; text-align: center;">💳 ជ្រើសរើសវិធីសាស្ត្រទូទាត់ប្រាក់</div>
        <div class="payment-options">
            <div class="payment-option-btn active" id="btn-cod" onclick="selectPayment('COD')">💵 ទូទាត់ពេលទទួលបានអីវ៉ាន់ (COD)</div>
            <div class="payment-option-btn" id="btn-khqr" onclick="selectPayment('KHQR')">📲 បង់ប្រាក់រួចតាម KHQR</div>
        </div>

        <!-- Hidden KHQR Section (Will show only if KHQR is selected) -->
        <div id="khqr-section" class="khqr-container">
            <div style="font-size: 12px; color: #555;">ស្កែនបង់ប្រាក់តាម ABA / Bakong KHQR</div>
            <img src="khqr.jpg" class="khqr-img" alt="KHQR Code" onerror="this.src='https://via.placeholder.com/150?text=KHQR'">
            <div style="font-size: 11px; font-weight: bold; color: #333; margin-bottom: 8px;">ឈ្មោះ: MOMORE SNACKS</div>
            
            <div class="form-group" style="text-align: left;">
                <label for="payment-slip" style="color: #800000; font-weight: bold;">🖼️ Upload រូប Slip បង់ប្រាក់ *</label>
                <input type="file" id="payment-slip" class="form-control" accept="image/*" style="background: #fff;">
            </div>
        </div>
    </div>

    <!-- Sticky Bottom Checkout -->
    <div class="checkout-box">
        <div class="total-text">ទំនិញសរុប៖ <span id="total-val">0</span> ៛</div>
        <div class="delivery-text" id="delivery-info">🚚 ថ្លៃដឹកជញ្ជូន៖ 8,000 ៛</div>
        <button class="btn-submit" onclick="submitOrder()">✈️ បញ្ជាទិញចូល Telegram</button>
    </div>

    <script>
        const tg = window.Telegram.WebApp;
        tg.expand();

        let currentPaymentMethod = 'COD'; // Default is COD

        function selectPayment(method) {
            currentPaymentMethod = method;
            let btnCod = document.getElementById('btn-cod');
            let btnKhqr = document.getElementById('btn-khqr');
            let khqrSection = document.getElementById('khqr-section');

            if (method === 'COD') {
                btnCod.classList.add('active');
                btnKhqr.classList.remove('active');
                khqrSection.style.display = 'none';
            } else {
                btnKhqr.classList.add('active');
                btnCod.classList.remove('active');
                khqrSection.style.display = 'block';
            }
        }

        const products = {
            D_ORIG200: { name: "ដំណាប់ចេក រសជាតិដើម (200g)", price: 8000, qty: 0, size: '200g' },
            // (បញ្ចូលផលិតផលផ្សេងៗទៀតនៅទីនេះឱ្យគ្រប់ ២០ មុខ)
        };

        const BOT_TOKEN = "8850768954:AAF6b82FJ7yWDASFA7Cy1WT75d68nwGu3Hs";
        const GROUP_ID = "-1004387546731";

        function changeQty(key, amount) {
            if (!products[key]) return;
            products[key].qty += amount;
            if (products[key].qty < 0) products[key].qty = 0;
            document.getElementById(`qty-${key}`).innerText = products[key].qty;
            calculateTotal();
        }

        function calculateTotal() {
            let totalItemPrice = 0;
            let total200gQty = 0;
            let total100gQty = 0;

            for (let key in products) {
                let p = products[key];
                totalItemPrice += p.qty * p.price;
                if (p.size === '200g') total200gQty += p.qty;
                if (p.size === '100g') total100gQty += p.qty;
            }

            let deliveryFee = 8000;
            let promoFreeMsg = "";

            if (totalItemPrice === 0) {
                deliveryFee = 0;
            } else if (total200gQty >= 30 || total100gQty >= 60) {
                deliveryFee = 0;
                if (total200gQty >= 30) promoFreeMsg += " [FREE ដឹក + ថែម 2 កញ្ចប់]";
                if (total100gQty >= 60) promoFreeMsg += " [FREE ដឹក + ថែម 4 កញ្ចប់]";
            }

            let grandTotal = totalItemPrice + deliveryFee;

            document.getElementById('total-val').innerText = grandTotal.toLocaleString();
            document.getElementById('delivery-info').innerText = deliveryFee === 0 && totalItemPrice > 0
                ? `🚚 ថ្លៃដឹកជញ្ជូន៖ FREE ឥតគិតថ្លៃ! ${promoFreeMsg}`
                : `🚚 ថ្លៃដឹកជញ្ជូន៖ ${deliveryFee.toLocaleString()} ៛`;

            return { grandTotal, totalItemPrice, deliveryFee, promoFreeMsg };
        }

        async function submitOrder() {
            let calc = calculateTotal();
            if (calc.totalItemPrice === 0) {
                alert("សូមជ្រើសរើសចំនួនទំនិញយ៉ាងហោចណាស់ ១ មុខ!");
                return;
            }

            let phone = document.getElementById('cust-phone').value.trim();
            let address = document.getElementById('cust-address').value.trim();
            let provincialInfo = document.getElementById('provincial-info').value.trim();

            if (!phone || !address) {
                alert("សូមបំពេញលេខទូរស័ព្ទ និងអាសយដ្ឋានដឹកជញ្ជូនឱ្យបានរួចរាល់!");
                return;
            }

            let slipFile = null;
            if (currentPaymentMethod === 'KHQR') {
                let slipInput = document.getElementById('payment-slip');
                if (slipInput.files.length === 0) {
                    alert("សូមแนបរូបវិក្កយបត្រ (Slip បង់ប្រាក់) ជាមុនសិន!");
                    return;
                }
                slipFile = slipInput.files[0];
            }

            const user = tg.initDataUnsafe?.user;
            const customerName = user ? `${user.first_name} ${user.last_name || ''}`.trim() : "អតិថិជន";
            const username = user?.username ? `@${user.username}` : "គ្មាន Username";

            let orderText = "";
            for (let key in products) {
                let p = products[key];
                if (p.qty > 0) {
                    orderText += `• <b>${p.name}</b>: ${p.qty} កញ្ចប់ = ${(p.qty * p.price).toLocaleString()} ៛\n`;
                }
            }

            // Payment status tag for Telegram notification
            let paymentStatusTag = currentPaymentMethod === 'COD' 
                ? "🔴 <b>ស្ថានភាព: មិនទាន់ទូទាត់ (ទូទាត់ជាសាច់ប្រាក់ COD ជាមួយអ្នកដឹក)</b>" 
                : "🟢 <b>ស្ថានភាព: បានទូទាត់រួច (ผ่าน KHQR ស្រេចបាច់)</b>";

            let msg = `📦 <b>មានការកុម្ម៉ង់បោះដុំថ្មី (MOMORE)!</b>\n\n` +
                      `${paymentStatusTag}\n\n` +
                      `👤 <b>អ្នកទិញ:</b> ${customerName} (${username})\n` +
                      `📞 <b>លេខទូរស័ព្ទ:</b> ${phone}\n` +
                      `🏠 <b>អាសយដ្ឋាន:</b> ${address}\n` +
                      (provincialInfo ? `🏢 <b>សាខា/ខេត្ត:</b> ${provincialInfo}\n\n` : `\n`) +
                      `📝 <b>មុខទំនិញកុម្ម៉ង់:</b>\n${orderText}\n` +
                      `🚚 <b>ថ្លៃដឹក:</b> ${calc.deliveryFee === 0 ? "FREE ឥតគិតថ្លៃ" : calc.deliveryFee.toLocaleString() + " ៛"}\n` +
                      (calc.promoFreeMsg ? `🎁 <b>ប្រូម៉ូសិនថែម:</b> ${calc.promoFreeMsg}\n` : '') +
                      `💰 <b>សរុបទឹកប្រាក់ត្រូវទូទាត់:</b> ${calc.grandTotal.toLocaleString()} ៛\n\n` +
                      `━━━━━━━━━━━━━━━━━━━━\n` +
                      `🙏 <b>អរគុណច្រើនចំពោះការបញ្ជាទិញ!</b>\n` +
                      `⏰ <b>ពេលវេលាដឹកជញ្ជូន:</b>\n` +
                      `• ទិញពេលយប់ ➡️ ដឹកពេលថ្ងៃ (១១ - ១៣ ថ្ងៃត្រង់)\n` +
                      `• ទិញពេលថ្ងៃ ➡️ ដឹកពេលសៀល (៣ - ៦ ល្ងាច)\n` +
                      `• អតិថិជនតាមខេត្ត ➡️ ដាក់ជូនពេលល្ងាចទាំងអស់\n\n` +
                      `⚠️ <b>សូមរក្សាទូរស័ព្ទនៅក្បែរដៃជានិច្ច ងាយស្រួលទទួលអីវ៉ាន់!</b>`;

            let btnSubmit = document.querySelector('.btn-submit');
            btnSubmit.innerText = "កំពុងផ្ញើទិន្នន័យ...";
            btnSubmit.disabled = true;

            try {
                let response;
                if (currentPaymentMethod === 'KHQR' && slipFile) {
                    // Send with Photo (Slip)
                    let formData = new FormData();
                    formData.append("chat_id", GROUP_ID);
                    formData.append("photo", slipFile);
                    formData.append("caption", msg);
                    formData.append("parse_mode", "HTML");

                    response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, { method: "POST", body: formData });
                } else {
                    // Send text only for COD
                    let bodyData = {
                        chat_id: GROUP_ID,
                        text: msg,
                        parse_mode: "HTML"
                    };
                    response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bodyData)
                    });
                }

                let data = await response.json();
                if(data.ok) {
                    alert("ការបញ្ជាទិញត្រូវបានផ្ញើជូន Admin ដោយជោគជ័យ!\nអរគុណច្រើនសម្រាប់ការគាំទ្រ MOMORE!");
                    tg.close();
                } else {
                    alert("មានបញ្ហាក្នុងការផ្ញើទិន្នន័យ៖ " + (data.description || "សូមព្យាយាមម្តងទៀត"));
                    btnSubmit.innerText = "✈️ បញ្ជាទិញចូល Telegram";
                    btnSubmit.disabled = false;
                }
            } catch (err) {
                alert("Error: " + err);
                btnSubmit.innerText = "✈️ បញ្ជាទិញចូល Telegram";
                btnSubmit.disabled = false;
            }
        }
    </script>
</body>
</html>
