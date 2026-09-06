const API_ENDPOINT = 'https://punnary-api-1.onrender.com/api/chat';

// បញ្ជីទំនិញទាំងអស់របស់ ម៉ូម័រ MoMore
const products = [
  // ក្រុមដំណាប់ចេក (៩ មុខ)
  { id: 'D-ORIG200', name: 'ដំណាប់ចេក រសជាតិដើម (200g)', price: 10000, cat: 'dried' },
  { id: 'D-SESM200', name: 'ដំណាប់ចេក រោយល្ង ស/ខ្មៅ (200g)', price: 10000, cat: 'dried' },
  { id: 'D-ALMD200', name: 'ដំណាប់ចេក រោយអាល់ម៉ុន (200g)', price: 12000, cat: 'dried' },
  { id: 'D-MIXG200', name: 'ដំណាប់ចេក ធញ្ញជាតិគ្រប់មុខ (200g)', price: 12000, cat: 'dried' },
  { id: 'D-COCO200', name: 'ដំណាប់ចេក រោយដូង (200g)', price: 12000, cat: 'dried' },
  { id: 'D-BALL200', name: 'ដំណាប់ចេកមូល (200g)', price: 10000, cat: 'dried' },
  { id: 'D-RCHCS300', name: 'ដំណាប់ចេក ស្នូលសូកូឡាដូង លាយល្ងសខ្មៅ (300g)', price: 20000, cat: 'dried' },
  { id: 'D-RCHCC300', name: 'ដំណាប់ចេក ស្នូលសូកូឡាចន្ទី (300g)', price: 20000, cat: 'dried' },
  { id: 'D-RCHCD300', name: 'ដំណាប់ចេក ស្នូលសូកូឡាដូង (300g)', price: 20000, cat: 'dried' },

  // ក្រុមចេកបំពងស្រួយ
  { id: 'C-ORIG500', name: 'ចេកបំពង Original (500g)', price: 15000, cat: 'crispy' },
  { id: 'C-CHOC200', name: 'Milk Chocolate (200g ធំ)', price: 14000, cat: 'crispy' },
  { id: 'C-CHOC100', name: 'Milk Chocolate (100g តូច)', price: 7000, cat: 'crispy' },
  { id: 'C-CHES200', name: 'Milk Cheese (200g ធំ)', price: 14000, cat: 'crispy' },
  { id: 'C-CHES100', name: 'Milk Cheese (100g តូច)', price: 7000, cat: 'crispy' },
  { id: 'C-SPIC200', name: 'Spicy Garlic 🧄 (200g ធំ)', price: 14000, cat: 'crispy' },
  { id: 'C-SPIC100', name: 'Spicy Garlic 🧄 (100g តូច)', price: 7000, cat: 'crispy' },
  { id: 'C-BBQ200', name: 'BBQ 🍖 (200g ធំ)', price: 14000, cat: 'crispy' },
  { id: 'C-BBQ100', name: 'BBQ 🍖 (100g តូច)', price: 7000, cat: 'crispy' }
];

let cart = [];

// បង្ហាញផលិតផលលើអេក្រង់
function renderProducts() {
  const driedContainer = document.getElementById('dried-bananas');
  const crispyContainer = document.getElementById('crispy-bananas');

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div>
        <h3>${p.name}</h3>
        <div class="price">${p.price.toLocaleString()}៛</div>
      </div>
      <button class="btn-add" onclick="addToCart('${p.id}')">+ បន្ថែមចូល Cart</button>
    `;

    if (p.cat === 'dried') driedContainer.appendChild(card);
    else crispyContainer.appendChild(card);
  });
}

// មុខងារ Add to Cart
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateTotal();
}

// គណនាតម្លៃសរុប
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-total').innerText = total.toLocaleString() + '៛';
}

// បើក/បិទ ផ្ទាំង Chat
function openChat() {
  document.getElementById('chatModal').style.display = 'flex';
}

function closeChat() {
  document.getElementById('chatModal').style.display = 'none';
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendMessage();
}

// ផ្ញើសារទៅកាន់ AI Gemini លើ Render
async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  const chatBody = document.getElementById('chatBody');
  chatBody.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    chatBody.innerHTML += `<div class="msg ai">${data.reply || 'សុំទោសផងបង មានបញ្ហាបន្តិចបន្តួច!'}</div>`;
  } catch (err) {
    chatBody.innerHTML += `<div class="msg ai">មិនអាចភ្ជាប់ទៅកាន់ AI Server បានទេ។</div>`;
  }
  chatBody.scrollTop = chatBody.scrollHeight;
}

// ដំណើការដំបូង
renderProducts();
