const express = require('express');
const { BakongKHQR, khqrData } = require('bakong-khqr');
const QRCode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3000;

// ព័ត៌មាន Bot & Telegram Group
const BOT_TOKEN = '8679348511:AAGjUSodYvD16ig1bftVP7-xPeTWX993yiU';
const ADMIN_CHAT_ID = '-1004387546731'; // Group ID របស់បង

app.use(express.json());

// API បង្កើត Dynamic KHQR និងផ្ញើ Order ចូល Telegram Group
app.post('/api/order', async (req, res) => {
    const { product, quantity, totalPrice, phone, note, userName } = req.body;

    try {
        // ១. បង្កើត Dynamic KHQR តាម Bakong Standard
        const optionalData = {
            currency: khqrData.currency.usd,
            amount: parseFloat(totalPrice),
            mobileNumber: phone || "85500000000",
            storeLabel: "Nary Banana Snack",
            terminalLabel: "MiniApp"
        };

        const merchantInfo = {
            bakongAccountId: "15198798@acleda",
            accountInformation: "15198798",
            acquiringBank: "ACLEDA Bank",
            currency: khqrData.currency.usd,
            amount: parseFloat(totalPrice),
            merchantName: "Sorm Sourpunary"
        };

        const khqr = new BakongKHQR();
        const khqrResponse = khqr.generateMerchant(merchantInfo, optionalData);
        
        let qrDataURL = "";
        if (khqrResponse && khqrResponse.data && khqrResponse.data.qr) {
            qrDataURL = await QRCode.toDataURL(khqrResponse.data.qr);
        }

        // ២. ផ្ញើសារជូនដំណឹងចូល Telegram Group
        const message = `🚨 **មានការកុម្ម៉ង់ថ្មី! (NEW ORDER)**\n` +
                        `📦 **ទំនិញ:** ${product}\n` +
                        `🔢 **ចំនួន:** ${quantity} កញ្ចប់/ប្រអប់\n` +
                        `💵 **ទឹកប្រាក់សរុប:** $${totalPrice}\n` +
                        `📱 **លេខទូរស័ព្ទ:** ${phone}\n` +
                        `👤 **អតិថិជន:** ${userName || 'មិនស្គាល់'}\n` +
                        `📝 **ចំណាំ/ទីតាំង:** ${note || 'គ្មាន'}`;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        res.json({ success: true, qrImage: qrDataURL, md5: khqrResponse?.data?.md5 });
    } catch (error) {
        console.error('Error handling order:', error);
        res.json({ success: false, error: error.message });
    }
});

