const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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
        body { background-color: #fefce8; color: #451a03; padding: 16px; padding-bottom: 30px; }
        
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
          transition: background 0.2s; 
        }
        .btn-order:active { background: #d97706; }
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
          <button class="btn-order" onclick="orderProduct('ចេកបំពងស្រួយ (កញ្ចប់ធំ)')">កុំម៉ង់</button>
        </div>

        <div class="product-card">
          <div class="product-img">🍌</div>
          <div class="product-info">
            <div class="product-name">ចេកបំពងស្រួយ (កញ្ចប់តូច)</div>
            <div class="product-price">$1.00</div>
          </div>
          <button class="btn-order" onclick="orderProduct('ចេកបំពងស្រួយ (កញ្ចប់តូច)')">កុំម៉ង់</button>
        </div>
      </div>

      <script>
        if (window.Telegram && window.Telegram.WebApp) {
          const tg = window.Telegram.WebApp;
          tg.ready();
          tg.expand();
        }

        function orderProduct(name) {
          alert('បងបានជ្រើសរើស៖ ' + name + '\\nសូមអរគុណ! ក្រុមការងារនឹងទាក់ទងរៀបចំជូន!');
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
