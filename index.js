<!DOCTYPE html>
<html lang="km">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ម៉ូម៉ឺរ MoMore Snacks - Telegram Mini App</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dangrek&family=Koulen&family=Moul&family=Noto+Sans+Khmer:wght@400;600;700&family=Siemreap&display=swap" rel="stylesheet">
    
    <!-- Telegram WebApp SDK -->
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
    <style>
        :root {
            --primary-green: #3ED660;
            --banana-yellow: #F5D13B;
            --accent-red: #C82323;
            --dark-text: #222222;
            --light-bg: #F4F5F7;
            --white: #FFFFFF;
            
            --font-title: 'Moul', cursive;
            --font-subtitle: 'Dangrek', cursive;
            --font-highlight: 'Koulen', cursive;
            --font-body: 'Siemreap', 'Noto Sans Khmer', sans-serif;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: var(--font-body);
        }

        body {
            background-color: var(--light-bg);
            color: var(--dark-text);
            padding-bottom: 95px;
        }

        /* Header Bar Style */
        header {
            background: linear-gradient(135deg, var(--primary-green), var(--banana-yellow));
            padding: 15px;
            text-align: center;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }

        .header-logo {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            border: 2px solid var(--white);
            object-fit: cover;
        }

        .header-text h1 {
            font-family: var(--font-title);
            font-size: 1.1rem;
            color: #ffffff;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }

        .header-text p {
            font-family: var(--font-subtitle);
            font-size: 0.9rem;
            color: #1e3a00;
        }

        .container {
            padding: 10px;
        }

        /* Banner ប្រូម៉ូសិនពិសេស */
        .promo-banner {
            background: #FFF9E6;
            border: 1.5px dashed var(--banana-yellow);
            border-radius: 12px;
            padding: 10px 15px;
            margin-bottom: 12px;
            text-align: center;
        }

        .promo-banner h4 {
            font-family: var(--font-highlight);
            color: var(--accent-red);
            font-size: 1.05rem;
        }

        .promo-banner p {
            font-size: 0.8rem;
            color: #444;
        }

        /* PINTEREST MASONRY GRID SYSTEM */
        .pinterest-grid {
            column-count: 2;
            column-gap: 10px;
        }

        .pin-card {
            break-inside: avoid;
            background: var(--white);
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            display: inline-block;
            width: 100%;
        }

        .pin-media-img {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Vertical Video Frame Style */
        .pin-media-video {
            position: relative;
            width: 100%;
            padding-top: 177.77%;
            background-color: #000;
        }

        .pin-media-video video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .pin-details {
            padding: 10px;
        }

        .pin-badge {
            background: var(--banana-yellow);
            color: #222;
            font-size: 0.68rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 10px;
            display: inline-block;
            margin-bottom: 5px;
        }

        .pin-title {
            font-size: 0.85rem;
            font-weight: 700;
            color: #222;
            line-height: 1.25;
            margin-bottom: 4px;
        }

        .pin-desc {
            font-size: 0.75rem;
            color: #555;
            line-height: 1.3;
            margin-bottom: 8px;
        }

        .pin-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #f0f0f0;
            padding-top: 6px;
        }

        .pin-price {
            font-family: var(--font-highlight);
            font-size: 1.1rem;
            color: var(--accent-red);
        }

        /* KHQR Payment Section */
        .qr-section {
            background: var(--white);
            border-radius: 16px;
            padding: 15px;
            text-align: center;
            margin-top: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .qr-section h3 {
            font-family: var(--font-subtitle);
            color: #1b5e20;
            margin-bottom: 6px;
        }

        .qr-img {
            width: 180px;
            height: 180px;
            border-radius: 12px;
            border: 2px solid var(--primary-green);
        }

        /* Bottom Fixed Navigation Bar */
        .bottom-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--white);
            padding: 12px 20px;
            box-shadow: 0 -3px 10px rgba(0,0,0,0.1);
            z-index: 100;
        }

        .btn-order {
            background-color: var(--primary-green);
            color: #ffffff;
            font-family: var(--font-highlight);
            font-size: 1.1rem;
            border: none;
            padding: 11px 20px;
            border-radius: 25px;
            width: 100%;
            text-align: center;
            text-decoration: none;
            display: block;
            box-shadow: 0 3px 6px rgba(62, 214, 96, 0.4);
        }
    </style>
