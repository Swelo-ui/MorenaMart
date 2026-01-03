/**
 * MorenaMart - Main JavaScript
 * Handles slider, product rendering, category filtering, and mobile menu
 */

// ==== Mobile Sidebar Menu ====
function openMobileSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('mobileSidebarOverlay');
    const menuBtn = document.getElementById('mobileMenuBtn');

    if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        if (menuBtn) menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('mobileSidebarOverlay');
    const menuBtn = document.getElementById('mobileMenuBtn');

    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Mobile bottom nav active state
function updateMobileNavActive(hash) {
    const navItems = document.querySelectorAll('.mobile-nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === hash || (hash === '' && href === '#home')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ==== Hero Slider ======================== DOM Elements ====================
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const sliderTrack = document.getElementById('sliderTrack');
const sliderDots = document.getElementById('sliderDots');
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');

// ==================== Slider ====================
let currentSlide = 0;
const totalSlides = 3;
let sliderInterval;

function goToSlide(index) {
    currentSlide = index;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;

    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startSlider() {
    sliderInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

// Slider event listeners
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlider();
            prevSlide();
            startSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlider();
            nextSlide();
            startSlider();
        });
    }

    // Dot navigation
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            stopSlider();
            goToSlide(parseInt(dot.dataset.slide));
            startSlider();
        });
    });

    // Start auto slider
    startSlider();
});

// ==================== Header Scroll Effect ====================
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}, { passive: true });

// ==================== Mobile Menu ====================
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');

        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');

        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==================== Render Products ====================
function renderProducts(products, filter = 'all') {
    if (!productsGrid) return;

    let filteredProducts = products;

    if (filter !== 'all') {
        if (filter === 'offers') {
            filteredProducts = products.filter(p => p.mrp > p.price);
        } else {
            filteredProducts = products.filter(p => p.category === filter);
        }
    }

    productsGrid.innerHTML = filteredProducts.map(product => {
        const discount = product.mrp > product.price
            ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
            : 0;

        const quantity = cart ? cart.getQuantity(product.id) : 0;

        let badgeClass = '';
        let badgeText = '';

        if (product.badge === 'bestseller') {
            badgeClass = 'bestseller';
            badgeText = 'Bestseller';
        } else if (product.badge === 'new') {
            badgeClass = 'new';
            badgeText = 'New';
        } else if (product.badge === 'discount' || discount >= 10) {
            badgeClass = 'discount';
            badgeText = `${discount}% OFF`;
        }

        return `
      <div class="product-card" data-product-id="${product.id}">
        ${badgeText ? `<span class="product-badge ${badgeClass}">${badgeText}</span>` : ''}
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <div class="product-category">${getCategoryName(product.category)}</div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-weight">${product.weight}</p>
          <div class="product-footer">
            <div class="product-price-container">
              <span class="product-price">₹${product.price}</span>
              ${product.mrp > product.price ? `<span class="product-mrp">₹${product.mrp}</span>` : ''}
              ${discount > 0 ? `<span class="product-discount">${discount}% off</span>` : ''}
            </div>
            <div class="product-actions">
              ${quantity > 0 ? `
                <div class="quantity-controls">
                  <button class="qty-btn qty-minus" data-product-id="${product.id}" data-action="decrease">−</button>
                  <span class="qty-value">${quantity}</span>
                  <button class="qty-btn qty-plus" data-product-id="${product.id}" data-action="increase">+</button>
                </div>
              ` : `
                <button class="add-to-cart-btn" data-product-id="${product.id}">+</button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
    }).join('');
}

