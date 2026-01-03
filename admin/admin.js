/**
 * MorenaMart - Admin Panel JavaScript
 * Complete admin functionality with localStorage
 */

// ==================== Authentication ====================
const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'admin123'
};

function getAdminCredentials() {
    const saved = localStorage.getItem('morenamart_admin_credentials');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return DEFAULT_ADMIN;
        }
    }
    return DEFAULT_ADMIN;
}

function isLoggedIn() {
    return sessionStorage.getItem('morenamart_admin_logged_in') === 'true';
}

function login(username, password) {
    const credentials = getAdminCredentials();
    if (username === credentials.username && password === credentials.password) {
        sessionStorage.setItem('morenamart_admin_logged_in', 'true');
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem('morenamart_admin_logged_in');
    showLoginScreen();
}

function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminContainer').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminContainer').style.display = 'flex';
    loadDashboard();
    lucide.createIcons();
}

// ==================== Products Management ====================
function getProducts() {
    const saved = localStorage.getItem('morenamart_admin_products');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return getDefaultProducts();
        }
    }
    return getDefaultProducts();
}

function getDefaultProducts() {
    return [
        { id: 1, name: "Tata Salt", weight: "1 kg", price: 28, mrp: 30, category: "grocery", image: "../images/products/product_tata_salt_1767374625958.png", badge: "bestseller", inStock: true },
        { id: 2, name: "Fortune Rice Bran Oil", weight: "1 Litre", price: 189, mrp: 210, category: "grocery", image: "../images/products/product_fortune_oil_1767374643098.png", badge: "discount", inStock: true },
        { id: 3, name: "Aashirvaad Atta", weight: "5 kg", price: 299, mrp: 330, category: "grocery", image: "../images/products/product_aashirvaad_atta_1767374658902.png", badge: "discount", inStock: true },
        { id: 4, name: "Premium Toor Dal", weight: "1 kg", price: 159, mrp: 175, category: "grocery", image: "../images/products/product_toor_dal_1767374678414.png", badge: null, inStock: true },
        { id: 5, name: "Maggi Noodles", weight: "Pack of 12", price: 168, mrp: 180, category: "snacks", image: "../images/products/product_maggi_noodles_1767374696338.png", badge: "bestseller", inStock: true },
        { id: 6, name: "Parle-G Biscuits", weight: "800 g", price: 85, mrp: 95, category: "snacks", image: "../images/products/product_parle_g_1767374730041.png", badge: null, inStock: true },
        { id: 7, name: "Amul Butter", weight: "500 g", price: 280, mrp: 295, category: "dairy", image: "../images/products/product_amul_butter_1767374713964.png", badge: "bestseller", inStock: true },
        { id: 8, name: "MDH Garam Masala", weight: "100 g", price: 89, mrp: 99, category: "spices", image: "../images/categories/category_spices_1767374582349.png", badge: "bestseller", inStock: true }
    ];
}

function saveProducts(products) {
    localStorage.setItem('morenamart_admin_products', JSON.stringify(products));
}

function addProduct(product) {
    const products = getProducts();
    product.id = Date.now();
    products.push(product);
    saveProducts(products);
    return product;
}

function updateProduct(id, updatedProduct) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        saveProducts(products);
        return true;
    }
    return false;
}

function deleteProduct(id) {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
}

