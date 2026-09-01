// ទំព័រ Mini App Frontend - New Modern UI
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="km">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ម៉ូម៉ែ MoMore Snacks Store</title>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Kanten&family=Kantumruy+Pro:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            * { box-sizing: border-box; font-family: 'Kantumruy Pro', sans-serif; margin: 0; padding: 0; }
            body { background-color: #FAFAFA; color: #1F2937; padding-bottom: 90px; }
            
            /* Header Styling */
            .header { background: linear-gradient(135deg, #D97706 0%, #B45309 100%); color: white; padding: 20px 16px; border-radius: 0 0 20px 20px; box-shadow: 0 4px 15px rgba(217, 119, 6, 0.2); }
            .header h1 { font-size: 20px; font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
            .header p { font-size: 12px; opacity: 0.9; }

            /* Promo Badge */
            .promo-container { padding: 12px 16px; }
            .promo-card { background: #FEF3C7; border: 1px dashed #F59E0B; padding: 10px 14px; border-radius: 12px; color: #92400E; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px; }

            /* Product List */
            .section-title { font-size: 15px; font-weight: 700; margin: 10px 16px; color: #374151; }
            .product-grid { padding: 0 16px; display: flex; flex-direction: column; gap: 12px; }
            
            .product-card { background: white; border-radius: 16px; padding: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #F3F4F6; display: flex; gap: 12px; align-items: center; }
            .product-img-box { width: 75px; height: 75px; background: #FFFBEB; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 32px; flex-shrink: 0; }
            .product-info { flex-grow: 1; }
            .product-title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 2px; }
            .product-desc { font-size: 11px; color: #6B7280; margin-bottom: 8px; line-height: 1.3; }
            .product-price { font-size: 16px; font-weight: 700; color: #D97706; }

            /* Quantity Selector */
            .qty-control { display: flex; align-items: center; background: #F3F4F6; border-radius: 8px; padding: 2px; }
            .qty-btn { width: 28px; height: 28px; border: none; background: white; border-radius: 6px; font-weight: bold; font-size: 16px; color: #D97706; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .qty-num { width: 28px; text-align: center; font-size: 13px; font-weight: 700; }

            /* Sticky Bottom Bar */
            .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 12px 16px; box-shadow: 0 -4px 20px rgba(0,0,0,0.08); display: flex; justify-content: space-between; align-items: center; border-radius: 16px 16px 0 0; }
            .cart-total-label { font-size: 12px; color: #6B7280; }
            .cart-total-price { font-size: 18px; font-weight: 700; color: #D97706; }
            .btn-checkout { background: linear-gradient(135deg, #D97706, #B45309); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; cursor: pointer; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3); }

            /* Modal Styling */
            .modal { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); backdrop-filter: blur(4px); justify-content:center; align-items:center; z-index: 999; }
            .modal-content { background:white; padding:20px; border-radius:20px; width:88%; max-width:360px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); animation: popUp 0.2s ease-out; }
            @keyframes popUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

            .input-group { text-align: left; margin-bottom: 12px; }
            .input-group label { font-size: 12px; font-weight: 600; color: #374151; display: block; margin-bottom: 4px; }
            .input-field { width: 100%; padding: 10px 12px; border: 1px solid #D1D5DB; border-radius: 8px; font-size: 13px; outline: none; }
            .input-field:focus { border-color: #D97706; }
            .qr-img { width: 200px; height: 200px; margin: 12px auto; border: 2px solid #FEF3C7; border-radius: 12px; padding: 6px; display: block; }
        </style>
    </head>
    <body>

        <!-- Header -->
        <div class="header">
            <h1>🍌 MoMore Snacks Store</h1>
            <p>សម្រស់ធម្មជាតិ និងរសជាតិឈ្ងុយឆ្ងាញ់ពិតៗពីចេក</p>
        </div>

        <!-- Banner Promotion -->
        <div class="promo-container">
            <div class="promo-card">
                <span>🎁</span>
                <span>ប្រូម៉ូសិនពិសេស៖ ទិញ ៥ កញ្ចប់/ប្រអប់ ថែម ១ ភ្លាមៗ!</span>
            </div>
        </div>

        <!-- Product List -->
        <div class="section-title">ជ្រើសរើសទំនិញកុម្ម៉ង់</div>
        <div class="product-grid">
            
            <!-- Item 1 -->
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

            <!-- Item 2 -->
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

            <!-- Item 3 -->
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

        <!-- Sticky Bottom Bar -->
        <div class="bottom-bar">
            <div>
                <div class="cart-total-label">តម្លៃសរុប</div>
                <div class="cart-total-price" id="totalCartPrice">$0.00</div>
            </div>
            <button class="btn-checkout" onclick="openCheckout()">បន្តទៅការទូទាត់ ➔</button>
        </div>

        <!-- Checkout Form Modal -->
        <div id="orderModal" class="modal">
            <div class="modal-content">
                <h3 style="margin-bottom:15px; font-size:16px; text-align:center;">ព័ត៌មានដឹកជញ្ជូន</h3>
                
                <div class="input-group">
                    <label>លេខទូរស័ព្ទទំនាក់ទំនង *</label>
                    <input type="tel" id="phone" class="input-field" placeholder="ឧទាហរណ៍៖ 012 345 678">
                </div>

                <div class="input-group">
                    <label>ទីតាំងប្រគល់ទំនិញ / ចំណាំ</label>
                    <input type="text" id="note" class="input-field" placeholder="ផ្ទះលេខ, ផ្លូវ, ឬខណ្ឌ...">
                </div>

                <div style="background:#FFFBEB; padding:10px; border-radius:8px; margin-bottom:15px; font-size:13px;">
                    <div>មុខទំនិញ៖ <strong id="summaryItems">-</strong></div>
                    <div style="margin-top:4px;">ទឹកប្រាក់សរុប៖ <strong id="summaryTotal" style="color:#D97706;">$0.00</strong></div>
                </div>

                <button class="btn-checkout" style="width:100%; border-radius:8px;" onclick="submitOrder()">ទូទាត់ប្រាក់តាម KHQR</button>
                <button onclick="closeModal('orderModal')" style="width:100%; margin-top:8px; background:none; border:none; color:#6B7280; font-size:12px; cursor:pointer;">បោះបង់</button>
            </div>
        </div>

        <!-- QR Code Modal -->
        <div id="qrModal" class="modal">
            <div class="modal-content" style="text-align:center;">
                <h3 style="font-size:16px; color:#111827;">ស្កែន KHQR ដើម្បីទូទាត់</h3>
                <p style="font-size:11px; color:#6B7280; margin-top:2px;">គាំទ្រគ្រប់កម្មវិធីធនាគារ (ABA, ACLEDA...)</p>
                
                <img id="qrImage" class="qr-img" src="" alt="KHQR Code">
                
                <div style="font-weight:700; font-size:14px; color:#111827; margin-bottom:4px;">Sorm Sourpunary</div>
                <div style="font-size:12px; color:#6B7280; margin-bottom:15px;">MoMore Snacks Store</div>

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
                for (let key in products) {
                    total += products[key].qty * products[key].price;
                }
                document.getElementById('totalCartPrice').innerText = '$' + total.toFixed(2);
                return total;
            }

            function openCheckout() {
                let total = calculateTotal();
                if (total <= 0) {
                    alert("សូមជ្រើសរើសទំនិញយ៉ាងហោចណាស់ ១ មុខ!");
                    return;
                }

                let itemsSummary = [];
                for (let key in products) {
                    if (products[key].qty > 0) {
                        itemsSummary.push(products[key].name + " x" + products[key].qty);
                    }
                }

                document.getElementById('summaryItems').innerText = itemsSummary.join(', ');
                document.getElementById('summaryTotal').innerText = '$' + total.toFixed(2);
                document.getElementById('orderModal').style.display = 'flex';
            }

            function closeModal(id) {
                document.getElementById(id).style.display = 'none';
            }

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
                        body: JSON.stringify({ 
                            product: itemsSummary.join(' + '), 
                            quantity: totalQty, 
                            totalPrice: total, 
                            phone, 
                            note, 
                            userName: user 
                        })
                    });

                    let data = await res.json();
                    if (data.success && data.qrImage) {
                        document.getElementById('qrImage').src = data.qrImage;
                        document.getElementById('qrModal').style.display = 'flex';
                    } else {
                        alert("មានបញ្ហាក្នុងការបង្កើត QR: " + (data.error || "សូមព្យាយាមម្តងទៀត"));
                    }
                } catch(e) {
                    alert("មានបញ្ហាភ្ជាប់ទៅកាន់ Server: " + e.message);
                }
            }

            function finishOrder() {
                closeModal('qrModal');
                tg.close();
            }
        </script>
    </body>
    </html>
    `);
});
