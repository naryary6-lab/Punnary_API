const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
          color: white; 
          padding: 20px 16px; 
          border-radius: 18px; 
          text-align: center; 
          margin-bottom: 16px; 
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25); 
        }
        .header h1 { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
        .header p { font-size: 13px; opacity: 0.95; }
        
        .promo-card { 
          background: #ffffff; 
          border: 2px dashed #f59e0b; 
          border-radius: 14px; 
          padding: 14px 16px; 
          margin-bottom: 20px; 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
        }
        .promo-title { font-weight: 700; font-size: 14px; color: #78350f; }
        .promo-desc { font-size: 12px; color: #6b7280; margin-top: 2px; }
        .promo-badge { 
          background: #ef4444; 
          color: white; 
          padding: 4px 10px; 
          border-radius: 20px; 
          font-size: 11px; 
          font-weight: 700; 
        }
        
        .section-title { font-size: 15px; font-weight: 700; margin-bottom: 12px; color: #78350f; display: flex; align-items: center; gap: 6px; }
        
        .product-list { display: flex; flex-direction: column; gap: 12px; }
        .product-card { 
          background: white; 
          border-radius: 14px; 
          padding: 12px; 
          display: flex; 
          gap: 12px; 
          align-items: center; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.04); 
        }
        .product-img { 
          width: 70px; 
          height: 70px; 
          background-color: #fef08a; 
          border-radius: 12px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 34px; 
          flex-shrink: 0; 
        }
        .product-info { flex-grow: 1; }
        .product-name { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
        .product-price { color: #d97706; font-weight: 800; font-size: 15px; }
        
        .btn-order { 
          background: #f59e0b; 
          color: white; 
          border: none; 
          padding: 8px 14px; 
          border-radius: 10px; 
          font-weight: 700; 
          cursor: pointer; 
          font-size: 13px; 
        }

        /* Modal Popup Order Form */
        .modal {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }
        .modal.active { display: flex; }
        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 20px;
          width: 100%;
          max-width: 360px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .modal-title { font-size: 16px; font-weight: 800; margin-bottom: 14px; color: #78350f; }
        .input-group { margin-bottom: 12px; }
        .input-group label { font-size: 12px; font-weight: 700; color: #451a03; display: block; margin-bottom: 4px; }
        .input-group input {
          width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none;
        }
        .input-group input:focus { border-color: #f59e0b; }
        .modal-actions { display: flex; gap: 8px; margin-top: 16px; }
        .btn-cancel { background: #e2e8f0; color: #475569; border: none; padding: 10px; border-radius: 8px; font-weight: 700; flex: 1; cursor: pointer; }
        .btn-submit { background: #f59e0b; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 700; flex: 2; cursor: pointer; }

        /* Success Popup */
        .success-icon { font-size: 48px; text-align: center; margin-bottom: 10px; }
        .success-details { background: #fef8ee; padding: 12px; border-radius: 10px; font-size: 13px; margin: 12px 0; line-height: 1.6; }
        .btn-close-app { background: #10b981; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 700; width: 100%; cursor: pointer; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🍌 NARY BANANA SNACK 🍌</h1>
        <p>ចេកបំពងស្រួយឆ្ងាញ់ អនាម័យខ្ពស់ រសជាតិដើម</p>
      </div>

      <div class="promo-card">
        <div>
          <div class="promo-title">🎁 សមាជិកថ្មី Telegram</div>
          <div class="promo-desc">ទទួលកាដូ Sample ថែម ១ កញ្ចប់តូចភ្លាមៗ</div>
        </div>
        <span class="promo-badge">PROMO</span>
      </div>

      <div class="section-title">🛒 មុខទំនិញណែនាំ</div>

      <div class="product-list">
        <div class="product-card">
          <div class="product-img">🍌</div>
          <div class="product-info">
            <div class="product-name">ចេកបំពងស្រួយ (កញ្ចប់ធំ)</div>
            <div class="product-price">$2.00</div>
          </div>
          <button class="btn-order" onclick="openOrderModal('ចេកបំពងស្រួយ (កញ្ចប់ធំ)', 2.00)">កុំម៉ង់</button>
        </div>

        <div class="product-card">
          <div class="product-img">🍌</div>
          <div class="product-info">
            <div class="product-name">ចេកបំពងស្រួយ (កញ្ចប់តូច)</div>
            <div class="product-price">$1.00</div>
          </div>
          <button class="btn-order" onclick="openOrderModal('ចេកបំពងស្រួយ (កញ្ចប់តូច)', 1.00)">កុំម៉ង់</button>
        </div>
      </div>

      <!-- Modal Ordering Form -->
      <div class="modal" id="orderModal">
        <div class="modal-content">
          <div class="modal-title" id="modalProductName">បញ្ជាទិញទំនិញ</div>
          
          <div class="input-group">
            <label>ចំនួន (កញ្ចប់)៖</label>
            <input type="number" id="orderQty" value="1" min="1" max="50">
          </div>

          <div class="input-group">
            <label>លេខទូរស័ព្ទទំនាក់ទំនង៖</label>
            <input type="tel" id="orderPhone" placeholder="012 345 678">
          </div>

          <div class="input-group">
            <label>ទីតាំងប្រគល់/ចំណាំផ្សេងៗ៖</label>
            <input type="text" id="orderNote" placeholder="ឧ. ជិតស្តុបបូកគោ / វេរលុយ">
          </div>

          <div class="modal-actions">
            <button class="btn-cancel" onclick="closeOrderModal()">បោះបង់</button>
            <button class="btn-submit" onclick="submitOrder()">បញ្ជូនការកុម្មង់ 🚀</button>
          </div>
        </div>
      </div>

      <!-- Modal Success View -->
      <div class="modal" id="successModal">
        <div class="modal-content" style="text-align: center;">
          <div class="success-icon">🎉</div>
          <div class="modal-title" style="color: #10b981;">ការកុម្មង់បានជោគជ័យ!</div>
          <p style="font-size: 13px; color: #64748b;">ក្រុមការងារនឹងទាក់ទងទៅបងក្នុងពេលឆាប់ៗនេះ!</p>
          
          <div class="success-details" id="successSummary" style="text-align: left;">
            <!-- Summary will be injected here -->
          </div>

          <button class="btn-close-app" onclick="finishOrder()">រួចរាល់ (បិទ)</button>
        </div>
      </div>

      <script>
        let tg = window.Telegram ? window.Telegram.WebApp : null;
        if (tg) {
          tg.ready();
          tg.expand();
        }

        let selectedProduct = { name: '', price: 0 };

        function openOrderModal(name, price) {
          selectedProduct = { name, price };
          document.getElementById('modalProductName').innerText = '🛒 ' + name;
          document.getElementById('orderModal').classList.add('active');
        }

        function closeOrderModal() {
          document.getElementById('orderModal').classList.remove('active');
        }

        function submitOrder() {
          const qty = parseInt(document.getElementById('orderQty').value) || 1;
          const phone = document.getElementById('orderPhone').value.trim();
          const note = document.getElementById('orderNote').value.trim();
          const totalPrice = (selectedProduct.price * qty).toFixed(2);

          if (!phone) {
            alert('សូមបញ្ចូលលេខទូរស័ព្ទទំនាក់ទំនងរបស់បង!');
            return;
          }

          const orderData = {
            product: selectedProduct.name,
            unitPrice: selectedProduct.price,
            quantity: qty,
            totalPrice: totalPrice,
            phone: phone,
            note: note
          };

          if (tg && tg.sendData) {
            try { tg.sendData(JSON.stringify(orderData)); } catch(e){}
          }

          // បង្ហាញផ្ទាំង Success ដោយមិនបិទភ្លាមៗ
          closeOrderModal();
          document.getElementById('successSummary').innerHTML = \`
            <p><strong>ទំនិញ៖</strong> \${selectedProduct.name}</p>
            <p><strong>ចំនួន៖</strong> \${qty} កញ្ចប់</p>
            <p><strong>តម្លៃសរុប៖</strong> $\${totalPrice}</p>
            <p><strong>លេខទូរស័ព្ទ៖</strong> \${phone}</p>
            \${note ? \`<p><strong>ចំណាំ៖</strong> \${note}</p>\` : ''}
          \`;
          document.getElementById('successModal').classList.add('active');
        }

        function finishOrder() {
          if (tg) {
            tg.close();
          } else {
            document.getElementById('successModal').classList.remove('active');
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