function renderProductsTable() {
    const products = getProducts();
    const tbody = document.getElementById('productsTableBody');

    if (!tbody) return;

    tbody.innerHTML = products.map(product => `
    <tr>
      <td><img src="${product.image}" alt="${product.name}" class="product-thumb"></td>
      <td><strong>${product.name}</strong><br><small>${product.weight || ''}</small></td>
      <td>${getCategoryName(product.category)}</td>
      <td>₹${product.price}</td>
      <td>₹${product.mrp || product.price}</td>
      <td>${product.inStock ? '<span style="color: #28a745;">✓ In Stock</span>' : '<span style="color: #dc3545;">✕ Out</span>'}</td>
      <td>
        <div class="table-actions">
          <button class="edit-btn" onclick="editProduct(${product.id})" title="Edit">
            <i data-lucide="edit-2"></i>
          </button>
          <button class="delete-btn" onclick="confirmDeleteProduct(${product.id})" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

    lucide.createIcons();
}

function getCategoryName(category) {
    const names = {
        grocery: 'Grocery',
        fruits: 'Fruits & Veg',
        dairy: 'Dairy',
        snacks: 'Snacks',
        spices: 'Spices',
        household: 'Household',
        personal: 'Personal Care'
    };
    return names[category] || category;
}

function openProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('productModalTitle');
    const form = document.getElementById('productForm');

    form.reset();
    document.getElementById('productId').value = '';

    if (productId) {
        const products = getProducts();
        const product = products.find(p => p.id === productId);

        if (product) {
            title.innerHTML = '<i data-lucide="edit"></i> Edit Product';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productMRP').value = product.mrp || '';
            document.getElementById('productWeight').value = product.weight || '';
            document.getElementById('productBadge').value = product.badge || '';
            document.getElementById('productImage').value = product.image || '';
            document.getElementById('productInStock').checked = product.inStock !== false;
        }
    } else {
        title.innerHTML = '<i data-lucide="plus-circle"></i> Add New Product';
    }

    modal.classList.add('active');
    lucide.createIcons();
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function editProduct(id) {
    openProductModal(id);
}

function confirmDeleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(id);
        renderProductsTable();
        loadDashboard();
        showNotification('Product deleted successfully!');
    }
}

// ==================== Categories Management ====================
function getCategories() {
    const saved = localStorage.getItem('morenamart_categories');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return getDefaultCategories();
        }
    }
    return getDefaultCategories();
}

function getDefaultCategories() {
    return [
        { id: 'grocery', name: 'Grocery & Staples', icon: 'wheat', active: true },
        { id: 'fruits', name: 'Fruits & Vegetables', icon: 'carrot', active: true },
        { id: 'dairy', name: 'Dairy Products', icon: 'milk', active: true },
        { id: 'snacks', name: 'Snacks & Beverages', icon: 'cookie', active: true },
        { id: 'spices', name: 'Spices & Masala', icon: 'flame', active: true },
        { id: 'household', name: 'Household', icon: 'home', active: true },
        { id: 'personal', name: 'Personal Care', icon: 'heart', active: true }
    ];
}

function saveCategories(categories) {
    localStorage.setItem('morenamart_categories', JSON.stringify(categories));
}

function renderCategoriesGrid() {
    const categories = getCategories();
    const products = getProducts();
    const container = document.getElementById('categoriesGrid');

    if (!container) return;

    container.innerHTML = categories.map(cat => {
        const count = products.filter(p => p.category === cat.id).length;
        return `
      <div class="category-card ${!cat.active ? 'inactive' : ''}">
        <div class="category-icon"><i data-lucide="${cat.icon || 'folder'}"></i></div>
        <div class="category-name">${cat.name}</div>
        <div class="category-count">${count} products</div>
        <div class="category-actions">
          <button class="edit-btn" onclick="editCategory('${cat.id}')" title="Edit">
            <i data-lucide="edit-2"></i>
          </button>
          <button class="delete-btn" onclick="confirmDeleteCategory('${cat.id}')" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `;
    }).join('');

    lucide.createIcons();
}

function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('categoryModalTitle');
    const form = document.getElementById('categoryForm');

    form.reset();
    document.getElementById('categoryId').value = '';

    if (categoryId) {
        const categories = getCategories();
        const category = categories.find(c => c.id === categoryId);

        if (category) {
            title.innerHTML = '<i data-lucide="edit"></i> Edit Category';
            document.getElementById('categoryId').value = category.id;
            document.getElementById('categoryName').value = category.name;
            document.getElementById('categorySlug').value = category.id;
            document.getElementById('categoryIcon').value = category.icon || '';
            document.getElementById('categoryActive').checked = category.active !== false;
        }
    } else {
        title.innerHTML = '<i data-lucide="folder-plus"></i> Add New Category';
    }

    modal.classList.add('active');
    lucide.createIcons();
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
}

function editCategory(id) {
    openCategoryModal(id);
}

function confirmDeleteCategory(id) {
    if (confirm('Are you sure you want to delete this category?')) {
        const categories = getCategories();
        const filtered = categories.filter(c => c.id !== id);
        saveCategories(filtered);
        renderCategoriesGrid();
        showNotification('Category deleted successfully!');
    }
}

// ==================== Banners Management ====================
function getBanners() {
    const saved = localStorage.getItem('morenamart_banners');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return getDefaultBanners();
        }
    }
    return getDefaultBanners();
}

function getDefaultBanners() {
    return [
        { id: 1, title: 'Fresh Groceries Delivered Fast!', subtitle: 'Quality products at best prices', image: '../images/hero-grocery.png', link: '#products', bgColor: '#E8F5E9', textColor: '#1A1A1A', active: true },
        { id: 2, title: 'Flat 20% OFF on First Order!', subtitle: 'Use code FIRST20 at checkout', image: '../images/categories/category_grocery_staples_1767374498000.png', link: '#products', bgColor: '#FFF3E0', textColor: '#1A1A1A', active: true },
        { id: 3, title: 'Fresh Vegetables Daily Arrival!', subtitle: 'Farm fresh vegetables from local farms', image: '../images/categories/category_fruits_vegetables_1767374513991.png', link: '#fruits', bgColor: '#E3F2FD', textColor: '#1A1A1A', active: true }
    ];
}

function saveBanners(banners) {
    localStorage.setItem('morenamart_banners', JSON.stringify(banners));
}

function renderBannersGrid() {
    const banners = getBanners();
    const container = document.getElementById('bannersGrid');

    if (!container) return;

    if (banners.length === 0) {
        container.innerHTML = '<p class="empty-state">No banners added yet. Click "Add Banner" to create one.</p>';
        return;
    }

    container.innerHTML = banners.map(banner => `
    <div class="banner-card ${!banner.active ? 'inactive' : ''}" style="background-color: ${banner.bgColor};">
      <div class="banner-preview">
        <img src="${banner.image}" alt="${banner.title}">
      </div>
      <div class="banner-info">
        <h4>${banner.title}</h4>
        <p>${banner.subtitle || ''}</p>
        <span class="banner-status ${banner.active ? 'active' : 'inactive'}">${banner.active ? 'Active' : 'Inactive'}</span>
      </div>
      <div class="banner-actions">
        <button class="edit-btn" onclick="editBanner(${banner.id})" title="Edit">
          <i data-lucide="edit-2"></i>
        </button>
        <button class="delete-btn" onclick="confirmDeleteBanner(${banner.id})" title="Delete">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
  `).join('');

    lucide.createIcons();
}

function openBannerModal(bannerId = null) {
    const modal = document.getElementById('bannerModal');
    const title = document.getElementById('bannerModalTitle');
    const form = document.getElementById('bannerForm');

    form.reset();
    document.getElementById('bannerId').value = '';
    document.getElementById('bannerBgColor').value = '#E8F5E9';
    document.getElementById('bannerTextColor').value = '#1A1A1A';

    if (bannerId) {
        const banners = getBanners();
        const banner = banners.find(b => b.id === bannerId);

        if (banner) {
            title.innerHTML = '<i data-lucide="edit"></i> Edit Banner';
            document.getElementById('bannerId').value = banner.id;
            document.getElementById('bannerTitle').value = banner.title;
            document.getElementById('bannerSubtitle').value = banner.subtitle || '';
            document.getElementById('bannerImage').value = banner.image;
            document.getElementById('bannerLink').value = banner.link || '';
            document.getElementById('bannerBgColor').value = banner.bgColor || '#E8F5E9';
            document.getElementById('bannerTextColor').value = banner.textColor || '#1A1A1A';
            document.getElementById('bannerActive').checked = banner.active !== false;
        }
    } else {
        title.innerHTML = '<i data-lucide="image-plus"></i> Add New Banner';
    }

    modal.classList.add('active');
    lucide.createIcons();
}

function closeBannerModal() {
    document.getElementById('bannerModal').classList.remove('active');
}

function editBanner(id) {
    openBannerModal(id);
}

function confirmDeleteBanner(id) {
    if (confirm('Are you sure you want to delete this banner?')) {
        const banners = getBanners();
        const filtered = banners.filter(b => b.id !== id);
        saveBanners(filtered);
        renderBannersGrid();
        showNotification('Banner deleted successfully!');
    }
}

// ==================== Coupons Management ====================
function getCoupons() {
    const saved = localStorage.getItem('morenamart_coupons');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return getDefaultCoupons();
        }
    }
    return getDefaultCoupons();
}

function getDefaultCoupons() {
    return [
        { id: 1, code: 'MORENA10', type: 'percent', value: 10, minOrder: 200, description: '10% off on orders above ₹200', active: true },
        { id: 2, code: 'FIRST20', type: 'percent', value: 20, minOrder: 300, description: '20% off on first order above ₹300', active: true },
        { id: 3, code: 'FLAT50', type: 'flat', value: 50, minOrder: 500, description: '₹50 off on orders above ₹500', active: true },
        { id: 4, code: 'FLAT100', type: 'flat', value: 100, minOrder: 1000, description: '₹100 off on orders above ₹1000', active: true }
    ];
}

function saveCoupons(coupons) {
    localStorage.setItem('morenamart_coupons', JSON.stringify(coupons));
}

function renderCouponsGrid() {
    const coupons = getCoupons();
    const container = document.getElementById('couponsGrid');

    if (!container) return;

    if (coupons.length === 0) {
        container.innerHTML = '<p class="empty-state">No coupons added yet. Click "Add Coupon" to create one.</p>';
        return;
    }

    container.innerHTML = coupons.map(coupon => `
    <div class="coupon-card ${!coupon.active ? 'inactive' : ''}">
      <div class="coupon-code">${coupon.code}</div>
      <div class="coupon-value">${coupon.type === 'percent' ? coupon.value + '% OFF' : '₹' + coupon.value + ' OFF'}</div>
      <div class="coupon-min">Min order: ₹${coupon.minOrder}</div>
      <div class="coupon-desc">${coupon.description || ''}</div>
      <span class="coupon-status ${coupon.active ? 'active' : 'inactive'}">${coupon.active ? 'Active' : 'Inactive'}</span>
      <div class="coupon-actions">
        <button class="edit-btn" onclick="editCoupon(${coupon.id})" title="Edit">
          <i data-lucide="edit-2"></i>
        </button>
        <button class="delete-btn" onclick="confirmDeleteCoupon(${coupon.id})" title="Delete">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
  `).join('');

    lucide.createIcons();
}

function openCouponModal(couponId = null) {
    const modal = document.getElementById('couponModal');
    const title = document.getElementById('couponModalTitle');
    const form = document.getElementById('couponForm');

    form.reset();
    document.getElementById('couponId').value = '';

    if (couponId) {
        const coupons = getCoupons();
        const coupon = coupons.find(c => c.id === couponId);

        if (coupon) {
            title.innerHTML = '<i data-lucide="edit"></i> Edit Coupon';
            document.getElementById('couponId').value = coupon.id;
            document.getElementById('couponCode').value = coupon.code;
            document.getElementById('couponType').value = coupon.type;
            document.getElementById('couponValue').value = coupon.value;
            document.getElementById('couponMinOrder').value = coupon.minOrder || 0;
            document.getElementById('couponDescription').value = coupon.description || '';
            document.getElementById('couponActive').checked = coupon.active !== false;
        }
    } else {
        title.innerHTML = '<i data-lucide="ticket"></i> Add New Coupon';
    }

    modal.classList.add('active');
    lucide.createIcons();
}

function closeCouponModal() {
    document.getElementById('couponModal').classList.remove('active');
}

function editCoupon(id) {
    openCouponModal(id);
}

function confirmDeleteCoupon(id) {
    if (confirm('Are you sure you want to delete this coupon?')) {
        const coupons = getCoupons();
        const filtered = coupons.filter(c => c.id !== id);
        saveCoupons(filtered);
        renderCouponsGrid();
        showNotification('Coupon deleted successfully!');
    }
}

// ==================== Orders Management ====================
function getOrders() {
    const saved = localStorage.getItem('morenamart_orders');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return [];
        }
    }
    return [];
}

function saveOrders(orders) {
    localStorage.setItem('morenamart_orders', JSON.stringify(orders));
}

function updateOrderStatus(orderId, status) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        saveOrders(orders);
        renderOrdersList();
        loadDashboard();
    }
}

function renderOrdersList(filter = 'all') {
    const orders = getOrders().sort((a, b) => new Date(b.date) - new Date(a.date));
    const container = document.getElementById('ordersList');

    if (!container) return;

    let filteredOrders = orders;
    if (filter !== 'all') {
        filteredOrders = orders.filter(o => o.status === filter);
    }

    if (filteredOrders.length === 0) {
        container.innerHTML = '<p class="empty-state">No orders found</p>';
        return;
    }

    container.innerHTML = filteredOrders.map(order => {
        const date = new Date(order.date);
        const formattedDate = date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
      <div class="order-card" onclick="viewOrderDetails(${order.id})">
        <div class="order-header">
          <span class="order-id">#${order.id}</span>
          <span class="order-status status-${order.status}">${order.status.toUpperCase()}</span>
        </div>
        <div class="order-info">
          <div class="order-info-item">
            <span class="order-info-label">Customer</span>
            <span class="order-info-value">${order.customer.name}</span>
          </div>
          <div class="order-info-item">
            <span class="order-info-label">Phone</span>
            <span class="order-info-value">${order.customer.phone}</span>
          </div>
          <div class="order-info-item">
            <span class="order-info-label">Total</span>
            <span class="order-info-value">₹${order.total}</span>
          </div>
          <div class="order-info-item">
            <span class="order-info-label">Date</span>
            <span class="order-info-value">${formattedDate}</span>
          </div>
        </div>
      </div>
    `;
    }).join('');

    const pendingCount = orders.filter(o => o.status === 'pending').length;
    document.getElementById('ordersBadge').textContent = pendingCount;
}

