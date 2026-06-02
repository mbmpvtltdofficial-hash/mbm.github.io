// ========== PRODUCT DATABASE ==========
// 🔴 আপনার ছবির লিংক এখানে বসান 🔴
// ছবি আপলোড করতে: https://imgbb.com এ আপলোড করুন → Direct Link কপি করুন

const products = [
    {
        id: 1,
        name: "Premium Crepe Embroidered Burqa",
        category: "premium",
        price: 2499,
        originalPrice: 4999,
        discount: 50,
        rating: 4.8,
        reviews: 1245,
        sizes: ["S", "M", "L", "XL"],
        color: "Black",
        fabric: "Premium Crepe",
        description: "Luxurious crepe fabric with intricate hand embroidery. Perfect for special occasions and daily wear.",
        image: "https://i.postimg.cc/ZK4hNp6T/crepe-burqa.jpg",
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Turkish Net Designer Burqa",
        category: "turkish",
        price: 3299,
        originalPrice: 6499,
        discount: 49,
        rating: 4.9,
        reviews: 2341,
        sizes: ["M", "L", "XL"],
        color: "Navy Blue",
        fabric: "Turkish Net",
        description: "Ottoman inspired net work burqa with delicate stone embellishments.",
        image: "https://i.postimg.cc/ydvq0r6R/turkish-net.jpg",
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "Hyderabadi Khada Dupatta Abaya",
        category: "hyderabadi",
        price: 3599,
        originalPrice: 6999,
        discount: 48,
        rating: 4.7,
        reviews: 892,
        sizes: ["S", "M", "L", "XL"],
        color: "Coffee Brown",
        fabric: "Silk Blend",
        description: "Traditional Hyderabadi style with khada dupatta. Royal Nizami collection.",
        image: "https://i.postimg.cc/DZ0JfP7H/hyderabadi.jpg",
        inStock: true,
        featured: true
    },
    {
        id: 4,
        name: "Indonesian Linen Summer Burqa",
        category: "indonesian",
        price: 1899,
        originalPrice: 3499,
        discount: 46,
        rating: 4.6,
        reviews: 567,
        sizes: ["S", "M", "L", "XL", "XXL"],
        color: "Army Green",
        fabric: "Pure Linen",
        description: "Lightweight breathable linen perfect for summers. Anti-crease and comfortable.",
        image: "https://i.postimg.cc/KzNHF1Yj/indonesian-linen.jpg",
        inStock: true,
        featured: true
    },
    {
        id: 5,
        name: "Gold Zari Embroidered Abaya",
        category: "premium",
        price: 4999,
        originalPrice: 9999,
        discount: 50,
        rating: 5.0,
        reviews: 312,
        sizes: ["M", "L", "XL"],
        color: "Gold",
        fabric: "Chiffon",
        description: "Luxury abaya with real gold zari work. Perfect for weddings and Eid.",
        image: "https://i.postimg.cc/QCvVkPp6/gold-abaya.jpg",
        inStock: true,
        featured: true
    },
    {
        id: 6,
        name: "Classic Cotton Everyday Burqa",
        category: "premium",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        rating: 4.5,
        reviews: 3456,
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        color: "Black",
        fabric: "Cotton",
        description: "Comfortable cotton burqa for everyday wear. Lightweight and breathable.",
        image: "https://i.postimg.cc/5yGN9tKx/cotton-burqa.jpg",
        inStock: true,
        featured: true
    },
    {
        id: 7,
        name: "Turkish Lace Stone Work Burqa",
        category: "turkish",
        price: 4599,
        originalPrice: 8999,
        discount: 49,
        rating: 4.8,
        reviews: 789,
        sizes: ["M", "L"],
        color: "Burgundy",
        fabric: "Lace",
        description: "Exquisite Turkish lace with stone work. Premium party wear collection.",
        image: "https://i.postimg.cc/pVw8qVzX/turkish-lace.jpg",
        inStock: true,
        featured: true
    },
    {
        id: 8,
        name: "Royal Velvet Nizami Abaya",
        category: "hyderabadi",
        price: 5999,
        originalPrice: 11999,
        discount: 50,
        rating: 4.9,
        reviews: 234,
        sizes: ["M", "L", "XL"],
        color: "Royal Blue",
        fabric: "Velvet",
        description: "Royal velvet abaya with heavy zari work. Special occasion wear.",
        image: "https://i.postimg.cc/RhqM96XK/velvet-abaya.jpg",
        inStock: true,
        featured: false
    }
];

