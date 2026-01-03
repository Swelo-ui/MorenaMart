/**
 * MorenaMart - Cart System
 * Complete shopping cart with coupon, checkout, and WhatsApp order
 */

class Cart {
    constructor() {
        this.items = [];
        this.appliedCoupon = null;
        this.discount = 0;
        this.load();
    }

    // Load cart from localStorage
    load() {
        const savedCart = localStorage.getItem('morenamart_cart');
        const savedCoupon = localStorage.getItem('morenamart_coupon');

        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
            } catch (e) {
                this.items = [];
            }
        }

        if (savedCoupon) {
            try {
                const couponData = JSON.parse(savedCoupon);
                this.appliedCoupon = couponData.code;
                this.discount = couponData.discount;
            } catch (e) {
                this.appliedCoupon = null;
                this.discount = 0;
            }
        }
    }

    // Save cart to localStorage
    save() {
        localStorage.setItem('morenamart_cart', JSON.stringify(this.items));
        if (this.appliedCoupon) {
            localStorage.setItem('morenamart_coupon', JSON.stringify({
                code: this.appliedCoupon,
                discount: this.discount
            }));
        } else {
            localStorage.removeItem('morenamart_coupon');
        }
    }

    // Add item to cart
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                weight: product.weight,
                price: product.price,
                mrp: product.mrp,
                image: product.image,
                quantity: quantity
            });
        }

        this.recalculateDiscount();
        this.save();
        this.updateUI();
        showToast(`${product.name} added to cart!`, 'success');
    }

    // Remove item from cart
    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const item = this.items[itemIndex];
            this.items.splice(itemIndex, 1);
            this.recalculateDiscount();
            this.save();
            this.updateUI();
            showToast(`${item.name} removed from cart`, 'success');
        }
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.recalculateDiscount();
                this.save();
                this.updateUI();
            }
        }
    }

    // Get item quantity
    getQuantity(productId) {
        const item = this.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
    }

    // Get subtotal
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get total items count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Apply coupon
    applyCoupon(code) {
        const couponCode = code.toUpperCase().trim();
        const coupon = COUPONS[couponCode];

        if (!coupon) {
            return { success: false, message: 'Invalid coupon code' };
        }

        const subtotal = this.getSubtotal();

        if (subtotal < coupon.minOrder) {
            return {
                success: false,
                message: `Minimum order ₹${coupon.minOrder} required for this coupon`
            };
        }

        // Calculate discount
        if (coupon.type === 'percent') {
            this.discount = Math.round((subtotal * coupon.discount) / 100);
        } else {
            this.discount = coupon.discount;
        }

        this.appliedCoupon = couponCode;
        this.save();
        this.updateUI();

        return {
            success: true,
            message: `Coupon applied! You saved ₹${this.discount}`,
            discount: this.discount
        };
    }

    // Remove coupon
    removeCoupon() {
        this.appliedCoupon = null;
        this.discount = 0;
        this.save();
        this.updateUI();
    }

    // Recalculate discount if coupon is applied
    recalculateDiscount() {
        if (this.appliedCoupon) {
            const coupon = COUPONS[this.appliedCoupon];
            if (coupon) {
                const subtotal = this.getSubtotal();
                if (subtotal < coupon.minOrder) {
                    // Remove coupon if order is below minimum
                    this.appliedCoupon = null;
                    this.discount = 0;
                } else {
                    if (coupon.type === 'percent') {
                        this.discount = Math.round((subtotal * coupon.discount) / 100);
                    } else {
                        this.discount = coupon.discount;
                    }
                }
            }
        }
    }

    // Get delivery charge
    getDeliveryCharge() {
        const subtotal = this.getSubtotal();
        if (subtotal >= STORE_SETTINGS.freeDeliveryAbove) {
            return 0;
        }
        return STORE_SETTINGS.deliveryCharge;
    }

    // Get grand total
    getGrandTotal() {
        const subtotal = this.getSubtotal();
        const delivery = this.getDeliveryCharge();
        return subtotal - this.discount + delivery;
    }

    // Clear cart
    clear() {
        this.items = [];
        this.appliedCoupon = null;
        this.discount = 0;
        this.save();
        this.updateUI();
    }

    // Update all UI elements
    updateUI() {
        this.updateCartCount();
        this.updateCartSidebar();
        this.updateProductButtons();
    }

    // Update cart count in header
    updateCartCount() {
        const countEl = document.getElementById('cartCount');
        const totalEl = document.getElementById('cartTotal');

        if (countEl) {
            countEl.textContent = this.getItemCount();
        }

        if (totalEl) {
            totalEl.textContent = `₹${this.getSubtotal()}`;
        }
    }

    // Update cart sidebar
    updateCartSidebar() {
        const cartItemsEl = document.getElementById('cartItems');
        const cartEmptyEl = document.getElementById('cartEmpty');
        const cartFooterEl = document.getElementById('cartFooter');
        const subtotalEl = document.getElementById('cartSubtotal');
        const discountRowEl = document.getElementById('discountRow');
        const discountEl = document.getElementById('cartDiscount');
        const deliveryEl = document.getElementById('cartDelivery');
        const grandTotalEl = document.getElementById('cartGrandTotal');
        const couponInput = document.getElementById('couponInput');
        const couponMessage = document.getElementById('couponMessage');

        if (!cartItemsEl) return;

        if (this.items.length === 0) {
            cartItemsEl.innerHTML = `
        <div class="cart-empty">
          <span class="empty-icon">🛒</span>
          <p>Your cart is empty</p>
          <a href="#products" class="btn btn-primary btn-sm" onclick="closeCart()">Start Shopping</a>
        </div>
      `;
            if (cartFooterEl) cartFooterEl.style.display = 'none';
            return;
        }

        if (cartFooterEl) cartFooterEl.style.display = 'block';

        // Render cart items
        cartItemsEl.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</div>
          <div class="cart-item-controls">
            <div class="quantity-controls">
              <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <span class="cart-item-remove" onclick="cart.removeItem(${item.id})">Remove</span>
          </div>
        </div>
      </div>
    `).join('');

        // Update summary
        if (subtotalEl) subtotalEl.textContent = `₹${this.getSubtotal()}`;

        if (discountRowEl && discountEl) {
            if (this.discount > 0) {
                discountRowEl.style.display = 'flex';
                discountEl.textContent = `-₹${this.discount}`;
            } else {
                discountRowEl.style.display = 'none';
            }
        }

        if (deliveryEl) {
            const delivery = this.getDeliveryCharge();
            deliveryEl.textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
        }

        if (grandTotalEl) grandTotalEl.textContent = `₹${this.getGrandTotal()}`;

        // Update coupon input
        if (couponInput && this.appliedCoupon) {
            couponInput.value = this.appliedCoupon;
            couponInput.disabled = true;
        } else if (couponInput) {
            couponInput.disabled = false;
        }

        if (couponMessage && this.appliedCoupon) {
            couponMessage.innerHTML = `<span class="success">✓ ${this.appliedCoupon} applied! Saved ₹${this.discount}</span>`;
        } else if (couponMessage) {
            couponMessage.innerHTML = '';
        }
    }

    // Update product add/quantity buttons
    updateProductButtons() {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = parseInt(card.dataset.productId);
            const quantity = this.getQuantity(productId);
            const actionsEl = card.querySelector('.product-actions');

            if (!actionsEl) return;

            if (quantity > 0) {
                actionsEl.innerHTML = `
          <div class="quantity-controls">
            <button class="qty-btn qty-minus" data-product-id="${productId}" data-action="decrease">−</button>
            <span class="qty-value">${quantity}</span>
            <button class="qty-btn qty-plus" data-product-id="${productId}" data-action="increase">+</button>
          </div>
        `;
            } else {
                actionsEl.innerHTML = `
          <button class="add-to-cart-btn" data-product-id="${productId}">+</button>
        `;
            }
        });
    }

    // Generate WhatsApp message
    generateWhatsAppMessage(customerInfo) {
        let message = `*MORENAMART - NEW ORDER*\n`;
        message += `========================\n\n`;

        // Customer Details
        message += `*CUSTOMER DETAILS*\n`;
        message += `Name: ${customerInfo.name}\n`;
        message += `Phone: ${customerInfo.phone}\n`;
        message += `Address: ${customerInfo.address}\n`;
        if (customerInfo.pincode) {
            message += `Pincode: ${customerInfo.pincode}\n`;
        }
        message += `\n`;

        // Order Items
        message += `*ORDER ITEMS*\n`;
        message += `------------------------\n`;

        this.items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            message += `${index + 1}. *${item.name}* (${item.weight})\n`;
            message += `   Qty: ${item.quantity} x Rs.${item.price} = *Rs.${itemTotal}*\n`;
        });

        message += `------------------------\n\n`;

        // Order Summary
        message += `*ORDER SUMMARY*\n`;
        message += `Subtotal: Rs.${this.getSubtotal()}\n`;

        if (this.discount > 0) {
            message += `Discount (${this.appliedCoupon}): -Rs.${this.discount}\n`;
        }

        const delivery = this.getDeliveryCharge();
        message += `Delivery: ${delivery === 0 ? 'FREE' : 'Rs.' + delivery}\n`;
        message += `\n`;
        message += `*TOTAL: Rs.${this.getGrandTotal()}*\n\n`;

        // Payment Method
        const paymentMethod = customerInfo.paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery';
        message += `Payment: ${paymentMethod}\n\n`;

        message += `========================\n`;
        message += `Thank you for ordering!\n`;
        message += `We will confirm shortly.`;

        return message;
    }

    // Place order via WhatsApp
    placeOrder(customerInfo) {
        if (this.items.length === 0) {
            showToast('Your cart is empty!', 'error');
            return false;
        }

        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            showToast('Please fill all required fields', 'error');
            return false;
        }

        // Generate order for admin (save to localStorage for now)
        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            customer: customerInfo,
            items: [...this.items],
            subtotal: this.getSubtotal(),
            discount: this.discount,
            coupon: this.appliedCoupon,
            delivery: this.getDeliveryCharge(),
            total: this.getGrandTotal(),
            status: 'pending'
        };

        // Save order to localStorage (for admin panel)
        const existingOrders = JSON.parse(localStorage.getItem('morenamart_orders') || '[]');
        existingOrders.push(order);
        localStorage.setItem('morenamart_orders', JSON.stringify(existingOrders));

        // Generate WhatsApp message
        const message = this.generateWhatsAppMessage(customerInfo);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${STORE_SETTINGS.whatsapp}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Clear cart after order
        this.clear();

        // Close modals
        closeCheckoutModal();
        closeCart();

        showToast('Order sent to WhatsApp! Please complete the message.', 'success');

        return true;
    }
}

// Initialize cart
const cart = new Cart();

// Helper functions
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

function openCart(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    cart.updateCartSidebar();
    return false;
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function openCheckoutModal() {
    if (cart.items.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }

    closeCart();

    // Update order summary in modal
    const orderSummary = document.getElementById('orderSummary');
    if (orderSummary) {
        orderSummary.innerHTML = cart.items.map(item => `
      <div class="order-item">
        <span>${item.name} × ${item.quantity}</span>
        <span>₹${item.price * item.quantity}</span>
      </div>
    `).join('');
    }

    // Update total
    const checkoutTotal = document.getElementById('checkoutTotal');
    if (checkoutTotal) {
        checkoutTotal.textContent = `₹${cart.getGrandTotal()}`;
    }

    document.getElementById('checkoutModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
    document.body.style.overflow = '';
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span>
    <span class="toast-message">${message}</span>
  `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    // Cart close
    const cartClose = document.getElementById('cartClose');
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    // Cart overlay
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }

    // Checkout close
    const checkoutClose = document.getElementById('checkoutClose');
    if (checkoutClose) {
        checkoutClose.addEventListener('click', closeCheckoutModal);
    }

    // Apply coupon
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const couponInput = document.getElementById('couponInput');
            if (couponInput) {
                const result = cart.applyCoupon(couponInput.value);
                const couponMessage = document.getElementById('couponMessage');
                if (couponMessage) {
                    couponMessage.innerHTML = `<span class="${result.success ? 'success' : 'error'}">${result.message}</span>`;
                }
            }
        });
    }

    // Payment option toggle
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            option.querySelector('input').checked = true;
        });
    });

    // Order via WhatsApp
    const orderWhatsApp = document.getElementById('orderWhatsApp');
    if (orderWhatsApp) {
        orderWhatsApp.addEventListener('click', () => {
            const customerInfo = {
                name: document.getElementById('customerName').value.trim(),
                phone: document.getElementById('customerPhone').value.trim(),
                address: document.getElementById('customerAddress').value.trim(),
                pincode: document.getElementById('customerPincode').value.trim(),
                paymentMethod: document.querySelector('input[name="payment"]:checked').value
            };

            cart.placeOrder(customerInfo);
        });
    }

    // Close modal on background click
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                closeCheckoutModal();
            }
        });
    }

    // Initial UI update
    cart.updateUI();
});

// Export cart
window.cart = cart;
window.addToCart = addToCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.showToast = showToast;