</head>
<body>

    <!-- Header ជាមួយ Logo ហាង -->
    <header>
        <img src="https://via.placeholder.com/150" class="header-logo" alt="MoMore Logo">
        <div class="header-text">
            <h1>ម៉ូម៉ឺរ MoMore Snacks</h1>
            <p>ចេកស្អិតដំណាប់ចេកខ្មែរ 📞 067 6789 56</p>
        </div>
    </header>

    <div class="container">

        <!-- Promo Banner -->
        <div class="promo-banner">
            <h4>🎁 ប្រូម៉ូសិនពិសេស៖ ទិញ ៥ ប្រអប់ ថែម ១ ប្រអប់!</h4>
            <p>ផ្ញើជូនបាន ២៥ ខេត្ត-ក្រុង ដោយសុវត្ថិភាព និងលឿនរហ័ស</p>
        </div>
        
        <!-- PINTEREST MASONRY GRID -->
        <div class="pinterest-grid">

            <!-- Card 1: វីដេអូសកម្មភាពផលិត -->
            <div class="pin-card">
                <div class="pin-media-video">
                    <video controls autoplay muted loop playsinline preload="metadata">
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="pin-details">
                    <div class="pin-badge">PROMOTION 5+1</div>
                    <div class="pin-title">🎬 សកម្មភាពផលិតដំណាប់ចេកស្អិត</div>
                    <div class="pin-desc">សម្ងួតអនាម័យខ្ពស់ ៨ម៉ោង ផ្អែមទន់ល្មើយ ធម្មជាតិ ១០០% មិនថែមស្ករ។</div>
                </div>
            </div>

            <!-- Card 2: ចេកស្អិតរយគ្រាប់ធញ្ញជាតិ -->
            <div class="pin-card">
                <img src="https://via.placeholder.com/400x520" class="pin-media-img" alt="ចេកស្អិតគ្រាប់ធញ្ញជាតិ">
                <div class="pin-details">
                    <div class="pin-badge">POPULAR</div>
                    <div class="pin-title">ចេកស្អិតរយគ្រាប់ធញ្ញជាតិ</div>
                    <div class="pin-desc">បន្ទះស្តើងទន់ស្អិត ស្រោបដោយគ្រាប់ល្ពៅ អាល់ម៉ុង និងល្ងស-ខ្មៅ ឈ្ងុយឆ្ងាញ់ខ្លាំង។</div>
                    <div class="pin-bottom">
                        <div class="pin-price">12,000 ៛</div>
                    </div>
                </div>
            </div>

            <!-- Card 3: ដំណាប់ចេកណាំវ៉ាប្រអប់ -->
            <div class="pin-card">
                <img src="https://via.placeholder.com/400x600" class="pin-media-img" alt="ចេកស្អិតប្រអប់">
                <div class="pin-details">
                    <div class="pin-badge">ទិញ ៥ ថែម ១</div>
                    <div class="pin-title">ដំណាប់ចេកណាំវ៉ា (ប្រអប់)</div>
                    <div class="pin-desc">ចេកណាំវ៉ាទុំធម្មជាតិ សម្ងួតទន់ល្មើយ វេចខ្ចប់មានអនាម័យ រក្សាទុកបានយូរ។</div>
                    <div class="pin-bottom">
                        <div class="pin-price">10,000 ៛</div>
                    </div>
                </div>
            </div>

            <!-- Card 4: ចេកស្អិតបន្ទះស្តើង (សន្លឹក) -->
            <div class="pin-card">
                <img src="https://via.placeholder.com/400x480" class="pin-media-img" alt="ចេកស្អិតបន្ទះស្តើង">
                <div class="pin-details">
                    <div class="pin-title">ចេកស្អិតបន្ទះស្តើង</div>
                    <div class="pin-desc">ទន់ស្អិតឆ្ងាញ់ មិនរឹង មិនស្រួយ កិនស្តើងងាយស្រួលញ៉ាំសម្រាប់គ្រប់វ័យ។</div>
                    <div class="pin-bottom">
                        <div class="pin-price">10,000 ៛</div>
                    </div>
                </div>
            </div>

            <!-- Card 5: រូបភាពប្រេន MoMore Brand -->
            <div class="pin-card">
                <img src="https://via.placeholder.com/400x400" class="pin-media-img" alt="MoMore Brand">
                <div class="pin-details">
                    <div class="pin-title">អំពីប្រេន ម៉ូម៉ឺរ (MoMore)</div>
                    <div class="pin-desc">ផលិតផលកែច្នៃចេកខ្មែរពិតៗ សម្បូរថាមពល គ្មានសារធាតុគីមីរក្សាទុកឡើយ។</div>
                </div>
            </div>

        </div>

        <!-- ផ្នែកស្កែនទូទាត់ប្រាក់ ABA KHQR -->
        <div class="qr-section">
            <h3>💳 ស្កែនទូទាត់ប្រាក់ (ABA KHQR)</h3>
            <img src="https://via.placeholder.com/200" class="qr-img" alt="ABA KHQR Code">
            <p style="font-size: 0.8rem; color: #555; margin-top: 5px;">ស្កែនទូទាត់ប្រាក់បានងាយស្រួល និងរហ័ស</p>
        </div>

    </div>

    <!-- ប៊ូតុងទំនាក់ទំនង/ទិញខាងក្រោម -->
    <div class="bottom-bar">
        <a href="https://t.me/NarybrandMiss" class="btn-order">📲 ចុចកម្មង់ទិញតាម Telegram (067 6789 56)</a>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            if (window.Telegram && window.Telegram.WebApp) {
                const tg = window.Telegram.WebApp;
                tg.ready();
                tg.expand();
                if (tg.setHeaderColor) {
                    tg.setHeaderColor('#3ED660');
                }
            }
        });
    </script>
</body>
</html>