// Default image if product image not available
const DEFAULT_IMAGE = "https://placehold.co/400x400/2874f0/white?text=Borka+Museum";

// ========== GLOBAL VARIABLES ==========
let cart = JSON.parse(localStorage.getItem('flipkart_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('flipkart_wishlist')) || [];
let currentCategory = 'all';
let currentSearch = '';
let currentPage = 1;
const productsPerPage = 8;
let currentProduct = null;
let selectedSize = null;

// ========== UTILITY FUNCTIONS ==========
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.backgroundColor = type === 'success' ? '#388e3c' : '#ff3e6c';
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// ========== CART FUNCTIONS ==========
function saveCart() {
    localStorage.setItem('flipkart_cart', JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = count;
}

function addToCart(product, quantity = 1, size = null) {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            size: size || product.sizes[0],
            originalPrice: product.originalPrice
        });
    }
    
    saveCart();
    showToast('Item added to cart!');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    showToast('Item removed from cart');
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart();
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const subtotalSpan = document.getElementById('cartSubtotal');
    const savingsSpan = document.getElementById('cartSavings');
    const totalSpan = document.getElementById('cartTotal');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart" style="text-align: center; padding: 40px;">
                <i class="fas fa-shopping-cart" style="font-size: 60px; color: #ccc; margin-bottom: 20px;"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 12px; color: #878787;">Add items to get started</p>
            </div>
        `;
        if (subtotalSpan) subtotalSpan.textContent = '₹0';
        if (savingsSpan) savingsSpan.textContent = '₹0';
        if (totalSpan) totalSpan.textContent = '₹0';
        return;
    }
    
    let subtotal = 0;
    let savings = 0;
    
    cartContainer.innerHTML = cart.map(item => {
        const itemSubtotal = item.price * item.quantity;
        const itemOriginalTotal = (item.originalPrice || item.price) * item.quantity;
        const itemSavings = itemOriginalTotal - itemSubtotal;
        subtotal += itemSubtotal;
        savings += itemSavings;
        
        return `
            <div class="cart-item">
                <img class="cart-item-img" src="${item.image || DEFAULT_IMAGE}" onerror="this.src='${DEFAULT_IMAGE}'" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                    ${item.size ? `<div style="font-size: 11px; color: #878787;">Size: ${item.size}</div>` : ''}
                </div>
                <div class="cart-item-price">${formatPrice(itemSubtotal)}</div>
            </div>
        `;
    }).join('');
    
    const total = subtotal;
    
    if (subtotalSpan) subtotalSpan.textContent = formatPrice(subtotal);
    if (savingsSpan) savingsSpan.textContent = formatPrice(savings);
    if (totalSpan) totalSpan.textContent = formatPrice(total);
}

// ========== WISHLIST FUNCTIONS ==========
function saveWishlist() {
    localStorage.setItem('flipkart_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    renderProducts();
    renderWishlist();
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlistBadge');
    if (badge) badge.textContent = wishlist.length;
}

function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast('Removed from wishlist');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist!');
    }
    saveWishlist();
}

function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlistItems');
    if (!wishlistContainer) return;
    
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));
    
    if (wishlistProducts.length === 0) {
        wishlistContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="far fa-heart" style="font-size: 50px; color: #ccc;"></i>
                <p>Your wishlist is empty</p>
            </div>
        `;
        return;
    }
    
    wishlistContainer.innerHTML = wishlistProducts.map(product => `
        <div class="wishlist-item">
            <img class="wishlist-item-img" src="${product.image || DEFAULT_IMAGE}" onerror="this.src='${DEFAULT_IMAGE}'">
            <div class="wishlist-item-info">
                <div style="font-weight: 500;">${product.name}</div>
                <div>${formatPrice(product.price)}</div>
                <button class="add-cart-btn" style="margin-top: 8px; padding: 6px 12px; font-size: 12px;" onclick="addToCart(products.find(p=>p.id===${product.id}),1); closeWishlist();">Move to Cart</button>
            </div>
            <i class="fas fa-trash" style="color: #ff3e6c; cursor: pointer;" onclick="toggleWishlist(${product.id})"></i>
        </div>
    `).join('');
}