// Event delegation for product cart actions (works better on mobile)
document.addEventListener('click', function (e) {
    // Handle add to cart button
    if (e.target.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        e.stopPropagation();
        const productId = parseInt(e.target.dataset.productId);
        if (productId && typeof addToCart === 'function') {
            addToCart(productId);
        }
        return false;
    }

    // Handle quantity decrease button
    if (e.target.classList.contains('qty-minus') || (e.target.classList.contains('qty-btn') && e.target.dataset.action === 'decrease')) {
        e.preventDefault();
        e.stopPropagation();
        const productId = parseInt(e.target.dataset.productId);
        if (productId && cart) {
            const currentQty = cart.getQuantity(productId);
            cart.updateQuantity(productId, currentQty - 1);
        }
        return false;
    }

    // Handle quantity increase button
    if (e.target.classList.contains('qty-plus') || (e.target.classList.contains('qty-btn') && e.target.dataset.action === 'increase')) {
        e.preventDefault();
        e.stopPropagation();
        const productId = parseInt(e.target.dataset.productId);
        if (productId && cart) {
            const currentQty = cart.getQuantity(productId);
            cart.updateQuantity(productId, currentQty + 1);
        }
        return false;
    }
}, true); // Use capture phase for better mobile handling

// Touch event support for better mobile responsiveness
document.addEventListener('touchend', function (e) {
    const target = e.target;

    // Handle add to cart button touch
    if (target.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        e.stopPropagation();
        const productId = parseInt(target.dataset.productId);
        if (productId && typeof addToCart === 'function') {
            addToCart(productId);
        }
        return false;
    }

    // Handle quantity buttons touch
    if (target.classList.contains('qty-btn')) {
        e.preventDefault();
        e.stopPropagation();
        const productId = parseInt(target.dataset.productId);
        const action = target.dataset.action;
        if (productId && cart) {
            const currentQty = cart.getQuantity(productId);
            if (action === 'decrease') {
                cart.updateQuantity(productId, currentQty - 1);
            } else if (action === 'increase') {
                cart.updateQuantity(productId, currentQty + 1);
            }
        }
        return false;
    }
}, { passive: false, capture: true });

function getCategoryName(category) {
    const names = {
        grocery: 'Grocery & Staples',
        fruits: 'Fruits & Vegetables',
        dairy: 'Dairy Products',
        snacks: 'Snacks & Beverages',
        spices: 'Spices & Masala',
        household: 'Household',
        personal: 'Personal Care'
    };
    return names[category] || category;
}

// ==================== Category Filter ====================
document.addEventListener('DOMContentLoaded', () => {
    // Category navigation links
    document.querySelectorAll('.category-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const category = link.dataset.category;

            // Update active state
            document.querySelectorAll('.category-nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Render filtered products
            renderProducts(PRODUCTS, category);

            // Scroll to products
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Category icon cards
    document.querySelectorAll('.category-icon-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();

            const category = card.dataset.category;

            // Update nav active state
            document.querySelectorAll('.category-nav-link').forEach(l => {
                l.classList.toggle('active', l.dataset.category === category);
            });

            // Render filtered products
            renderProducts(PRODUCTS, category);

            // Scroll to products
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Initial render
    if (typeof PRODUCTS !== 'undefined') {
        renderProducts(PRODUCTS);
    }
});

// ==================== Search Functionality ====================
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            renderProducts(PRODUCTS);
            return;
        }

        const filtered = PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        renderProducts(filtered);

        // Scroll to products if on mobile
        if (window.innerWidth < 768) {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase().trim();

            if (query.length > 0) {
                const filtered = PRODUCTS.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );

                renderProducts(filtered);
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#' || href.length <= 1) return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Deal Cards Click ====================
document.querySelectorAll('.deal-card').forEach(card => {
    card.addEventListener('click', () => {
        document.getElementById('offers-section').scrollIntoView({ behavior: 'smooth' });
    });
});

// ==================== Console Branding ====================
console.log('%c🛒 MorenaMart', 'font-size: 24px; font-weight: bold; color: #2E7D32;');
console.log('%cYour trusted neighborhood grocery store in Morena', 'font-size: 14px; color: #666;');
console.log('%c📞 Order: 6265643703', 'font-size: 12px; color: #25D366;');