function viewOrderDetails(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);

    if (!order) return;

    const modal = document.getElementById('orderModal');
    const container = document.getElementById('orderDetails');

    const date = new Date(order.date);
    const formattedDate = date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    container.innerHTML = `
    <div class="order-detail-section">
      <h4><i data-lucide="package"></i> Order #${order.id}</h4>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Status:</strong> 
        <select onchange="updateOrderStatus(${order.id}, this.value)" style="padding: 5px 10px; border-radius: 5px;">
          <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
          <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
          <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
          <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
        </select>
      </p>
    </div>
    
    <div class="order-detail-section">
      <h4><i data-lucide="user"></i> Customer Details</h4>
      <p><strong>Name:</strong> ${order.customer.name}</p>
      <p><strong>Phone:</strong> ${order.customer.phone}</p>
      <p><strong>Address:</strong> ${order.customer.address}</p>
      ${order.customer.pincode ? `<p><strong>Pincode:</strong> ${order.customer.pincode}</p>` : ''}
      <p><strong>Payment:</strong> ${order.customer.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}</p>
    </div>
    
    <div class="order-detail-section">
      <h4><i data-lucide="shopping-cart"></i> Order Items</h4>
      <table class="order-items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>₹${item.price}</td>
              <td>₹${item.price * item.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="order-detail-section">
      <h4><i data-lucide="indian-rupee"></i> Order Summary</h4>
      <div class="order-summary-row">
        <span>Subtotal</span>
        <span>₹${order.subtotal}</span>
      </div>
      ${order.discount > 0 ? `
        <div class="order-summary-row">
          <span>Discount (${order.coupon})</span>
          <span>-₹${order.discount}</span>
        </div>
      ` : ''}
      <div class="order-summary-row">
        <span>Delivery</span>
        <span>${order.delivery === 0 ? 'FREE' : '₹' + order.delivery}</span>
      </div>
      <div class="order-summary-row total">
        <span>Grand Total</span>
        <span>₹${order.total}</span>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://wa.me/91${order.customer.phone}" target="_blank" class="btn btn-primary" style="text-decoration: none;">
        <i data-lucide="message-circle"></i> Contact Customer on WhatsApp
      </a>
    </div>
  `;

    modal.classList.add('active');
    lucide.createIcons();
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}

