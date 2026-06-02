// ========== Product Data ==========
let allProducts = [];
let currentProducts = [];
let displayedCount = 8;
let productsLoaded = false;

// Sample product data (you can replace with your own)
const sampleProducts = [
    {
        id: 1,
        name: "Premium Crepe Burqa",
        category: "premium",
        price: 2499,
        originalPrice: 3999,
        color: "Black",
        fabric: "Crepe",
        rating: 4.8,
        image: "https://via.placeholder.com/300x400?text=Premium+Crepe+Burqa",
        description: "Luxurious crepe fabric with delicate embroidery"
    },
    {
        id: 2,
        name: "Turkish Net Burqa",
        category: "turkish",
        price: 3299,
        originalPrice: 4999,
        color: "Navy Blue",
        fabric: "Net",
        rating: 4.9,
        image: "https://via.placeholder.com/300x400?text=Turkish+Net+Burqa",
        description: "Ottoman inspired design with premium net work"
    },
    {
        id: 3,
        name: "Hyderabadi Abaya",
        category: "hyderabadi",
        price: 1999,
        originalPrice: 2999,
        color: "Coffee Brown",
        fabric: "Georgette",
        rating: 4.7,
        image: "https://via.placeholder.com/300x400?text=Hyderabadi+Abaya",
        description: "Royal Nizami style with elegant fall"
    },
    {
        id: 4,
        name: "Indonesian Linen Burqa",
        category: "indonesian",
        price: 2799,
        originalPrice: 3999,
        color: "Army Green",
        fabric: "Linen",
        rating: 4.8,
        image: "https://via.placeholder.com/300x400?text=Indonesian+Linen",
        description: "Lightweight breathable linen perfect for summers"
    },
    {
        id: 5,
        name: "Embroidered Premium Abaya",
        category: "premium",
        price: 4499,
        originalPrice: 6999,
        color: "Beige",
        fabric: "Chiffon",
        rating: 5.0,
        image: "https://via.placeholder.com/300x400?text=Embroidered+Abaya",
        description: "Hand-embroidered premium abaya"
    },
    {
        id: 6,
        name: "Classic Black Burqa",
        category: "premium",
        price: 1899,
        originalPrice: 2499,
        color: "Black",
        fabric: "Nida",
        rating: 4.6,
        image: "https://via.placeholder.com/300x400?text=Classic+Black",
        description: "Everyday wear lightweight burqa"
    },
    {
        id: 7,
        name: "Turkish Lace Burqa",
        category: "turkish",
        price: 3999,
        originalPrice: 5999,
        color: "Navy Blue",
        fabric: "Lace",
        rating: 4.9,
        image: "https://via.placeholder.com/300x400?text=Turkish+Lace",
        description: "Intricate lace work from Turkey"
    },
    {
        id: 8,
        name: "Hyderabadi Khada Dupatta",
        category: "hyderabadi",
        price: 3599,
        originalPrice: 5499,
        color: "Coffee Brown",
        fabric: "Silk",
        rating: 4.8,
        image: "https://via.placeholder.com/300x400?text=Khada+Dupatta",
        description: "Traditional Hyderabadi khada dupatta set"
    },
    {
        id: 9,
        name: "Summer Linen Collection",
        category: "indonesian",
        price: 2299,
        originalPrice: 3499,
        color: "Beige",
        fabric: "Linen",
        rating: 4.7,
        image: "https://via.placeholder.com/300x400?text=Summer+Linen",
        description: "Breathable summer special collection"
    },
    {
        id: 10,
        name: "Royal Velvet Abaya",
        category: "premium",
        price: 5999,
        originalPrice: 8999,
        color: "Navy Blue",
        fabric: "Velvet",
        rating: 5.0,
        image: "https://via.placeholder.com/300x400?text=Royal+Velvet",
        description: "Premium velvet abaya for special occasions"
    },
    {
        id: 11,
        name: "Everyday Cotton Burqa",
        category: "premium",
        price: 1499,
        originalPrice: 1999,
        color: "Black",
        fabric: "Cotton",
        rating: 4.5,
        image: "https://via.placeholder.com/300x400?text=Cotton+Burqa",
        description: "Comfortable cotton for daily wear"
    },
    {
        id: 12,
        name: "Turkish Stone Work",
        category: "turkish",
        price: 4599,
        originalPrice: 6999,
        color: "Army Green",
        fabric: "Crepe",
        rating: 4.9,
        image: "https://via.placeholder.com/300x400?text=Turkish+Stone",
        description: "Stone embellished Turkish collection"
    }
];

