const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ⚠️ ព័ត៌មាន Bot និង Group ID របស់បង
const BOT_TOKEN = '8679348511:AAGjUSodYvD16ig1bftVP7-xPeTWX993yiU'; 
const ADMIN_CHAT_ID = '-1004387546731'; // ⬅️ Group ID របស់បងត្រឹមត្រូវហើយ!

app.use(express.json());

// API ទទួល Order និងបាញ់សារចូល Telegram Group
app.post('/api/order', async (req, res) => {
  const { product, quantity, totalPrice, phone, note, userName } = req.body;
  
  const message = `🚨 **មានការកុម្មង់ថ្មី! (NEW ORDER)**\n\n` +
                  `📦 **ទំនិញ:** ${product}\n` +
                  `🔢 **ចំនួន:** ${quantity} កញ្ចប់\n` +
                  `💵 **ទឹកប្រាក់សរុប:** $${totalPrice}\n` +
                  `📱 **លេខទូរស័ព្ទ:** ${phone}\n` +
                  `👤 **អតិថិជន:** ${userName || 'មិនស្គាល់'}\n` +
                  `📝 **ចំណាំ/ទីតាំង:** ${note || 'គ្មាន'}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    
    if (response.ok) {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: 'Telegram API Error' });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

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
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background-color: #fefce8; color: #451a03; padding: 16px; padding-bottom: 40px; }
        
        .header { 
          background: linear-gradient(135deg, #f59e0b, #d97706); 
          color: white; padding: 20px 16px; border-radius: 18px; text-align: center; margin-bottom: 16px; 
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25); 
        }
        .header h1 { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
        .header p { font-size: 13px; opacity: 0.95; }
        
        .product-list { display: flex; flex-direction: column; gap: 12px; }
        .product-card { 
          background: white; border-radius: 14px; padding: 12px; display: flex; gap: 12px; align-items: center; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04); 
        }
        .product-img { width: 70px; height: 70px; background-color: #fef08a; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 34px; flex-shrink: 0; }
        .product-info { flex-grow: 1; }
        .product-name { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
        .product-price { color: #d97706; font-weight: 800; font-size: 15px; }
        
        .btn-order { background: #f59e0b; color: white; border: none; padding: 8px 14px; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 13px; }

        .modal { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); align-items: center; justify-content: center; padding: 20px; z-index: 1000; }
        .modal.active { display: flex; }
        .modal-content { background: white; border-radius: 16px; padding: 20px; width: 100%; max-width: 360px; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .modal-title { font-size: 16px; font-weight: 800; margin-bottom: 14px; color: #78350f; text-align: center; }
        
        .input-group { margin-bottom: 12px; }
        .input-group label { font-size: 12px; font-weight: 700; color: #451a03; display: block; margin-bottom: 4px; }
        .input-group input { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; }
        
        .qr-box { background: #fff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 12px; text-align: center; margin: 12px 0; }
        .qr-box img { width: 160px; height: 160px; border-radius: 8px; }
        .qr-bank-info { font-size: 12px; font-weight: 700; color: #1e3a8a; margin-top: 6px; }

        .modal-actions { display: flex; gap: 8px; margin-top: 16px; }
        .btn-cancel { background: #e2e8f0; color: #475569; border: none; padding: 10px; border-radius: 8px; font-weight: 700; flex: 1; cursor: pointer; }
        .btn-submit { background: #10b981; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 700; flex: 2; cursor: pointer; }
        
        .btn-done { background: #f59e0b; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 700; width: 100%; cursor: pointer; font-size: 14px; margin-top: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🍌 MOMORE BANANA SNACK 🍌</h1>
        <p>ដំណាប់ចេកខ្មែរ ចេកឆាបបំពងស្រួយឆ្ងាញ់ ច្រើនរសជាតិ</p>
      </div>

      <div class="product-list">
        <div class="product-card">
          <div class="product-img">🍌</div>
          <div class="product-info">
            <div class="product-name">ដំណាប់ចេកខ្មែរ (200g)</div>
            <div class="product-price">10000៛</div>
          </div>
          <button class="btn-order" onclick="openOrderModal('ចេកបំពងស្រួយ (កញ្ចប់ធំ)', 2.00)">កុំម៉ង់</button>
        </div>

        <div class="product-card">
          <div class="product-img">🍌</div>
          <div class="product-info">
            <div class="product-name">ចេកបំពងស្រួយ (100g)</div>
            <div class="product-price">7000៛ </div>
          </div>
          <button class="btn-order" onclick="openOrderModal('ចេកបំពងស្រួយ (កញ្ចប់តូច)', 1.00)">កុំម៉ង់</button>
        </div>
      </div>

      <!-- Modal Ordering & KHQR Payment -->
      <div class="modal" id="orderModal">
        <div class="modal-content">
          <div class="modal-title" id="modalProductName">បញ្ជាទិញទំនិញ</div>
          
          <div class="input-group">
            <label>ចំនួន (កញ្ចប់)៖</label>
            <input type="number" id="orderQty" value="1" min="1" max="50" onchange="updateTotal()">
          </div>

          <div class="input-group">
            <label>លេខទូរស័ព្ទទំនាក់ទំនង៖</label>
            <input type="tel" id="orderPhone" placeholder="012 345 678">
          </div>

          <div class="input-group">
            <label>ទីតាំងប្រគល់ / ចំណាំ៖</label>
            <input type="text" id="orderNote" placeholder="ឧ. ជិតស្តុបបូកគោ">
          </div>

          <!-- KHQR Payment Display -->
          <div class="qr-box">
            <div style="font-size: 13px; font-weight: 700; color: #e11d48; margin-bottom: 6px;">ស្កែនបង់ប្រាក់តាម Bakong / ABA KHQR</div>
            <img id="qrImage" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ABA_BANK_NARY_SNACK" alt="KHQR Code">
            <div class="qr-bank-info">ឈ្មោះគណនី៖ NARY BANANA SNACK</div>
            <div style="font-size: 14px; font-weight: 800; color: #d97706; margin-top: 4px;" id="totalDisplay">សរុប៖ $2.00</div>
          </div>

          <div class="modal-actions">
            <button class="btn-cancel" onclick="closeOrderModal()">បោះបង់</button>
            <button class="btn-submit" onclick="submitOrder()">ខ្ញុំបានវេររួចរាល់ 🚀</button>
          </div>
        </div>
      </div>

      <!-- Modal Success -->
      <div class="modal" id="successModal">
        <div class="modal-content" style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
          <div class="modal-title" style="color: #10b981;">ការកុម្មង់ត្រូវបានបញ្ជូនជោគជ័យ!</div>
          <p style="font-size: 13px; color: #64748b; margin-top: 4px;">អរគុណច្រើនបង! ក្រុមការងារនឹងពិនិត្យ និងទាក់ទងរៀបចំជូនភ្លាមៗ។</p>
          <button class="btn-done" onclick="backToShop()">ត្រឡប់ទៅទំព័រដើម 🛒</button>
        </div>
      </div>

      <script>
        let tg = window.Telegram ? window.Telegram.WebApp : null;
        if (tg) { tg.ready(); tg.expand(); }

        let selectedProduct = { name: '', price: 0 };

        function openOrderModal(name, price) {
          selectedProduct = { name, price };
          document.getElementById('modalProductName').innerText = '🛒 ' + name;
          updateTotal();
          document.getElementById('orderModal').classList.add('active');
        }

        function closeOrderModal() {
          document.getElementById('orderModal').classList.remove('active');
        }

        function backToShop() {
          document.getElementById('successModal').classList.remove('active');
        }

        function updateTotal() {
          const qty = parseInt(document.getElementById('orderQty').value) || 1;
          const total = (selectedProduct.price * qty).toFixed(2);
          document.getElementById('totalDisplay').innerText = 'សរុប៖ $' + total;
        }

        async function submitOrder() {
          const qty = parseInt(document.getElementById('orderQty').value) || 1;
          const phone = document.getElementById('orderPhone').value.trim();
          const note = document.getElementById('orderNote').value.trim();
          const totalPrice = (selectedProduct.price * qty).toFixed(2);
          const userName = tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user.first_name : 'អតិថិជន Telegram';

          if (!phone) {
            alert('សូមបញ្ចូលលេខទូរស័ព្ទទំនាក់ទំនង!');
            return;
          }

          try {
            await fetch('/api/order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                product: selectedProduct.name,
                quantity: qty,
                totalPrice: totalPrice,
                phone: phone,
                note: note,
                userName: userName
              })
            });

            closeOrderModal();
            document.getElementById('successModal').classList.add('active');
          } catch(e) {
            alert('មានបញ្ហាក្នុងការបញ្ជូន! សូមព្យាយាមម្តងទៀត។');
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
