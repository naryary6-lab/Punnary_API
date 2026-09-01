const express = require('express');
const axios = require('axios');
const qrcode = require('qrcode');

const app = express();
app.use(express.json());

// Telegram Bot Token & Chat ID
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || 'YOUR_ADMIN_CHAT_ID';

// ====================================================
// 1. FUNCTION គណនា CRC16-CCITT តាមស្តង់ដារ KHQR
// ====================================================
function crc16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}

// ====================================================
// 2. FUNCTION បង្កើត ACLEDA MERCHANT KHQR
// ====================================================
function generateAcledaMerchantKHQR(amount, currency = "USD") {
    const currCode = currency === "USD" ? "840" : "116";
    const amtStr = parseFloat(amount).toFixed(2);

    // Structure ដើមដែលទាញចេញពីរូបភាពប័ណ្ណ KHQR ផ្លូវការ (Merchant ID: 15198798)
    let payload = "000201"; // Format Indicator
    payload += "010212";   // Dynamic Initiation Method
    payload += "30380009khqr@aclb0111855151987980206ACLEDA"; // Merchant Tag 30
    payload += "391300042CCY01011"; // Acleda Specific Tag
    payload += "52045399"; // Category Code
    payload += `5303${currCode}`; // Currency
    payload += `54${String(amtStr.length).padStart(2, '0')}${amtStr}`; // Amount
    payload += "5802KH";
    payload += "5915Sorm Sourpunary"; // Merchant Name
    payload += "6010Phnom Penh"; // City

    payload += "6304";
    const crcVal = crc16(payload);
    return payload + crcVal;
}