// ========== RENDER PRODUCTS ==========
function getFilteredProducts() {
    let filtered = [...products];
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    if (currentSearch) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            p.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
            p.fabric.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    
    return filtered;
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    
    const filtered = getFilteredProducts();
    const start = 0;
    const end = currentPage * productsPerPage;
    const productsToShow = filtered.slice(start, end);
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 60px; grid-column: 1/-1;">
                <i class="fas fa-search" style="font-size: 50px; color: #ccc; margin-bottom: 15px;"></i>
                <p>No products found</p>
                <p style="font-size: 12px; color: #878787;">Try a different search term</p>
            </div>
        `;
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="openProductDetail(${product.id})">
            <div class="wishlist-icon ${wishlist.includes(product.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                <i class="fa-${wishlist.includes(product.id) ? 'solid' : 'regular'} fa-heart"></i>
            </div>
            <div class="product-image">
                <img src="${product.image || DEFAULT_IMAGE}" onerror="this.src='${DEFAULT_IMAGE}'" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="price-row">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    <span class="discount">${product.discount}% off</span>
                </div>
                <div class="rating">
                    <span class="rating-badge">${product.rating} <i class="fas fa-star"></i></span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
            </div>
        </div>
    `).join('');
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = productsToShow.length >= filtered.length ? 'none' : 'flex';
    }
}

function loadMoreProducts() {
    currentPage++;
    renderProducts();
}

// ========== PRODUCT DETAIL MODAL ==========
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentProduct = product;
    selectedSize = product.sizes[0];
    
    const modal = document.getElementById('productModal');
    const content = document.getElementById('productDetailContent');
    
    content.innerHTML = `
        <div class="detail-container">
            <div class="detail-images">
                <img class="detail-main-img" src="${product.image || DEFAULT_IMAGE}" onerror="this.src='${DEFAULT_IMAGE}'" alt="${product.name}">
            </div>
            <h2 class="detail-title">${product.name}</h2>
            <div class="detail-price-section">
                <span class="detail-current-price">${formatPrice(product.price)}</span>
                <span class="detail-original-price">${formatPrice(product.originalPrice)}</span>
                <span class="detail-discount">${product.discount}% off</span>
            </div>
            <div class="detail-rating">
                <span class="rating-badge">${product.rating} <i class="fas fa-star"></i></span>
                <span>${product.reviews} Ratings & Reviews</span>
            </div>
            <div class="size-section">
                <div class="size-title">Select Size</div>
                <div class="size-buttons" id="sizeButtons">
                    ${product.sizes.map(size => `
                        <button class="size-btn ${size === selectedSize ? 'selected' : ''}" onclick="selectDetailSize('${size}')">${size}</button>
                    `).join('')}
                </div>
            </div>
            <div class="offers-section">
                <div class="offer-item"><i class="fas fa-tag"></i> Bank Offer: 10% off on SBI Credit Cards</div>
                <div class="offer-item"><i class="fas fa-truck"></i> Free Shipping on orders above ₹2999</div>
                <div class="offer-item"><i class="fas fa-exchange-alt"></i> 7 Days Easy Returns</div>
            </div>
            <div class="detail-actions">
                <button class="add-cart-btn" onclick="addToCartFromDetail()"><i class="fas fa-shopping-cart"></i> ADD TO CART</button>
                <button class="buy-now-btn" onclick="buyNowFromDetail()"><i class="fas fa-bolt"></i> BUY NOW</button>
            </div>
            <div class="product-description">
                <h4>Product Description</h4>
                <p style="font-size: 13px; color: #666; line-height: 1.5;">${product.description}</p>
                <p style="margin-top: 10px; font-size: 12px;"><strong>Fabric:</strong> ${product.fabric} | <strong>Color:</strong> ${product.color}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function selectDetailSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === size) btn.classList.add('selected');
    });
}

function addToCartFromDetail() {
    addToCart(currentProduct, 1, selectedSize);
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function buyNowFromDetail() {
    addToCart(currentProduct, 1, selectedSize);
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('cartSidebar').classList.add('open');
}

// ========== CHECKOUT FUNCTIONS ==========
let checkoutTotal = 0;

function openCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    checkoutTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const orderSummary = document.getElementById('orderSummary');
    orderSummary.innerHTML = `
        <h4 style="margin-bottom: 10px;">Order Summary</h4>
        ${cart.map(item => `
            <div class="order-item">
                <span>${item.name} x${item.quantity}</span>
                <span>${formatPrice(item.price * item.quantity)}</span>
            </div>
        `).join('')}
        <div class="order-item" style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd; font-weight: 600;">
            <span>Total</span>
            <span>${formatPrice(checkoutTotal)}</span>
        </div>
    `;
    
    document.getElementById('checkoutTotalAmount').textContent = formatPrice(checkoutTotal);
    document.getElementById('checkoutModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

function confirmOrder() {
    const selectedMethod = document.querySelector('.payment-option.selected');
    const method = selectedMethod ? selectedMethod.dataset.method : 'upi';
    
    let orderMessage = `🛍️ *NEW ORDER - Modern Borka Museum* 🛍️\n\n`;
    orderMessage += `*Order Details:*\n`;
    cart.forEach(item => {
        orderMessage += `• ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });
    orderMessage += `\n*Total: ${formatPrice(checkoutTotal)}*\n`;
    orderMessage += `*Payment Method: ${method.toUpperCase()}*\n`;
    orderMessage += `*Order Date: ${new Date().toLocaleString()}*\n\n`;
    orderMessage += `Thank you for shopping at Modern Borka Museum! 🕌\n`;
    orderMessage += `For any queries, contact: +91 7047158214`;
    
    window.open(`https://wa.me/917047158214?text=${encodeURIComponent(orderMessage)}`, '_blank');
    
    cart = [];
    saveCart();
    closeCheckout();
    document.getElementById('cartSidebar').classList.remove('close');
    showToast('Order placed successfully! We will contact you shortly.');
}

