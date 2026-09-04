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
            width: 100%;
            border-radius: 14px;
            overflow: hidden;
            border: 2px solid #ffcc00;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            margin-bottom: 15px;
            background: #000;
        }
        .video-container video {
            width: 100%;
            max-height: 250px;
            object-fit: cover;
            display: block;
        }
        .banner-container {
            background: linear-gradient(135deg, #ff9800, #e65100);
            border: 2px solid #ffcc00;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 20px;
            text-align: left;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }
        .banner-title { font-size: 15px; font-weight: bold; color: #fff; }
        .banner-desc { font-size: 12px; color: #fff8e1; margin-top: 4px; line-height: 1.4; }
        .category-title {
            font-size: 16px;
            font-weight: bold;
            color: #ffcc00;
            text-align: left;
            margin: 18px 0 10px 0;
            border-left: 4px solid #ff9800;
            padding-left: 8px;
        }
        .pinterest-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 20px;
        }
        .product-card {
            background: #ffffff;
            color: #333;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .product-img {
            width: 100%;
            height: 170px;
            object-fit: cover;
            display: block;
            border-bottom: 1px solid #eee;
            background-color: #f0f0f0;
        }
        .product-info { padding: 10px; text-align: left; flex: 1; }
        .product-code { font-size: 10px; font-weight: bold; color: #888; text-transform: uppercase; }
        .product-name { font-size: 13px; font-weight: bold; color: #800000; line-height: 1.3; margin-top: 2px; }
        .product-price { font-size: 13px; font-weight: bold; color: #e53935; margin-top: 4px; }
        .qty-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f5f5f5;
            padding: 8px 10px;
            border-top: 1px solid #eee;
        }
        .btn-qty {
            background: #800000;
            color: #fff;
            border: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }
        .qty-num { font-size: 15px; font-weight: bold; color: #000; }
        
        /* Form Section for Delivery Info */
        .user-info-card {
            background: #fff;
            color: #000;
            border-radius: 14px;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
            border: 2px solid #ffcc00;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .user-info-title {
            font-size: 15px;
            font-weight: bold;
            color: #800000;
            margin-bottom: 12px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 6px;
        }
        .form-group { margin-bottom: 10px; }
        .form-group label { display: block; font-size: 12px; font-weight: bold; color: #444; margin-bottom: 4px; }
        .form-control {
            width: 100%;
            padding: 10px;
            font-size: 13px;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
            background: #f9f9f9;
        }
        .form-control:focus { border-color: #800000; background: #fff; }

        .khqr-card {
            background: #fff;
            color: #000;
            border-radius: 12px;
            padding: 15px;
            margin: 20px 0;
            border: 2px solid #e53935;
        }
        .khqr-header { font-weight: bold; color: #e53935; font-size: 15px; margin-bottom: 6px; }
        .khqr-img { width: 160px; height: auto; border: 1px solid #ccc; border-radius: 8px; margin: 8px 0; }
        
        .checkout-box {
            position: sticky;
            bottom: 10px;
            background: #230000;
            padding: 14px;
            border-radius: 14px;
            border: 2px solid #ffcc00;
            box-shadow: 0 5px 15px rgba(0,0,0,0.6);
            z-index: 100;
        }
        .total-text { font-size: 16px; color: #ffcc00; font-weight: bold; margin-bottom: 4px; }
        .delivery-text { font-size: 12px; color: #ffe082; margin-bottom: 10px; }
        .btn-submit {
            background: #2e7d32;
            color: #fff;
            border: none;
            width: 100%;
            padding: 12px;
            font-size: 15px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="brand-header">
        <div class="brand-title">ម៉ូម៉័រ MOMORE</div>
        <div class="brand-subtitle">ហាងបោះដុំដំណាប់ចេក និងចេកបំពងស្រួយខ្មែរ</div>
    </div>

    <!-- 🎬 Video Banner -->
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

    <!-- SECTION 1: ដំណាប់ចេក (11 មុខ) -->
    <div class="category-title">🍌 ក្រុមដំណាប់ចេក (១១ មុខ)</div>
    <div class="pinterest-grid">
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
        <div class="product-card">
            <img src="d-sesm200.jpg" class="product-img" alt="ដំណាប់ចេក រោយល្ង" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-SESM200</div>
                <div class="product-name">ដំណាប់ចេក រោយល្ង ស/ខ្មៅ (200g)</div>
                <div class="product-price">8,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_SESM200', -1)">-</button>
                <span class="qty-num" id="qty-D_SESM200">0</span>
                <button class="btn-qty" onclick="changeQty('D_SESM200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-almd200.jpg" class="product-img" alt="ដំណាប់ចេក អាល់ម៉ុន" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-ALMD200</div>
                <div class="product-name">ដំណាប់ចេក រោយអាល់ម៉ុន (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_ALMD200', -1)">-</button>
                <span class="qty-num" id="qty-D_ALMD200">0</span>
                <button class="btn-qty" onclick="changeQty('D_ALMD200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-mixg200.jpg" class="product-img" alt="ដំណាប់ចេក ធញ្ញជាតិ" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-MIXG200</div>
                <div class="product-name">ដំណាប់ចេក រោយធញ្ញជាតិគ្រប់មុខ (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_MIXG200', -1)">-</button>
                <span class="qty-num" id="qty-D_MIXG200">0</span>
                <button class="btn-qty" onclick="changeQty('D_MIXG200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-coco200.jpg" class="product-img" alt="ដំណាប់ចេក រោយដូង" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-COCO200</div>
                <div class="product-name">ដំណាប់ចេក រោយដូង (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_COCO200', -1)">-</button>
                <span class="qty-num" id="qty-D_COCO200">0</span>
                <button class="btn-qty" onclick="changeQty('D_COCO200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-ball200.jpg" class="product-img" alt="ដំណាប់ចេកមូល" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-BALL200</div>
                <div class="product-name">ដំណាប់ចេកមូល (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_BALL200', -1)">-</button>
                <span class="qty-num" id="qty-D_BALL200">0</span>
                <button class="btn-qty" onclick="changeQty('D_BALL200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-flat200.jpg" class="product-img" alt="ដំណាប់ចេកបន្ទះ" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-FLAT200</div>
                <div class="product-name">ដំណាប់ចេកបន្ទះ ស្តើងស្រួយ (200g)</div>
                <div class="product-price">8,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_FLAT200', -1)">-</button>
                <span class="qty-num" id="qty-D_FLAT200">0</span>
                <button class="btn-qty" onclick="changeQty('D_FLAT200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-fses200.jpg" class="product-img" alt="ដំណាប់ចេកបន្ទះល្ង" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-FSES200</div>
                <div class="product-name">ដំណាប់ចេកបន្ទះ លាយល្ង (200g)</div>
                <div class="product-price">8,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_FSES200', -1)">-</button>
                <span class="qty-num" id="qty-D_FSES200">0</span>
                <button class="btn-qty" onclick="changeQty('D_FSES200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-rchcs300.jpg" class="product-img" alt="សូកូឡាដូង លាយល្ង" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-RCHCS300</div>
                <div class="product-name">ដំណាប់ចេក ស្នូលសូកូឡាដូង លាយល្ង (300g)</div>
                <div class="product-price">17,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_RCHCS300', -1)">-</button>
                <span class="qty-num" id="qty-D_RCHCS300">0</span>
                <button class="btn-qty" onclick="changeQty('D_RCHCS300', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-rchcc300.jpg" class="product-img" alt="សូកូឡាចន្ទី" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-RCHCC300</div>
                <div class="product-name">ដំណាប់ចេក ស្នូលសូកូឡាចន្ទី (300g)</div>
                <div class="product-price">17,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_RCHCC300', -1)">-</button>
                <span class="qty-num" id="qty-D_RCHCC300">0</span>
                <button class="btn-qty" onclick="changeQty('D_RCHCC300', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="d-rchcd300.jpg" class="product-img" alt="សូកូឡាដូង" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">D-RCHCD300</div>
                <div class="product-name">ដំណាប់ចេក ស្នូលសូកូឡាដូង (300g)</div>
                <div class="product-price">17,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('D_RCHCD300', -1)">-</button>
                <span class="qty-num" id="qty-D_RCHCD300">0</span>
                <button class="btn-qty" onclick="changeQty('D_RCHCD300', 1)">+</button>
            </div>
        </div>
    </div>

    <!-- SECTION 2: ចេកបំពងស្រួយ ម៉ូម័រ (9 មុខ) -->
    <div class="category-title">🍿 ក្រុមចេកបំពងស្រួយ ម៉ូម័រ MoMore (៩ មុខ)</div>
    <div class="pinterest-grid">
        <div class="product-card">
            <img src="c-orig500.jpg" class="product-img" alt="ដើមសាប" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-ORIG500</div>
                <div class="product-name">ចេកបំពង រសជាតិដើមសាប (500g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_ORIG500', -1)">-</button>
                <span class="qty-num" id="qty-C_ORIG500">0</span>
                <button class="btn-qty" onclick="changeQty('C_ORIG500', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="c-choc200.jpg" class="product-img" alt="សូកូឡាដោះគោ 200g" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-CHOC200</div>
                <div class="product-name">ចេកបំពង សូកូឡាដោះគោ (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_CHOC200', -1)">-</button>
                <span class="qty-num" id="qty-C_CHOC200">0</span>
                <button class="btn-qty" onclick="changeQty('C_CHOC200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="c-choc100.jpg" class="product-img" alt="សូកូឡាដោះគោ 100g" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-CHOC100</div>
                <div class="product-name">ចេកបំពង សូកូឡាដោះគោ (100g)</div>
                <div class="product-price">5,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_CHOC100', -1)">-</button>
                <span class="qty-num" id="qty-C_CHOC100">0</span>
                <button class="btn-qty" onclick="changeQty('C_CHOC100', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="c-ches200.jpg" class="product-img" alt="ឈីសដោះគោ 200g" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-CHES200</div>
                <div class="product-name">🧀 រសជាតិ ឈីស ដោះគោ 🥛 (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_CHES200', -1)">-</button>
                <span class="qty-num" id="qty-C_CHES200">0</span>
                <button class="btn-qty" onclick="changeQty('C_CHES200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="c-ches100.jpg" class="product-img" alt="ឈីសដោះគោ 100g" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-CHES100</div>
                <div class="product-name">🧀 រសជាតិ ឈីស ដោះគោ 🥛 (100g)</div>
                <div class="product-price">5,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_CHES100', -1)">-</button>
                <span class="qty-num" id="qty-C_CHES100">0</span>
                <button class="btn-qty" onclick="changeQty('C_CHES100', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="c-spic200.jpg" class="product-img" alt="ម្ទេសខ្ទឹម 200g" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-SPIC200</div>
                <div class="product-name">🌶️ រសជាតិ ម្ទេសខ្ទឹម 🧄 (200g)</div>
                <div class="product-price">14,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_SPIC200', -1)">-</button>
                <span class="qty-num" id="qty-C_SPIC200">0</span>
                <button class="btn-qty" onclick="changeQty('C_SPIC200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="c-spic100.jpg" class="product-img" alt="ម្ទេសខ្ទឹម 100g" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-SPIC100</div>
                <div class="product-name">🌶️ រសជាតិ ម្ទេសខ្ទឹម 🧄 (100g)</div>
                <div class="product-price">5,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_SPIC100', -1)">-</button>
                <span class="qty-num" id="qty-C_SPIC100">0</span>
                <button class="btn-qty" onclick="changeQty('C_SPIC100', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="c-bbq200.jpg" class="product-img" alt="បាប៊ីឃ្យូ 200g" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-BBQ200</div>
                <div class="product-name">🔥 រសជាតិ បាប៊ីឃ្យូ BBQ 🍖 (200g)</div>
                <div class="product-price">10,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_BBQ200', -1)">-</button>
                <span class="qty-num" id="qty-C_BBQ200">0</span>
                <button class="btn-qty" onclick="changeQty('C_BBQ200', 1)">+</button>
            </div>
        </div>
        <div class="product-card">
            <img src="c-bbq100.jpg" class="product-img" alt="បាប៊ីឃ្យូ 100g" onerror="this.src='https://via.placeholder.com/200?text=MoMore'">
            <div class="product-info">
                <div class="product-code">C-BBQ100</div>
                <div class="product-name">🔥 រសជាតិ បាប៊ីឃ្យូ BBQ 🍖 (100g)</div>
                <div class="product-price">5,000 ៛</div>
            </div>
            <div class="qty-box">
                <button class="btn-qty" onclick="changeQty('C_BBQ100', -1)">-</button>
                <span class="qty-num" id="qty-C_BBQ100">0</span>
                <button class="btn-qty" onclick="changeQty('C_BBQ100', 1)">+</button>
            </div>
        </div>
    </div>

    <!-- 📍 Delivery Info Form (បន្ថែមថ្មី) -->
    <div class="user-info-card">
        <div class="user-info-title">📍 ព័ត៌មានដឹកជញ្ជូន និងទំនាក់ទំនង</div>
        <div class="form-group">
            <label for="cust-phone">📱 លេខទូរស័ព្ទទំនាក់ទំនង *</label>
            <input type="tel" id="cust-phone" class="form-control" placeholder="ឧទាហរណ៍៖ 012 345 678" required>
        </div>
        <div class="form-group">
            <label for="cust-address">🏠 អាសយដ្ឋានដឹកជញ្ជូន / ទីតាំង *</label>
            <input type="text" id="cust-address" class="form-control" placeholder="ឧទាហរណ៍៖ ផ្ទះលេខ..., ផ្លូវ..., ខណ្ឌ/ខេត្ត..." required>
        </div>
    </div>

    <!-- KHQR Section -->
    <div class="khqr-card">
        <div class="khqr-header">💳 បារកូដទូទាត់ប្រាក់ KHQR / ABA</div>
        <div style="font-size: 12px; color: #555;">ស្កែនទូទាត់ប្រាក់តាមរយៈ ABA ឬ Bakong KHQR</div>
        <img src="khqr.jpg" class="khqr-img" alt="KHQR Code" onerror="this.src='https://via.placeholder.com/180?text=KHQR'">
        <div style="font-size: 12px; color: #333; font-weight: bold;">ឈ្មោះគណនី: MOMORE SNACKS</div>
    </div>

    <!-- Sticky Bottom Checkout -->
    <div class="checkout-box">
        <div class="total-text">ទំនិញសរុប៖ <span id="total-val">0</span> ៛</div>
        <div class="delivery-text" id="delivery-info">🚚 ថ្លៃដឹកជញ្ជូន៖ 8,000 ៛</div>
        <button class="btn-submit" onclick="submitOrder()">✈️ ផ្ញើការកុម្ម៉ង់ចូល TELEGRAM GROUP</button>
    </div>

    <script>
        const tg = window.Telegram.WebApp;
        tg.expand();

        const products = {
            D_ORIG200: { name: "ដំណាប់ចេក រសជាតិដើម (200g)", price: 8000, qty: 0, size: '200g' },
            D_SESM200: { name: "ដំណាប់ចេក រោយល្ង ស/ខ្មៅ (200g)", price: 8000, qty: 0, size: '200g' },
            D_ALMD200: { name: "ដំណាប់ចេក រោយអាល់ម៉ុន (200g)", price: 10000, qty: 0, size: '200g' },
            D_MIXG200: { name: "ដំណាប់ចេក រោយធញ្ញជាតិ (200g)", price: 10000, qty: 0, size: '200g' },
            D_COCO200: { name: "ដំណាប់ចេក រោយដូង (200g)", price: 10000, qty: 0, size: '200g' },
            D_BALL200: { name: "ដំណាប់ចេកមូល (200g)", price: 10000, qty: 0, size: '200g' },
            D_FLAT200: { name: "ដំណាប់ចេកបន្ទះ ស្តើងស្រួយ (200g)", price: 8000, qty: 0, size: '200g' },
            D_FSES200: { name: "ដំណាប់ចេកបន្ទះ លាយល្ង (200g)", price: 8000, qty: 0, size: '200g' },
            D_RCHCS300: { name: "ដំណាប់ចេក ស្នូលសូកូឡាដូង លាយល្ង (300g)", price: 17000, qty: 0, size: '300g' },
            D_RCHCC300: { name: "ដំណាប់ចេក ស្នូលសូកូឡាចន្ទី (300g)", price: 17000, qty: 0, size: '300g' },
            D_RCHCD300: { name: "ដំណាប់ចេក ស្នូលសូកូឡាដូង (300g)", price: 17000, qty: 0, size: '300g' },
            C_ORIG500: { name: "ចេកបំពង រសជាតិដើមសាប (500g)", price: 10000, qty: 0, size: '500g' },
            C_CHOC200: { name: "ចេកបំពង សូកូឡាដោះគោ (200g)", price: 10000, qty: 0, size: '200g' },
            C_CHOC100: { name: "ចេកបំពង សូកូឡាដោះគោ (100g)", price: 5000, qty: 0, size: '100g' },
            C_CHES200: { name: "ចេកបំពង ឈីស ដោះគោ (200g)", price: 10000, qty: 0, size: '200g' },
            C_CHES100: { name: "ចេកបំពង ឈីស ដោះគោ (100g)", price: 5000, qty: 0, size: '100g' },
            C_SPIC200: { name: "ចេកបំពង ម្ទេសខ្ទឹម (200g)", price: 14000, qty: 0, size: '200g' },
            C_SPIC100: { name: "ចេកបំពង ម្ទេសខ្ទឹម (100g)", price: 5000, qty: 0, size: '100g' },
            C_BBQ200:  { name: "ចេកបំពង បាប៊ីឃ្យូ BBQ (200g)", price: 10000, qty: 0, size: '200g' },
            C_BBQ100:  { name: "ចេកបំពង បាប៊ីឃ្យូ BBQ (100g)", price: 5000, qty: 0, size: '100g' }
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
                if (total200gQty >= 30) promoFreeMsg += " [FREE ដឹក + ថែម 2 កញ្ចប់ 200g]";
                if (total100gQty >= 60) promoFreeMsg += " [FREE ដឹក + ថែម 4 កញ្ចប់ 100g]";
            }

            let grandTotal = totalItemPrice + deliveryFee;

            document.getElementById('total-val').innerText = grandTotal.toLocaleString();
            document.getElementById('delivery-info').innerText = deliveryFee === 0 && totalItemPrice > 0
                ? `🚚 ថ្លៃដឹកជញ្ជូន៖ FREE ឥតគិតថ្លៃ! ${promoFreeMsg}`
                : `🚚 ថ្លៃដឹកជញ្ជូន៖ ${deliveryFee.toLocaleString()} ៛`;

            return { grandTotal, totalItemPrice, deliveryFee, promoFreeMsg };
        }

        function submitOrder() {
            let calc = calculateTotal();
            if (calc.totalItemPrice === 0) {
                alert("សូមជ្រើសរើសចំនួនទំនិញយ៉ាងហោចណាស់ ១ មុខ!");
                return;
            }

            let phone = document.getElementById('cust-phone').value.trim();
            let address = document.getElementById('cust-address').value.trim();

            if (!phone || !address) {
                alert("សូមបំពេញលេខទូរស័ព្ទ និងអាសយដ្ឋានដឹកជញ្ជូន ឱ្យបានរួចរាល់!");
                return;
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

            let msg = `📦 <b>មានការកុម្ម៉ង់បោះដុំថ្មី (MOMORE)!</b>\n\n` +
                      `👤 <b>អ្នកទិញ:</b> ${customerName} (${username})\n` +
                      `📞 <b>លេខទូរស័ព្ទ:</b> ${phone}\n` +
                      `🏠 <b>អាសយដ្ឋាន:</b> ${address}\n\n` +
                      `📝 <b>មុខទំនិញកុម្ម៉ង់:</b>\n${orderText}\n` +
                      `🚚 <b>ថ្លៃដឹក:</b> ${calc.deliveryFee === 0 ? "FREE ឥតគិតថ្លៃ" : calc.deliveryFee.toLocaleString() + " ៛"}\n` +
                      (calc.promoFreeMsg ? `🎁 <b>ប្រូម៉ូសិនថែម:</b> ${calc.promoFreeMsg}\n` : '') +
                      `💰 <b>សរុបទឹកប្រាក់ត្រូវទូទាត់:</b> ${calc.grandTotal.toLocaleString()} ៛\n\n` +
                      `✅ <b>សូម Admin ពិនិត្យ និងរៀបចំអីវ៉ាន់ជូនអតិថិជន!</b>`;

            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: GROUP_ID, text: msg, parse_mode: "HTML" })
            })
            .then(res => res.json())
            .then(data => {
                if(data.ok) {
                    alert("ការកុម្ម៉ង់ត្រូវបានផ្ញើជូន Admin រួចរាល់!");
                    tg.close();
                } else {
                    alert("មានបញ្ហាក្នុងការផ្ញើសារ! សូមពិនិត្យមើល Bot Token ឬ Group ID សារជាថ្មី។");
                }
            })
            .catch(err => alert("Error: " + err));
        }
    </script>
</body>
</html>
