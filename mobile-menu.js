// Mobile Sidebar Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileSidebarClose = document.getElementById('mobileSidebarClose');
    const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
    const mobileSidebarLinks = document.querySelectorAll('.mobile-sidebar-link');
    const mobileCategoryLinks = document.querySelectorAll('.mobile-category-link');

    // Open mobile sidebar
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openMobileSidebar();
        });
    }

    // Close mobile sidebar
    if (mobileSidebarClose) {
        mobileSidebarClose.addEventListener('click', closeMobileSidebar);
    }

    if (mobileSidebarOverlay) {
        mobileSidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // Close sidebar when clicking navigation links
    mobileSidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileSidebar();
        });
    });

    // Handle category link clicks
    mobileCategoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.dataset.category;

            // Update category nav active state
            document.querySelectorAll('.category-nav-link').forEach(l => {
                l.classList.toggle('active', l.dataset.category === category);
            });

            // Render filtered products
            if (typeof PRODUCTS !== 'undefined' && typeof renderProducts === 'function') {
                renderProducts(PRODUCTS, category);
            }

            // Close sidebar
            closeMobileSidebar();

            // Scroll to products
            setTimeout(() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    });

    // Update mobile nav active state on page load and hash change
    function handleHashChange() {
        const hash = window.location.hash || '#home';
        updateMobileNavActive(hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});

// Prevent body scroll when sidebar is open
function openMobileSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('mobileSidebarOverlay');
    const menuBtn = document.getElementById('mobileMenuBtn');

    if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        if (menuBtn) menuBtn.classList.add('active');
        document.body.classList.add('sidebar-open');
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
        document.body.classList.remove('sidebar-open');
        document.body.style.overflow = '';
    }
}

// Export functions for global use
window.openMobileSidebar = openMobileSidebar;
window.closeMobileSidebar = closeMobileSidebar;