function exportOrders() {
    const orders = getOrders();

    if (orders.length === 0) {
        showNotification('No orders to export!', 'error');
        return;
    }

    let csv = 'Order ID,Date,Customer,Phone,Address,Items,Subtotal,Discount,Delivery,Total,Status\n';

    orders.forEach(order => {
        const date = new Date(order.date).toLocaleDateString('en-IN');
        const items = order.items.map(i => `${i.name}(${i.quantity})`).join('; ');

        csv += `${order.id},"${date}","${order.customer.name}","${order.customer.phone}","${order.customer.address}","${items}",${order.subtotal},${order.discount},${order.delivery},${order.total},${order.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `morenamart_orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    showNotification('Orders exported successfully!');
}

// ==================== Settings ====================
function getSettings() {
    const saved = localStorage.getItem('morenamart_settings');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            return getDefaultSettings();
        }
    }
    return getDefaultSettings();
}

function getDefaultSettings() {
    return {
        storeName: 'MorenaMart',
        tagline: 'Fresh & Affordable',
        address: 'Main Market Road, Near City Center, Morena, MP 476001',
        phone: '6265643703',
        whatsapp: '916265643703',
        email: 'contact@morenamart.com',
        weekdayTiming: '8 AM - 9 PM',
        sundayTiming: '9 AM - 2 PM',
        deliveryCharge: 40,
        freeDeliveryAbove: 500,
        primaryColor: '#2E7D32',
        secondaryColor: '#FF6B35'
    };
}

