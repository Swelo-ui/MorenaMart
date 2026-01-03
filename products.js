/**
 * MorenaMart - Products Database
 * All product data for the store
 */

const PRODUCTS = [
    // Grocery & Staples
    {
        id: 1,
        name: "Tata Salt",
        weight: "1 kg",
        price: 28,
        mrp: 30,
        category: "grocery",
        image: "images/products/product_tata_salt_1kg.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 2,
        name: "Fortune Rice Bran Oil",
        weight: "1 Litre",
        price: 189,
        mrp: 210,
        category: "grocery",
        image: "images/products/product_fortune_oil_1litre.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 3,
        name: "Aashirvaad Atta",
        weight: "5 kg",
        price: 299,
        mrp: 330,
        category: "grocery",
        image: "images/products/product_aashirvaad_atta_1767374658902.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 4,
        name: "Premium Toor Dal",
        weight: "1 kg",
        price: 159,
        mrp: 175,
        category: "grocery",
        image: "images/products/product_toor_dal_1767374678414.png",
        badge: null,
        inStock: true
    },
    {
        id: 5,
        name: "Basmati Rice Premium",
        weight: "5 kg",
        price: 499,
        mrp: 550,
        category: "grocery",
        image: "images/products/product_toor_dal_1767374678414.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 6,
        name: "Moong Dal",
        weight: "1 kg",
        price: 145,
        mrp: 160,
        category: "grocery",
        image: "images/products/product_toor_dal_1767374678414.png",
        badge: null,
        inStock: true
    },

    // Snacks & Beverages
    {
        id: 7,
        name: "Maggi Noodles",
        weight: "Pack of 12",
        price: 168,
        mrp: 180,
        category: "snacks",
        image: "images/products/product_maggi_noodles_1767374696338.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 8,
        name: "Parle-G Biscuits",
        weight: "800 g",
        price: 85,
        mrp: 95,
        category: "snacks",
        image: "images/products/product_parle_g_1767374730041.png",
        badge: null,
        inStock: true
    },
    {
        id: 9,
        name: "Lays Classic Salted",
        weight: "90 g",
        price: 20,
        mrp: 20,
        category: "snacks",
        image: "images/products/product_parle_g_1767374730041.png",
        badge: null,
        inStock: true
    },
    {
        id: 10,
        name: "Coca Cola",
        weight: "750 ml",
        price: 40,
        mrp: 45,
        category: "snacks",
        image: "images/products/product_parle_g_1767374730041.png",
        badge: null,
        inStock: true
    },

    // Dairy Products
    {
        id: 11,
        name: "Amul Butter",
        weight: "500 g",
        price: 280,
        mrp: 295,
        category: "dairy",
        image: "images/products/product_amul_butter_1767374713964.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 12,
        name: "Amul Milk",
        weight: "1 Litre",
        price: 66,
        mrp: 68,
        category: "dairy",
        image: "images/products/product_amul_butter_1767374713964.png",
        badge: null,
        inStock: true
    },
    {
        id: 13,
        name: "Amul Cheese Slices",
        weight: "200 g",
        price: 120,
        mrp: 130,
        category: "dairy",
        image: "images/products/product_amul_butter_1767374713964.png",
        badge: null,
        inStock: true
    },
    {
        id: 14,
        name: "Paneer Fresh",
        weight: "200 g",
        price: 90,
        mrp: 100,
        category: "dairy",
        image: "images/products/product_amul_butter_1767374713964.png",
        badge: "new",
        inStock: true
    },

    // Fruits & Vegetables
    {
        id: 15,
        name: "Fresh Tomatoes",
        weight: "1 kg",
        price: 40,
        mrp: 50,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 16,
        name: "Onion",
        weight: "1 kg",
        price: 35,
        mrp: 45,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: null,
        inStock: true
    },
    {
        id: 17,
        name: "Potato",
        weight: "1 kg",
        price: 30,
        mrp: 35,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: null,
        inStock: true
    },
    {
        id: 18,
        name: "Green Chilli",
        weight: "100 g",
        price: 15,
        mrp: 20,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: null,
        inStock: true
    },

    // Spices & Masala
    {
        id: 19,
        name: "MDH Garam Masala",
        weight: "100 g",
        price: 89,
        mrp: 99,
        category: "spices",
        image: "images/categories/category_spices_1767374582349.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 20,
        name: "Red Chilli Powder",
        weight: "200 g",
        price: 65,
        mrp: 75,
        category: "spices",
        image: "images/categories/category_spices_1767374582349.png",
        badge: null,
        inStock: true
    },
    {
        id: 21,
        name: "Turmeric Powder",
        weight: "200 g",
        price: 55,
        mrp: 65,
        category: "spices",
        image: "images/categories/category_spices_1767374582349.png",
        badge: null,
        inStock: true
    },
    {
        id: 22,
        name: "Coriander Powder",
        weight: "200 g",
        price: 48,
        mrp: 55,
        category: "spices",
        image: "images/categories/category_spices_1767374582349.png",
        badge: null,
        inStock: true
    },

    // Household
    {
        id: 23,
        name: "Surf Excel Easy Wash",
        weight: "1 kg",
        price: 155,
        mrp: 175,
        category: "household",
        image: "images/categories/category_household_1767374562623.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 24,
        name: "Vim Dishwash Bar",
        weight: "300 g",
        price: 35,
        mrp: 40,
        category: "household",
        image: "images/categories/category_household_1767374562623.png",
        badge: null,
        inStock: true
    },
    {
        id: 25,
        name: "Lizol Floor Cleaner",
        weight: "500 ml",
        price: 125,
        mrp: 140,
        category: "household",
        image: "images/categories/category_household_1767374562623.png",
        badge: null,
        inStock: true
    },

    // Personal Care
    {
        id: 26,
        name: "Colgate MaxFresh",
        weight: "150 g",
        price: 95,
        mrp: 105,
        category: "personal",
        image: "images/categories/category_personal_care_1767374598835.png",
        badge: null,
        inStock: true
    },
    {
        id: 27,
        name: "Dove Soap",
        weight: "100 g x 3",
        price: 185,
        mrp: 200,
        category: "personal",
        image: "images/categories/category_personal_care_1767374598835.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 28,
        name: "Head & Shoulders Shampoo",
        weight: "340 ml",
        price: 320,
        mrp: 365,
        category: "personal",
        image: "images/categories/category_personal_care_1767374598835.png",
        badge: "bestseller",
        inStock: true
    },
    // More Grocery Items
    {
        id: 29,
        name: "India Gate Basmati Rice",
        weight: "10 kg",
        price: 899,
        mrp: 999,
        category: "grocery",
        image: "images/products/product_toor_dal_1767374678414.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 30,
        name: "Sugar",
        weight: "1 kg",
        price: 45,
        mrp: 50,
        category: "grocery",
        image: "images/products/product_tata_salt_1767374625958.png",
        badge: null,
        inStock: true
    },
    {
        id: 31,
        name: "Rajma (Kidney Beans)",
        weight: "500 g",
        price: 75,
        mrp: 85,
        category: "grocery",
        image: "images/products/product_toor_dal_1767374678414.png",
        badge: null,
        inStock: true
    },
    {
        id: 32,
        name: "Chana Dal",
        weight: "1 kg",
        price: 135,
        mrp: 150,
        category: "grocery",
        image: "images/products/product_toor_dal_1767374678414.png",
        badge: null,
        inStock: true
    },
    {
        id: 33,
        name: "Sunflower Oil",
        weight: "1 Litre",
        price: 165,
        mrp: 180,
        category: "grocery",
        image: "images/products/product_fortune_oil_1767374643098.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 34,
        name: "Besan (Gram Flour)",
        weight: "1 kg",
        price: 85,
        mrp: 95,
        category: "grocery",
        image: "images/products/product_aashirvaad_atta_1767374658902.png",
        badge: null,
        inStock: true
    },
    // More Snacks
    {
        id: 35,
        name: "Kurkure Masala Munch",
        weight: "85 g",
        price: 20,
        mrp: 20,
        category: "snacks",
        image: "images/products/product_parle_g_1767374730041.png",
        badge: null,
        inStock: true
    },
    {
        id: 36,
        name: "Haldiram Bhujia",
        weight: "200 g",
        price: 60,
        mrp: 70,
        category: "snacks",
        image: "images/products/product_parle_g_1767374730041.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 37,
        name: "Britannia Good Day Cookies",
        weight: "200 g",
        price: 45,
        mrp: 50,
        category: "snacks",
        image: "images/products/product_parle_g_1767374730041.png",
        badge: null,
        inStock: true
    },
    {
        id: 38,
        name: "Tea - Tata Tea Gold",
        weight: "500 g",
        price: 275,
        mrp: 295,
        category: "snacks",
        image: "images/products/product_maggi_noodles_1767374696338.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 39,
        name: "Nescafe Coffee",
        weight: "50 g",
        price: 185,
        mrp: 205,
        category: "snacks",
        image: "images/products/product_maggi_noodles_1767374696338.png",
        badge: null,
        inStock: true
    },
    {
        id: 40,
        name: "Bournvita Health Drink",
        weight: "500 g",
        price: 295,
        mrp: 325,
        category: "snacks",
        image: "images/products/product_maggi_noodles_1767374696338.png",
        badge: "discount",
        inStock: true
    },
    // More Dairy
    {
        id: 41,
        name: "Amul Lassi",
        weight: "200 ml",
        price: 18,
        mrp: 20,
        category: "dairy",
        image: "images/products/product_amul_butter_1767374713964.png",
        badge: null,
        inStock: true
    },
    {
        id: 42,
        name: "Amul Curd",
        weight: "400 g",
        price: 42,
        mrp: 45,
        category: "dairy",
        image: "images/products/product_amul_butter_1767374713964.png",
        badge: null,
        inStock: true
    },
    {
        id: 43,
        name: "Mother Dairy Ghee",
        weight: "500 ml",
        price: 325,
        mrp: 350,
        category: "dairy",
        image: "images/products/product_amul_butter_1767374713964.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 44,
        name: "Amul Ice Cream",
        weight: "1 Litre",
        price: 225,
        mrp: 250,
        category: "dairy",
        image: "images/products/product_amul_butter_1767374713964.png",
        badge: "new",
        inStock: true
    },
    // More Fruits & Vegetables
    {
        id: 45,
        name: "Fresh Apples",
        weight: "1 kg",
        price: 120,
        mrp: 140,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 46,
        name: "Bananas",
        weight: "1 dozen",
        price: 48,
        mrp: 60,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: null,
        inStock: true
    },
    {
        id: 47,
        name: "Green Capsicum",
        weight: "500 g",
        price: 55,
        mrp: 65,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: null,
        inStock: true
    },
    {
        id: 48,
        name: "Fresh Spinach (Palak)",
        weight: "500 g",
        price: 25,
        mrp: 30,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: null,
        inStock: true
    },
    {
        id: 49,
        name: "Carrots",
        weight: "500 g",
        price: 28,
        mrp: 35,
        category: "fruits",
        image: "images/categories/category_fruits_vegetables_1767374513991.png",
        badge: null,
        inStock: true
    },
    // More Household
    {
        id: 50,
        name: "Harpic Toilet Cleaner",
        weight: "500 ml",
        price: 95,
        mrp: 110,
        category: "household",
        image: "images/categories/category_household_1767374562623.png",
        badge: "discount",
        inStock: true
    },
    {
        id: 51,
        name: "Colin Glass Cleaner",
        weight: "500 ml",
        price: 105,
        mrp: 120,
        category: "household",
        image: "images/categories/category_household_1767374562623.png",
        badge: null,
        inStock: true
    },
    {
        id: 52,
        name: "Ariel Washing Powder",
        weight: "2 kg",
        price: 299,
        mrp: 335,
        category: "household",
        image: "images/categories/category_household_1767374562623.png",
        badge: "discount",
        inStock: true
    },
    // More Personal Care
    {
        id: 53,
        name: "Ponds Face Cream",
        weight: "50 g",
        price: 115,
        mrp: 130,
        category: "personal",
        image: "images/categories/category_personal_care_1767374598835.png",
        badge: null,
        inStock: true
    },
    {
        id: 54,
        name: "Dettol Soap",
        weight: "125 g x 4",
        price: 185,
        mrp: 205,
        category: "personal",
        image: "images/categories/category_personal_care_1767374598835.png",
        badge: "bestseller",
        inStock: true
    },
    {
        id: 55,
        name: "Fair & lovely Cream",
        weight: "50 g",
        price: 95,
        mrp: 110,
        category: "personal",
        image: "images/categories/category_personal_care_1767374598835.png",
        badge: null,
        inStock: true
    }
];

// Available Coupons
const COUPONS = {
    'MORENA10': { discount: 10, type: 'percent', minOrder: 200, description: '10% off on orders above ₹200' },
    'FIRST20': { discount: 20, type: 'percent', minOrder: 300, description: '20% off on first order above ₹300' },
    'FLAT50': { discount: 50, type: 'flat', minOrder: 500, description: '₹50 off on orders above ₹500' },
    'FLAT100': { discount: 100, type: 'flat', minOrder: 1000, description: '₹100 off on orders above ₹1000' },
    'FRESH15': { discount: 15, type: 'percent', minOrder: 400, description: '15% off on orders above ₹400' }
};

// Store Settings
const STORE_SETTINGS = {
    name: 'MorenaMart',
    tagline: 'Fresh & Affordable',
    phone: '6265643703',
    whatsapp: '916265643703',
    address: 'Main Market Road, Near City Center, Morena, MP 476001',
    timing: 'Mon-Sat: 8 AM - 9 PM, Sunday: 9 AM - 2 PM',
    deliveryCharge: 40,
    freeDeliveryAbove: 500
};

// Export for other scripts
window.PRODUCTS = PRODUCTS;
window.COUPONS = COUPONS;
window.STORE_SETTINGS = STORE_SETTINGS;