// ========== Cart Functions ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id == productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id == productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showNotification('Added to cart!', 'success');
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalSpan.textContent = '₹0';
        return;
    }
    
    let total = 0;
    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button onclick="removeFromCart(${item.id})" style="background:#ff4444;">🗑️</button>
                    </div>
                </div>
                <div>₹${itemTotal}</div>
            </div>
        `;
    }).join('');
    cartTotalSpan.textContent = `₹${total}`;
}

function updateQuantity(id, change) {
    const item = cart.find(i => i.id == id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id != id);
        }
        saveCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id != id);
    saveCart();
}

// ========== Render Products ==========
function renderProducts() {
    const grid = document.getElementById('productGrid');
    const productsToShow = currentProducts.slice(0, displayedCount);
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<div class="loading">No products found 😔</div>';
        return;
    }
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${product.category.toUpperCase()}</div>
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.fabric} | ${product.color}</div>
                <h3>${product.name}</h3>
                <div class="product-price">
                    ₹${product.price}
                    <span class="product-original-price">₹${product.originalPrice}</span>
                </div>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))} ${product.rating}
                </div>
            </div>
        </div>
    `).join('');
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = displayedCount >= currentProducts.length ? 'none' : 'block';
    }
}

function loadMore() {
    displayedCount += 8;
    renderProducts();
}

// ========== Filter & Sort Functions ==========
function applyFilters() {
    let filtered = [...allProducts];
    
    // Category filter
    const category = document.getElementById('categoryFilter')?.value || 'all';
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    // Price filter
    const priceRange = document.getElementById('priceFilter')?.value || 'all';
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-');
        if (max) {
            filtered = filtered.filter(p => p.price >= parseInt(min) && p.price <= parseInt(max));
        } else if (priceRange === '5000+') {
            filtered = filtered.filter(p => p.price >= 5000);
        }
    }
    
    // Color filter
    const color = document.getElementById('colorFilter')?.value || 'all';
    if (color !== 'all') {
        filtered = filtered.filter(p => p.color === color);
    }
    
    // Sort
    const sort = document.getElementById('sortFilter')?.value || 'default';
    if (sort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    currentProducts = filtered;
    displayedCount = 8;
    renderProducts();
}

// ========== Search Function ==========
function searchProducts(query) {
    if (!query.trim()) {
        currentProducts = [...allProducts];
    } else {
        currentProducts = allProducts.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.color.toLowerCase().includes(query.toLowerCase()) ||
            p.fabric.toLowerCase().includes(query.toLowerCase())
        );
    }
    displayedCount = 8;
    renderProducts();
}

// ========== Notification ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#25D366' : '#ff4444'};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        z-index: 2000;
        font-weight: 500;
        animation: slideUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    // Load products
    allProducts = sampleProducts;
    currentProducts = [...allProducts];
    renderProducts();
    updateCartCount();
    
    // Event Listeners
    document.getElementById('loadMoreBtn')?.addEventListener('click', loadMore);
    document.getElementById('searchIcon')?.addEventListener('click', () => {
        document.getElementById('searchBar')?.classList.toggle('active');
        document.getElementById('searchInput')?.focus();
    });
    document.getElementById('closeSearch')?.addEventListener('click', () => {
        document.getElementById('searchBar')?.classList.remove('active');
    });
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });
    document.getElementById('cartIcon')?.addEventListener('click', () => {
        document.getElementById('cartSidebar')?.classList.add('open');
    });
    document.getElementById('closeCart')?.addEventListener('click', () => {
        document.getElementById('cartSidebar')?.classList.remove('open');
    });
    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Cart is empty!', 'error');
            return;
        }
        const message = cart.map(item => 
            `${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
        ).join('\n');
        const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        window.open(`https://wa.me/917047158214?text=Hello! I want to order:%0A${encodeURIComponent(message)}%0ATotal: ₹${total}`, '_blank');
    });
    
    // Filters
    ['categoryFilter', 'priceFilter', 'colorFilter', 'sortFilter'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', applyFilters);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50);
        document.getElementById('scrollTop')?.classList.toggle('show', window.scrollY > 300);
    });
    
    // Scroll to top
    document.getElementById('scrollTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Mobile menu
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.getElementById('navLinks')?.classList.toggle('open');
    });
    
    // Newsletter popup
    setTimeout(() => {
        if (!localStorage.getItem('newsletterShown')) {
            document.getElementById('newsletterPopup')?.classList.add('show');
        }
    }, 10000);
    
    document.getElementById('closePopup')?.addEventListener('click', () => {
        document.getElementById('newsletterPopup')?.classList.remove('show');
        localStorage.setItem('newsletterShown', 'true');
    });
    
    // Contact form
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent! We will contact you soon.', 'success');
        e.target.reset();
    });
});