// ទំព័រ Mini App Frontend
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="km">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nary Banana Snack</title>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <style>
            body { font-family: 'Kantumruy Pro', sans-serif; background: #fffdf5; padding: 15px; margin: 0; color: #333; }
            .header { text-align: center; background: #e67e22; color: white; padding: 15px; border-radius: 12px; font-weight: bold; margin-bottom: 15px; }
            .promo-banner { background: #d35400; color: white; text-align: center; padding: 8px; border-radius: 8px; font-size: 13px; margin-bottom: 15px; }
            .card { background: white; border-radius: 12px; padding: 15px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; justify-content: space-between; align-items: center; }
            .price { color: #d35400; font-weight: bold; font-size: 16px; }
            .btn { background: #f39c12; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; }
            .modal { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); justify-content:center; align-items:center; }
            .modal-content { background:white; padding:20px; border-radius:15px; text-align:center; width:85%; max-width:350px; }
            input { width: 90%; padding: 10px; margin: 8px 0; border: 1px solid #ccc; border-radius: 6px; }
            .qr-img { width: 220px; height: 220px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="header">🍌 Nary Banana Snack</div>
        <div class="promo-banner">🎁 ពិសេស! ទិញ ៥ ប្រអប់ ថែម ១ ប្រអប់ ភ្លាមៗ!</div>

        <div class="card">
            <div>
                <strong>ដំណាប់ចេកទន់ (កញ្ចប់ធំ)</strong>
                <div class="price">$2.00</div>
            </div>
            <button class="btn" onclick="openOrder('ដំណាប់ចេកទន់ (កញ្ចប់ធំ)', 2.00)">កុម្ម៉ង់</button>
        </div>

        <div class="card">
            <div>
                <strong>ដំណាប់ចេកទន់ (កញ្ចប់តូច)</strong>
                <div class="price">$1.00</div>
            </div>
            <button class="btn" onclick="openOrder('ដំណាប់ចេកទន់ (កញ្ចប់តូច)', 1.00)">កុម្ម៉ង់</button>
        </div>

        <div class="card">
            <div>
                <strong>ចេកក្រៀមបន្ទះស្តើង (ប្រអប់)</strong>
                <div class="price">$2.00</div>
            </div>
            <button class="btn" onclick="openOrder('ចេកក្រៀមបន្ទះស្តើង (ប្រអប់)', 2.00)">កុម្ម៉ង់</button>
        </div>

        <!-- Form Order Modal -->
        <div id="orderModal" class="modal">
            <div class="modal-content">
                <h3 id="itemTitle">កុម្ម៉ង់ទំនិញ</h3>
                <input type="number" id="qty" value="1" min="1" placeholder="ចំនួន" onchange="calcTotal()">
                <input type="text" id="phone" placeholder="លេខទូរស័ព្ទទំនាក់ទំនង">
                <input type="text" id="note" placeholder="ទីតាំង ឬចំណាំបន្ថែម">
                <p>សរុប៖ <strong id="totalPrice" style="color:#d35400;">$0.00</strong></p>
                <button class="btn" onclick="submitOrder()" style="width:100%; padding:12px;">ទូទាត់ប្រាក់ (KHQR)</button>
                <button onclick="closeModal()" style="margin-top:10px; background:none; border:none; color:gray;">បោះបង់</button>
            </div>
        </div>

        <!-- QR Display Modal -->
        <div id="qrModal" class="modal">
            <div class="modal-content">
                <h3>ស្កែនដើម្បីទូទាត់ (KHQR)</h3>
                <p style="font-size:12px; color:gray;">ACLEDA / ABA / គ្រប់ធនាគារ</p>
                <img id="qrImage" class="qr-img" src="" alt="KHQR Code">
                <p><strong>Sorm Sourpunary</strong></p>
                <button class="btn" onclick="finishOrder()" style="width:100%; background:#27ae60;">រួចរាល់ / Done</button>
            </div>
        </div>

        <script>
            let tg = window.Telegram.WebApp;
            tg.expand();
            let selectedItem = '';
            let itemPrice = 0;

            function openOrder(item, price) {
                selectedItem = item;
                itemPrice = price;
                document.getElementById('itemTitle').innerText = item;
                document.getElementById('qty').value = 1;
                calcTotal();
                document.getElementById('orderModal').style.display = 'flex';
            }

            function calcTotal() {
                let qty = document.getElementById('qty').value || 1;
                document.getElementById('totalPrice').innerText = '$' + (qty * itemPrice).toFixed(2);
            }

            function closeModal() {
                document.getElementById('orderModal').style.display = 'none';
            }

            async function submitOrder() {
                let qty = document.getElementById('qty').value;
                let phone = document.getElementById('phone').value;
                let note = document.getElementById('note').value;
                let total = (qty * itemPrice).toFixed(2);
                let user = tg.initDataUnsafe?.user?.first_name || "អតិថិជន";

                if (!phone) { alert("សូមបញ្ចូលលេខទូរស័ព្ទ!"); return; }

                document.getElementById('orderModal').style.display = 'none';

                let res = await fetch('/api/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ product: selectedItem, quantity: qty, totalPrice: total, phone, note, userName: user })
                });

                let data = await res.json();
                if (data.success && data.qrImage) {
                    document.getElementById('qrImage').src = data.qrImage;
                    document.getElementById('qrModal').style.display = 'flex';
                } else {
                    alert("មានបញ្ហាក្នុងការបង្កើត QR សូមព្យាយាមម្តងទៀត");
                }
            }

            function finishOrder() {
                document.getElementById('qrModal').style.display = 'none';
                tg.close();
            }
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