function loadSettings() {
    const settings = getSettings();

    document.getElementById('settingStoreName').value = settings.storeName;
    document.getElementById('settingTagline').value = settings.tagline;
    document.getElementById('settingAddress').value = settings.address;
    document.getElementById('settingPhone').value = settings.phone;
    document.getElementById('settingWhatsApp').value = settings.whatsapp;
    document.getElementById('settingEmail').value = settings.email;
    document.getElementById('settingWeekdayTiming').value = settings.weekdayTiming;
    document.getElementById('settingSundayTiming').value = settings.sundayTiming;
    document.getElementById('settingDeliveryCharge').value = settings.deliveryCharge;
    document.getElementById('settingFreeDelivery').value = settings.freeDeliveryAbove;
    document.getElementById('settingPrimaryColor').value = settings.primaryColor;
    document.getElementById('settingSecondaryColor').value = settings.secondaryColor;

    const credentials = getAdminCredentials();
    document.getElementById('settingAdminUsername').value = credentials.username;
}

function saveSettings() {
    const settings = {
        storeName: document.getElementById('settingStoreName').value,
        tagline: document.getElementById('settingTagline').value,
        address: document.getElementById('settingAddress').value,
        phone: document.getElementById('settingPhone').value,
        whatsapp: document.getElementById('settingWhatsApp').value,
        email: document.getElementById('settingEmail').value,
        weekdayTiming: document.getElementById('settingWeekdayTiming').value,
        sundayTiming: document.getElementById('settingSundayTiming').value,
        deliveryCharge: parseInt(document.getElementById('settingDeliveryCharge').value) || 40,
        freeDeliveryAbove: parseInt(document.getElementById('settingFreeDelivery').value) || 500,
        primaryColor: document.getElementById('settingPrimaryColor').value,
        secondaryColor: document.getElementById('settingSecondaryColor').value
    };

    localStorage.setItem('morenamart_settings', JSON.stringify(settings));

    const newUsername = document.getElementById('settingAdminUsername').value;
    const newPassword = document.getElementById('settingAdminPassword').value;

    if (newUsername) {
        const credentials = getAdminCredentials();
        credentials.username = newUsername;
        if (newPassword) {
            credentials.password = newPassword;
        }
        localStorage.setItem('morenamart_admin_credentials', JSON.stringify(credentials));
    }

    showNotification('Settings saved successfully!');
}

