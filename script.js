// ============================================
// 1. DIAGNOSIS FUNCTIONALITY
// ============================================

const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const diagnoseBtn = document.getElementById('diagnoseBtn');
const resultContainer = document.getElementById('resultContainer');

let selectedFile = null;

// Drag & Drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.background = '#d4edd4';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.background = 'white';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.background = 'white';
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});

// File input change
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
});

// Click to upload
uploadArea.addEventListener('click', () => {
    imageInput.click();
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
        diagnoseBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

// Diagnose Button
diagnoseBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    diagnoseBtn.disabled = true;
    diagnoseBtn.textContent = '⏳ Analyzing...';

    // === FAKE DIAGNOSIS (Replace with real API) ===
    setTimeout(() => {
        const diseases = [
            { name: 'Bacterial Blight', confidence: 92, treatment: 'Apply copper-based fungicide. Remove infected leaves.' },
            { name: 'Powdery Mildew', confidence: 78, treatment: 'Spray sulfur or neem oil. Improve air circulation.' },
            { name: 'Healthy', confidence: 95, treatment: 'No treatment needed. Keep doing what you\'re doing!' }
        ];
        const result = diseases[Math.floor(Math.random() * diseases.length)];

        document.getElementById('diseaseName').textContent = result.name;
        document.getElementById('confidence').textContent = result.confidence;
        document.getElementById('treatment').textContent = result.treatment;
        resultContainer.style.display = 'block';

        diagnoseBtn.disabled = false;
        diagnoseBtn.textContent = '🔍 Diagnose';
    }, 2000);
});

// ============================================
// 2. MARKETPLACE FUNCTIONALITY
// ============================================

const products = [
    { id: 1, name: 'Hybrid Tomato Seeds', category: 'seeds', price: '₹250/kg', image: '🍅' },
    { id: 2, name: 'Organic Fertilizer NPK', category: 'fertilizers', price: '₹180/kg', image: '🧪' },
    { id: 3, name: 'Pruning Shears', category: 'tools', price: '₹350', image: '✂️' },
    { id: 4, name: 'Pesticide Spray', category: 'fertilizers', price: '₹220/bottle', image: '🧴' },
    { id: 5, name: 'Wheat Seeds', category: 'seeds', price: '₹300/kg', image: '🌾' },
    { id: 6, name: 'Garden Hoe', category: 'tools', price: '₹450', image: '⛏️' },
];

let cart = [];
let filteredProducts = [...products];

function renderProducts(productList) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = productList.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div style="font-size:3rem;">${p.image}</div>
            <h3>${p.name}</h3>
            <span class="category">${p.category}</span>
            <p class="price">${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    updateCartUI();
    alert(`${product.name} added to cart!`);
}

function updateCartUI() {
    const count = document.getElementById('cartCount');
    const items = document.getElementById('cartItems');
    if (count) count.textContent = cart.length;

    if (items) {
        items.innerHTML = cart.map((p, i) => `
            <li>${p.image} ${p.name} - ${p.price}
                <button onclick="removeFromCart(${i})" style="background:red;color:white;border:none;border-radius:50%;cursor:pointer;">×</button>
            </li>
        `).join('');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Search & Filter
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

if (searchInput && categoryFilter) {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
}

function filterProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    filteredProducts = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search);
        const matchCategory = category === 'all' || p.category === category;
        return matchSearch && matchCategory;
    });
    renderProducts(filteredProducts);
}

// Initial render
renderProducts(products);

// ============================================
// 3. CART TOGGLE
// ============================================

document.querySelector('.cart-icon')?.addEventListener('click', () => {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
});

// ============================================
// 4. AUTH (Placeholder)
// ============================================

document.getElementById('loginBtn')?.addEventListener('click', () => {
    alert('🔐 Login feature coming soon!');
});

document.getElementById('signupBtn')?.addEventListener('click', () => {
    alert('📝 Sign-up feature coming soon!');
});

// ============================================
// 5. CHECKOUT
// ============================================

document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert(`✅ Order placed! Total items: ${cart.length}. Thank you for shopping with AgroCare!`);
    cart = [];
    updateCartUI();
    document.getElementById('cartSidebar').style.display = 'none';
});