// ====================================================
// 3. API ទទួលការកុម្ម៉ង់ (ORDER API)
// ====================================================
app.post('/api/order', async (req, res) => {
    try {
        const { product, quantity, totalPrice, phone, note, userName } = req.body;

        // បង្កើត KHQR String ដោយប្រើ Structure ផ្លូវការ
        const khqrString = generateAcledaMerchantKHQR(totalPrice, "USD");

        // បង្កើតរូបភាព QR Code ច្បាស់កម្រិតខ្ពស់
        const qrImageDataUrl = await qrcode.toDataURL(khqrString, {
            errorCorrectionLevel: 'M',
            margin: 2,
            width: 380,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });

        // ផ្ញើសារដំណឹងទៅ Telegram Admin
        const messageText = `
🛍️ **ការកុម្ម៉ង់ថ្មីពី MoMore Snacks!**
-----------------------------
👤 **អតិថិជន:** ${userName || 'មិនបានបញ្ជាក់'}
📞 **លេខទូរស័ព្ទ:** ${phone}
📦 **មុខទំនិញ:** ${product}
🔢 **ចំនួនសរុប:** ${quantity}
💰 **ទឹកប្រាក់សរុប:** $${totalPrice}
📍 **ទីតាំង/ចំណាំ:** ${note || 'គ្មាន'}
-----------------------------
⏰ ម៉ោង៖ ${new Date().toLocaleString('km-KH', { timeZone: 'Asia/Phnom_Penh' })}
        `;

        if (TELEGRAM_BOT_TOKEN !== 'YOUR_TELEGRAM_BOT_TOKEN') {
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: ADMIN_CHAT_ID,
                text: messageText,
                parse_mode: 'Markdown'
            });
        }

        res.json({
            success: true,
            qrImage: qrImageDataUrl
        });

    } catch (error) {
        console.error("Order processing error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ====================================================
// 4. FRONTEND MINI APP (HTML)
// ====================================================
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="km">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ម៉ូម៉ែ MoMore Snacks Store</title>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; font-family: 'Kantumruy Pro', sans-serif; margin: 0; padding: 0; }
            body { background-color: #FAFAFA; color: #1F2937; padding-bottom: 90px; }
            .header { background: linear-gradient(135deg, #D97706 0%, #B45309 100%); color: white; padding: 20px 16px; border-radius: 0 0 20px 20px; }
            .header h1 { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
            .header p { font-size: 12px; opacity: 0.9; }
            .promo-container { padding: 12px 16px; }
            .promo-card { background: #FEF3C7; border: 1px dashed #F59E0B; padding: 10px 14px; border-radius: 12px; color: #92400E; font-size: 13px; font-weight: 600; }
            .section-title { font-size: 15px; font-weight: 700; margin: 10px 16px; color: #374151; }
            .product-grid { padding: 0 16px; display: flex; flex-direction: column; gap: 12px; }
            .product-card { background: white; border-radius: 16px; padding: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #F3F4F6; display: flex; gap: 12px; align-items: center; }
            .product-img-box { width: 70px; height: 70px; background: #FFFBEB; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 30px; flex-shrink: 0; }
            .product-info { flex-grow: 1; }
            .product-title { font-size: 14px; font-weight: 700; color: #111827; }
            .product-desc { font-size: 11px; color: #6B7280; margin-bottom: 6px; }
            .product-price { font-size: 15px; font-weight: 700; color: #D97706; }
            .qty-control { display: flex; align-items: center; background: #F3F4F6; border-radius: 8px; padding: 2px; }
            .qty-btn { width: 28px; height: 28px; border: none; background: white; border-radius: 6px; font-weight: bold; font-size: 16px; color: #D97706; cursor: pointer; }
            .qty-num { width: 26px; text-align: center; font-size: 13px; font-weight: 700; }
            .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 12px 16px; box-shadow: 0 -4px 20px rgba(0,0,0,0.08); display: flex; justify-content: space-between; align-items: center; border-radius: 16px 16px 0 0; }
            .cart-total-price { font-size: 18px; font-weight: 700; color: #D97706; }
            .btn-checkout { background: linear-gradient(135deg, #D97706, #B45309); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; }
            .modal { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); backdrop-filter: blur(4px); justify-content:center; align-items:center; z-index: 999; }
            .modal-content { background:white; padding:20px; border-radius:20px; width:88%; max-width:360px; text-align:center; }
            .input-group { text-align: left; margin-bottom: 12px; }
            .input-group label { font-size: 12px; font-weight: 600; color: #374151; display: block; margin-bottom: 4px; }
            .input-field { width: 100%; padding: 10px 12px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 13px; outline: none; }
            .qr-img { width: 230px; height: 230px; margin: 12px auto; border: 2px solid #FEF3C7; border-radius: 12px; padding: 6px; display: block; }
        </style>
    </head>
    <body>

        <div class="header">
            <h1>🍌 MoMore Snacks Store</h1>
            <p>សម្រស់ធម្មជាតិ និងរសជាតិឈ្ងុយឆ្ងាញ់ពិតៗពីចេក</p>
        </div>

        <div class="promo-container">
            <div class="promo-card">
                🎁 ប្រូម៉ូសិនពិសេស៖ ទិញ ៥ កញ្ចប់/ប្រអប់ ថែម ១ ភ្លាមៗ!
            </div>
        </div>

        <div class="section-title">ជ្រើសរើសទំនិញកុម្ម៉ង់</div>
        <div class="product-grid">
            <div class="product-card">
                <div class="product-img-box">🍌</div>
                <div class="product-info">
                    <div class="product-title">ដំណាប់ចេកទន់ (កញ្ចប់ធំ)</div>
                    <div class="product-desc">សាច់ទន់ល្មើយ ផ្អែមឆ្ងាញ់ធម្មជាតិ គ្មានសារធាតុគីមី</div>
                    <div class="product-price">$2.00</div>
                </div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateQty('item1', -1)">-</button>
                    <span class="qty-num" id="item1-qty">0</span>
                    <button class="qty-btn" onclick="updateQty('item1', 1)">+</button>
                </div>
            </div>

            <div class="product-card">
                <div class="product-img-box">🍌</div>
                <div class="product-info">
                    <div class="product-title">ដំណាប់ចេកទន់ (កញ្ចប់តូច)</div>
                    <div class="product-desc">ទំហំល្មមញ៉ាំ រសជាតិផ្អែមប្រឡាក់ស្ករធម្មជាតិ</div>
                    <div class="product-price">$1.00</div>
                </div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateQty('item2', -1)">-</button>
                    <span class="qty-num" id="item2-qty">0</span>
                    <button class="qty-btn" onclick="updateQty('item2', 1)">+</button>
                </div>
            </div>

            <div class="product-card">
                <div class="product-img-box">✨</div>
                <div class="product-info">
                    <div class="product-title">ចេកក្រៀមបន្ទះស្តើង (ប្រអប់)</div>
                    <div class="product-desc">បន្ទះស្តើងល្មើយ សម្ងួតស្អាត ស្លាយស្តើងៗ ស្រួយឆ្ងាញ់</div>
                    <div class="product-price">$2.00</div>
                </div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateQty('item3', -1)">-</button>
                    <span class="qty-num" id="item3-qty">0</span>
                    <button class="qty-btn" onclick="updateQty('item3', 1)">+</button>
                </div>
            </div>
        </div>

        <div class="bottom-bar">
            <div>
                <div style="font-size: 12px; color: #6B7280;">តម្លៃសរុប</div>
                <div class="cart-total-price" id="totalCartPrice">$0.00</div>
            </div>
            <button class="btn-checkout" onclick="openCheckout()">បន្តទៅការទូទាត់ ➔</button>
        </div>

        <div id="orderModal" class="modal">
            <div class="modal-content">
                <h3 style="margin-bottom:15px; font-size:16px;">ព័ត៌មានដឹកជញ្ជូន</h3>
                <div class="input-group">
                    <label>លេខទូរស័ព្ទទំនាក់ទំនង *</label>
                    <input type="tel" id="phone" class="input-field" placeholder="ឧទាហរណ៍៖ 012 345 678">
                </div>
                <div class="input-group">
                    <label>ទីតាំងប្រគល់ទំនិញ / ចំណាំ</label>
                    <input type="text" id="note" class="input-field" placeholder="ផ្ទះលេខ, ផ្លូវ, ឬខណ្ឌ...">
                </div>
                <button class="btn-checkout" style="width:100%; border-radius:8px;" onclick="submitOrder()">ទូទាត់ប្រាក់តាម KHQR</button>
                <button onclick="closeModal('orderModal')" style="width:100%; margin-top:8px; background:none; border:none; color:#6B7280; font-size:12px;">បោះបង់</button>
            </div>
        </div>

        <div id="qrModal" class="modal">
            <div class="modal-content">
                <h3 style="font-size:16px; color:#111827;">ស្កែនដើម្បធ្វើការទូទាត់ (KHQR)</h3>
                <p style="font-size:11px; color:#6B7280; margin-top:2px;">ACLEDA / ABA / គ្រប់ធនាគារ</p>
                <img id="qrImage" class="qr-img" src="" alt="KHQR Code">
                <div style="font-weight:700; font-size:15px; color:#111827;">Sorm Sourpunary</div>
                <div style="font-size:12px; color:#6B7280; margin-bottom:15px;">Merchant ID: 15198798</div>
                <button class="btn-checkout" style="width:100%; background:#059669;" onclick="finishOrder()">រួចរាល់ / Done</button>
            </div>
        </div>

        <script>
            let tg = window.Telegram.WebApp;
            tg.expand();

            const products = {
                'item1': { name: 'ដំណាប់ចេកទន់ (កញ្ចប់ធំ)', price: 2.00, qty: 0 },
                'item2': { name: 'ដំណាប់ចេកទន់ (កញ្ចប់តូច)', price: 1.00, qty: 0 },
                'item3': { name: 'ចេកក្រៀមបន្ទះស្តើង (ប្រអប់)', price: 2.00, qty: 0 }
            };

            function updateQty(id, delta) {
                if (products[id].qty + delta >= 0) {
                    products[id].qty += delta;
                    document.getElementById(id + '-qty').innerText = products[id].qty;
                    calculateTotal();
                }
            }

            function calculateTotal() {
                let total = 0;
                for (let key in products) { total += products[key].qty * products[key].price; }
                document.getElementById('totalCartPrice').innerText = '$' + total.toFixed(2);
                return total;
            }

            function openCheckout() {
                if (calculateTotal() <= 0) { alert("សូមជ្រើសរើសទំនិញយ៉ាងហោចណាស់ ១ មុខ!"); return; }
                document.getElementById('orderModal').style.display = 'flex';
            }

            function closeModal(id) { document.getElementById(id).style.display = 'none'; }

            async function submitOrder() {
                let phone = document.getElementById('phone').value;
                let note = document.getElementById('note').value;
                let total = calculateTotal().toFixed(2);
                let user = tg.initDataUnsafe?.user?.first_name || "អតិថិជន";

                if (!phone) { alert("សូមបញ្ចូលលេខទូរស័ព្ទ!"); return; }

                let itemsSummary = [];
                let totalQty = 0;
                for (let key in products) {
                    if (products[key].qty > 0) {
                        itemsSummary.push(products[key].name + " (" + products[key].qty + ")");
                        totalQty += products[key].qty;
                    }
                }

                closeModal('orderModal');

                try {
                    let res = await fetch('/api/order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ product: itemsSummary.join(' + '), quantity: totalQty, totalPrice: total, phone, note, userName: user })
                    });
                    let data = await res.json();
                    if (data.success) {
                        document.getElementById('qrImage').src = data.qrImage;
                        document.getElementById('qrModal').style.display = 'flex';
                    }
                } catch(e) { alert("មានបញ្ហា៖ " + e.message); }
            }

            function finishOrder() { closeModal('qrModal'); tg.close(); }
        </script>
    </body>
    </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