function resetSettings() {
    if (confirm('Reset all settings to default?')) {
        localStorage.removeItem('morenamart_settings');
        loadSettings();
        showNotification('Settings reset to default');
    }
}

// ==================== Dashboard ====================
function loadDashboard() {
    const orders = getOrders();
    const products = getProducts();

    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalProducts').textContent = products.length;

    const totalRevenue = orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0);
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue.toLocaleString()}`;

    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('ordersBadge').textContent = pendingOrders;

    const recentOrders = orders.slice(0, 5);
    const recentContainer = document.getElementById('recentOrdersList');

    if (recentOrders.length === 0) {
        recentContainer.innerHTML = '<p class="empty-state">No orders yet</p>';
    } else {
        recentContainer.innerHTML = recentOrders.map(order => {
            const date = new Date(order.date);
            return `
        <div class="order-card" style="margin-bottom: 10px; padding: 15px;" onclick="viewOrderDetails(${order.id})">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>#${order.id}</strong> - ${order.customer.name}
              <br><small style="color: #666;">₹${order.total} • ${date.toLocaleDateString('en-IN')}</small>
            </div>
            <span class="order-status status-${order.status}">${order.status}</span>
          </div>
        </div>
      `;
        }).join('');
    }

    lucide.createIcons();
}

// ==================== Page Navigation ====================
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) {
            item.classList.add('active');
        }
    });

    const titles = {
        dashboard: 'Dashboard',
        orders: 'Orders',
        products: 'Products',
        categories: 'Categories',
        banners: 'Banners',
        coupons: 'Coupons',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[pageName] || 'Dashboard';

    if (pageName === 'orders') {
        renderOrdersList();
    } else if (pageName === 'products') {
        renderProductsTable();
    } else if (pageName === 'categories') {
        renderCategoriesGrid();
    } else if (pageName === 'banners') {
        renderBannersGrid();
    } else if (pageName === 'coupons') {
        renderCouponsGrid();
    } else if (pageName === 'settings') {
        loadSettings();
    } else if (pageName === 'dashboard') {
        loadDashboard();
    }

    document.querySelector('.sidebar').classList.remove('active');
    lucide.createIcons();
}

// ==================== Notification ====================
function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
  `;
    toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'x-circle'}"></i> ${message}`;

    document.body.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', () => {
    if (isLoggedIn()) {
        showAdminPanel();
    } else {
        showLoginScreen();
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            if (login(username, password)) {
                showAdminPanel();
            } else {
                showNotification('Invalid username or password', 'error');
            }
        });
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Navigation
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(item.dataset.page);
        });
    });

    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Order status filter
    const orderFilter = document.getElementById('orderStatusFilter');
    if (orderFilter) {
        orderFilter.addEventListener('change', () => {
            renderOrdersList(orderFilter.value);
        });
    }

    // Product form
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const productId = document.getElementById('productId').value;
            const productData = {
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                price: parseFloat(document.getElementById('productPrice').value),
                mrp: parseFloat(document.getElementById('productMRP').value) || null,
                weight: document.getElementById('productWeight').value,
                badge: document.getElementById('productBadge').value || null,
                image: document.getElementById('productImage').value || '../images/products/product_tata_salt_1767374625958.png',
                inStock: document.getElementById('productInStock').checked
            };

            if (productId) {
                updateProduct(parseInt(productId), productData);
                showNotification('Product updated successfully!');
            } else {
                addProduct(productData);
                showNotification('Product added successfully!');
            }

            closeProductModal();
            renderProductsTable();
            loadDashboard();
        });
    }

    // Category form
    const categoryForm = document.getElementById('categoryForm');
    if (categoryForm) {
        categoryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const categories = getCategories();
            const categoryId = document.getElementById('categoryId').value;
            const categoryData = {
                id: document.getElementById('categorySlug').value.toLowerCase(),
                name: document.getElementById('categoryName').value,
                icon: document.getElementById('categoryIcon').value || 'folder',
                active: document.getElementById('categoryActive').checked
            };

            if (categoryId) {
                const index = categories.findIndex(c => c.id === categoryId);
                if (index !== -1) {
                    categories[index] = categoryData;
                }
                showNotification('Category updated successfully!');
            } else {
                categories.push(categoryData);
                showNotification('Category added successfully!');
            }

            saveCategories(categories);
            closeCategoryModal();
            renderCategoriesGrid();
        });
    }

    // Banner form
    const bannerForm = document.getElementById('bannerForm');
    if (bannerForm) {
        bannerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const banners = getBanners();
            const bannerId = document.getElementById('bannerId').value;
            const bannerData = {
                id: bannerId ? parseInt(bannerId) : Date.now(),
                title: document.getElementById('bannerTitle').value,
                subtitle: document.getElementById('bannerSubtitle').value,
                image: document.getElementById('bannerImage').value,
                link: document.getElementById('bannerLink').value,
                bgColor: document.getElementById('bannerBgColor').value,
                textColor: document.getElementById('bannerTextColor').value,
                active: document.getElementById('bannerActive').checked
            };

            if (bannerId) {
                const index = banners.findIndex(b => b.id === parseInt(bannerId));
                if (index !== -1) {
                    banners[index] = bannerData;
                }
                showNotification('Banner updated successfully!');
            } else {
                banners.push(bannerData);
                showNotification('Banner added successfully!');
            }

            saveBanners(banners);
            closeBannerModal();
            renderBannersGrid();
        });
    }

    // Coupon form
    const couponForm = document.getElementById('couponForm');
    if (couponForm) {
        couponForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const coupons = getCoupons();
            const couponId = document.getElementById('couponId').value;
            const couponData = {
                id: couponId ? parseInt(couponId) : Date.now(),
                code: document.getElementById('couponCode').value.toUpperCase(),
                type: document.getElementById('couponType').value,
                value: parseFloat(document.getElementById('couponValue').value),
                minOrder: parseFloat(document.getElementById('couponMinOrder').value) || 0,
                description: document.getElementById('couponDescription').value,
                active: document.getElementById('couponActive').checked
            };

            if (couponId) {
                const index = coupons.findIndex(c => c.id === parseInt(couponId));
                if (index !== -1) {
                    coupons[index] = couponData;
                }
                showNotification('Coupon updated successfully!');
            } else {
                coupons.push(couponData);
                showNotification('Coupon added successfully!');
            }

            saveCoupons(coupons);
            closeCouponModal();
            renderCouponsGrid();
        });
    }

    lucide.createIcons();
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Export functions
window.showPage = showPage;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.editProduct = editProduct;
window.confirmDeleteProduct = confirmDeleteProduct;
window.openCategoryModal = openCategoryModal;
window.closeCategoryModal = closeCategoryModal;
window.editCategory = editCategory;
window.confirmDeleteCategory = confirmDeleteCategory;
window.openBannerModal = openBannerModal;
window.closeBannerModal = closeBannerModal;
window.editBanner = editBanner;
window.confirmDeleteBanner = confirmDeleteBanner;
window.openCouponModal = openCouponModal;
window.closeCouponModal = closeCouponModal;
window.editCoupon = editCoupon;
window.confirmDeleteCoupon = confirmDeleteCoupon;
window.viewOrderDetails = viewOrderDetails;
window.closeOrderModal = closeOrderModal;
window.updateOrderStatus = updateOrderStatus;
window.exportOrders = exportOrders;
window.saveSettings = saveSettings;
window.resetSettings = resetSettings;