// ========== BANNER SLIDER ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const dotsContainer = document.getElementById('sliderDots');

function initSlider() {
    if (!slides.length) return;
    
    const slider = document.getElementById('bannerSlider');
    const totalSlides = slides.length;
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    document.getElementById('nextSlide')?.addEventListener('click', nextSlide);
    document.getElementById('prevSlide')?.addEventListener('click', prevSlide);
    
    setInterval(nextSlide, 5000);
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    renderWishlist();
    updateCartBadge();
    updateWishlistBadge();
    initSlider();
    
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        currentPage = 1;
        renderProducts();
    });
    
    // Category filter
    document.querySelectorAll('.category-item').forEach(cat => {
        cat.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            currentCategory = cat.dataset.category;
            currentPage = 1;
            renderProducts();
        });
    });
    
    // Load more
    document.getElementById('loadMoreBtn')?.addEventListener('click', loadMoreProducts);
    
    // Cart sidebar
    document.getElementById('cartBtn')?.addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.add('open');
    });
    document.getElementById('closeCart')?.addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
    });
    
    // Wishlist sidebar
    document.getElementById('wishlistBtn')?.addEventListener('click', () => {
        renderWishlist();
        document.getElementById('wishlistSidebar').classList.add('open');
    });
    document.getElementById('closeWishlist')?.addEventListener('click', () => {
        document.getElementById('wishlistSidebar').classList.remove('open');
    });
    
    // Modal close
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        document.getElementById('productModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('productModal')) {
            document.getElementById('productModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Checkout
    document.getElementById('checkoutBtn')?.addEventListener('click', openCheckout);
    document.getElementById('closeCheckout')?.addEventListener('click', closeCheckout);
    document.getElementById('confirmOrderBtn')?.addEventListener('click', confirmOrder);
    
    // Payment method selection
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            const method = this.dataset.method;
            const paymentDetails = document.getElementById('paymentDetails');
            if (method === 'upi') {
                paymentDetails.innerHTML = `
                    <div class="upi-details">
                        <p class="upi-label">Scan to Pay</p>
                        <div class="qr-container">
                            <img id="qrCodeImg" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=modernborka@oksbi" alt="UPI QR Code">
                        </div>
                        <p class="upi-id-text"><strong>UPI ID:</strong> modernborka@oksbi</p>
                    </div>
                `;
            } else if (method === 'card') {
                paymentDetails.innerHTML = `
                    <div style="padding: 15px;">
                        <input type="text" placeholder="Card Number" style="width: 100%; padding: 12px; margin: 5px 0; border: 1px solid #ddd; border-radius: 8px;">
                        <div style="display: flex; gap: 10px;">
                            <input type="text" placeholder="MM/YY" style="flex:1; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
                            <input type="text" placeholder="CVV" style="flex:1; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
                        </div>
                        <input type="text" placeholder="Cardholder Name" style="width: 100%; padding: 12px; margin: 5px 0; border: 1px solid #ddd; border-radius: 8px;">
                    </div>
                `;
            } else {
                paymentDetails.innerHTML = `
                    <div style="padding: 15px; text-align: center;">
                        <p>Pay when you receive the product</p>
                        <p style="font-size: 12px; color: #666;">Cash on Delivery available</p>
                    </div>
                `;
            }
        });
    });
});
