// --- Basic Setup & Global Variables ---
const productsGrid = document.querySelector('.product-grid'); // For index.html featured
const allProductsGrid = document.getElementById('allProductsGrid'); // For products.html
const cartItemsList = document.getElementById('cartItemsList');
const cartSummaryDiv = document.getElementById('cartSummary');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const cartShippingEl = document.getElementById('cartShipping');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutOrderItemsEl = document.getElementById('checkoutOrderItems');
const summarySubtotalEl = document.getElementById('summarySubtotal');
const summaryShippingEl = document.getElementById('summaryShipping');
const summaryTotalEl = document.getElementById('summaryTotal');
const loginLogoutLink = document.getElementById('loginLogoutLink'); // Get nav link

const allProducts = [
    { id: 1, name: 'AeroBook Pro 15"', price: 1499.99, rentPrice: 79.99, image: 'https://images.unsplash.com/photo-1695639509828-d4260075e370?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'laptop', buy: true, rent: true, specs: { ram: '16GB', storage: '512GB SSD', cpu: 'Core i7' } },
    { id: 2, name: 'Pixel Phone X', price: 899.00, rentPrice: 49.99, image: 'https://images.unsplash.com/photo-1730818029305-5c53a66f9c6f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'phone', buy: true, rent: true, specs: { screen: '6.4 inch OLED', camera: '50MP', battery: '4500mAh' } },
    { id: 3, name: 'Gamer Console Z', price: 499.50, rentPrice: null, image: 'https://images.unsplash.com/photo-1632803227975-b6a5688c9c46?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'gaming', buy: true, rent: false, specs: { storage: '1TB NVMe', resolution: '4K @ 120Hz', controller: 'Wireless Haptic' } },
    { id: 4, name: 'SoundSphere Mini', price: 129.00, rentPrice: 15.99, image: 'https://images.unsplash.com/photo-1623773458421-af7f8fe20bcb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'accessory', buy: true, rent: true, specs: { connectivity: 'Bluetooth 5.2', playtime: '15 Hours', waterproof: 'IPX7' } },
    { id: 5, name: 'WorkPad Tablet', price: 649.00, rentPrice: 34.99, image: 'https://images.unsplash.com/photo-1601836211234-ca6cbde9a1cb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'tablet', buy: true, rent: true, specs: { display: '11 inch Liquid Retina', storage: '128GB', stylus: 'Supported' } },
    { id: 6, name: 'VR Headset Odyssey', price: 399.00, rentPrice: 29.99, image: 'https://plus.unsplash.com/premium_photo-1729708654598-f0e68d8bd0bf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'gaming', buy: true, rent: true, specs: { resolution: '4K per eye', fov: '110 degrees', tracking: 'Inside-out' } },
    { id: 7, name: 'ProCam Drone', price: 1199.00, rentPrice: 99.99, image: 'https://plus.unsplash.com/premium_photo-1677158265072-5d15db9e23b2?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'accessory', buy: true, rent: true, specs: { camera: '4K 60fps', flightTime: '30 mins', range: '10km' } },
    { id: 8, name: 'Smart Watch Series 8', price: 399.00, rentPrice: null, image: 'https://images.unsplash.com/photo-1719075596884-2020f827a8dd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'wearable', buy: true, rent: false, specs: { features: 'ECG, SpO2', display: 'Always-On', waterResist: '50m' } }
];

// --- Product Loading ---

function createProductCardHTML(product) {
    const priceHTML = product.buy ? `<span class="product-price">$${product.price.toFixed(2)}</span>` : '';
    const rentPriceHTML = product.rent ? `<span class="product-rent-price">Rent: $${product.rentPrice.toFixed(2)}/mo</span>` : ''; // Example monthly

    const buyButtonHTML = product.buy ? `<button class="btn btn-add-cart" onclick="addToCart(${product.id}, 'buy')">Add to Cart</button>` : '';
    const rentButtonHTML = product.rent ? `<button class="btn btn-rent-now" onclick="addToCart(${product.id}, 'rent')">Rent Now</button>` : '';

    let specsListHTML = '<ul class="specs-list">';
    if (product.specs) {
        for (const [key, value] of Object.entries(product.specs)) {
            specsListHTML += `<li><span>${key.charAt(0).toUpperCase() + key.slice(1)}:</span> <span>${value}</span></li>`;
        }
    }
    specsListHTML += '</ul>';


    return `
        <div class="product-card" data-id="${product.id}" data-type="${product.type}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-pricing">
                     ${priceHTML}
                     ${rentPriceHTML}
                 </div>
                 <div class="product-actions">
                     ${buyButtonHTML}
                     ${rentButtonHTML}
                </div>
                <!-- Simple Specs Preview -->
                <div class="product-details-preview" style="font-size: 0.85rem; color: #666; margin-top: 0.75rem;">
                    ${Object.values(product.specs || {}).slice(0, 2).join(' / ')}...
                </div>
                 <!-- Full details could be shown on hover/click later -->
                 <!-- <div class="product-details"> ${specsListHTML} </div> -->
             </div>
        </div>
    `;
}

// Load featured products on index.html
function loadFeaturedProducts() {
    if (productsGrid) {
        const featured = allProducts.slice(0, 4); // Display first 4 as featured
        productsGrid.innerHTML = featured.map(createProductCardHTML).join('');
    }
}

function loadAllProducts(filterType = null) { // filterType: null, 'buy', 'rental'
    if (allProductsGrid) {
        let productsToDisplay = allProducts;

        if (filterType === 'buy') {
            productsToDisplay = allProducts.filter(p => p.buy);
            document.getElementById('productsPageTitle').textContent = "Shop Our Tech";
            document.getElementById('productsPageSubtitle').textContent = "Browse products available for purchase.";
        } else if (filterType === 'rental') {
            productsToDisplay = allProducts.filter(p => p.rent);
             document.getElementById('productsPageTitle').textContent = "Rent The Latest Tech";
            document.getElementById('productsPageSubtitle').textContent = "Try out the newest gadgets with our flexible rental options.";
        } else {
             // 'all' or null
             document.getElementById('productsPageTitle').textContent = "Discover Our Tech";
             document.getElementById('productsPageSubtitle').textContent = "Browse our extensive collection of the latest gadgets available for purchase or rent.";
        }


        if (productsToDisplay.length > 0) {
            allProductsGrid.innerHTML = productsToDisplay.map(createProductCardHTML).join('');
        } else {
            allProductsGrid.innerHTML = '<p>No products found matching your criteria.</p>';
        }
         updateFilterButtons(filterType); // Highlight active filter button
    }
}

function setupProductFilters() {
    const filterAllBtn = document.getElementById('filterAllBtn');
    const filterBuyBtn = document.getElementById('filterBuyBtn');
    const filterRentBtn = document.getElementById('filterRentBtn');

    filterAllBtn?.addEventListener('click', () => loadAllProducts(null));
    filterBuyBtn?.addEventListener('click', () => loadAllProducts('buy'));
    filterRentBtn?.addEventListener('click', () => loadAllProducts('rental'));
}

function updateFilterButtons(activeFilter) {
     const buttons = document.querySelectorAll('.filter-controls button');
     buttons.forEach(btn => btn.classList.remove('active'));

     if (activeFilter === 'buy') {
         document.getElementById('filterBuyBtn')?.classList.add('active');
     } else if (activeFilter === 'rental') {
         document.getElementById('filterRentBtn')?.classList.add('active');
     } else {
         document.getElementById('filterAllBtn')?.classList.add('active');
     }
 }



function getCart() {
    return JSON.parse(localStorage.getItem('cartBuddyCart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cartBuddyCart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId, type) { // type: 'buy' or 'rent'
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    let cart = getCart();
    const cartItemId = `${productId}-${type}`;

    const existingItemIndex = cart.findIndex(item => item.cartId === cartItemId);

    if (existingItemIndex > -1) {
        // If item already exists, increment quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // Add new item
        cart.push({
            cartId: cartItemId, // Unique identifier for this product *and* type (buy/rent)
            id: product.id,
            name: product.name,
            price: type === 'buy' ? product.price : product.rentPrice,
            image: product.image,
            quantity: 1,
            type: type // Store whether it's a purchase or rental
        });
    }

    saveCart(cart);
    alert(`${product.name} (${type === 'buy' ? 'Purchase' : 'Rental'}) added to cart!`);
    updateCartCount(); // Update cart count in header (optional)
}


function removeFromCart(cartItemId) {
    let cart = getCart();
    cart = cart.filter(item => item.cartId !== cartItemId);
    saveCart(cart);
    loadCartItems(); // Reload cart display
}

function updateCartQuantity(cartItemId, change) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.cartId === cartItemId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
        loadCartItems(); // Reload cart display
    }
}


function loadCartItems() {
    if (!cartItemsList || !cartSummaryDiv) return; // Only run on cart page

    const cart = getCart();
    cartItemsList.innerHTML = ''; // Clear current list

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart-message">
                Your cart is currently empty. <a href="products.html">Start Shopping!</a>
            </div>`;
        cartSummaryDiv.style.display = 'none'; // Hide summary if cart is empty
    } else {
        let subtotal = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            const itemHTML = `
                <div class="cart-item" data-cartid="${item.cartId}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <span class="item-type">${item.type === 'buy' ? 'Purchase' : 'Rental (Monthly)'}</span>
                    </div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                         <button onclick="updateCartQuantity('${item.cartId}', -1)">-</button>
                         <input type="number" value="${item.quantity}" min="1" readonly> <!-- Make readonly or implement direct input update -->
                          <button onclick="updateCartQuantity('${item.cartId}', 1)">+</button>
                     </div>

                    <div class="cart-item-remove">
                        <button onclick="removeFromCart('${item.cartId}')" title="Remove Item">🗑️</button>
                    </div>

                     <!-- Alternative: Display total per item -->
                     <!-- <div class="cart-item-total">$${itemTotal.toFixed(2)}</div> -->
                </div>
            `;
            cartItemsList.insertAdjacentHTML('beforeend', itemHTML);
        });

        const shippingCost = cart.length > 0 ? 5.00 : 0; // Example fixed shipping
        const total = subtotal + shippingCost;

        cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        cartShippingEl.textContent = `$${shippingCost.toFixed(2)}`;
        cartTotalEl.textContent = `$${total.toFixed(2)}`;

        cartSummaryDiv.style.display = 'block'; // Show summary
    }
    updateCartCount();
}

// Clear the entire cart (e.g., after checkout)
function clearCart() {
    localStorage.removeItem('cartBuddyCart');
    // Optionally update UI elements immediately
    if (cartItemsList) loadCartItems();
     if (checkoutOrderItemsEl) loadCheckoutSummary();
    updateCartCount();
}

// --- Checkout Page Functionality ---

function loadCheckoutSummary() {
     if (!checkoutOrderItemsEl || !summarySubtotalEl) return; // Only run on checkout page

     const cart = getCart();
     checkoutOrderItemsEl.innerHTML = ''; // Clear current list

     if (cart.length === 0) {
         checkoutOrderItemsEl.innerHTML = '<p>Your cart is empty. Cannot proceed to checkout.</p>';
         // Disable form/button?
         summarySubtotalEl.textContent = "$0.00";
         summaryShippingEl.textContent = "$0.00";
         summaryTotalEl.textContent = "$0.00";
         document.querySelector('.place-order-btn')?.setAttribute('disabled', 'true');
         return;
     } else {
          document.querySelector('.place-order-btn')?.removeAttribute('disabled');
     }

     let subtotal = 0;
     cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
         const itemHTML = `
             <div class="order-summary-item">
                 <img src="${item.image}" alt="${item.name}">
                 <div class="order-summary-item-info">
                    <span class="item-name">${item.name} ${item.type === 'rent' ? '(Rental)' : ''}</span>
                    <span class="item-qty">Qty: ${item.quantity}</span>
                 </div>
                 <span class="order-summary-item-price">$${itemTotal.toFixed(2)}</span>
            </div>
         `;
         checkoutOrderItemsEl.insertAdjacentHTML('beforeend', itemHTML);
     });

    const shippingCost = 5.00; // Assume fixed shipping
     const total = subtotal + shippingCost;

     summarySubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
     summaryShippingEl.textContent = `$${shippingCost.toFixed(2)}`;
     summaryTotalEl.textContent = `$${total.toFixed(2)}`;
 }


// --- Login/Logout Status ---
function updateLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loginLogoutLink) {
        if (isLoggedIn) {
            loginLogoutLink.textContent = 'Logout';
            loginLogoutLink.href = '#'; // Prevent default link behavior
            loginLogoutLink.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                alert('You have been logged out.');
                updateLoginStatus(); // Update link text back to Login
                 // Optional: Redirect to home or login page after logout
                // window.location.href = 'index.html';
            };
        } else {
            loginLogoutLink.textContent = 'Login';
            loginLogoutLink.href = 'login.html';
            loginLogoutLink.onclick = null; // Remove the logout handler
        }
    }
}


// --- Sample Product Data ---
// Using Unsplash source for varied placeholder images
// Removed duplicate declaration of allProducts

// ... rest of script.js remains the same ...

// --- Cart Count Indicator (Ensure this exists or add it) ---
function updateCartCount() {
   const cart = getCart();
   const count = cart.reduce((sum, item) => sum + item.quantity, 0);
   const cartLink = document.getElementById('cartLink'); // Use the ID added to the cart link
   if (cartLink) {
       cartLink.textContent = `Cart ${count > 0 ? `(${count})` : ''}`;
   }
}

// Make sure loadFeaturedProducts targets the correct grid on index.html
// Removed duplicate declaration of productsGrid

// ... rest of your script.js ...



// --- Cart Count Indicator (Optional) ---
function updateCartCount() {
     const cart = getCart();
     const count = cart.reduce((sum, item) => sum + item.quantity, 0);
     const cartLink = document.querySelector('nav ul li a[href="cart.html"]');
     if (cartLink) {
         cartLink.textContent = `Cart ${count > 0 ? `(${count})` : ''}`;
     }
 }


// --- Deals Slider Animation (Keep existing logic if present) ---
const dealsContainer = document.querySelector('.deals');
if (dealsContainer) {
    // Basic animation restart logic if needed (or just rely on CSS animation)
    // This might need refinement depending on how the CSS animation is set up
}


// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts(); // Load products on index page
    // loadAllProducts(); // Load products on products page is handled by its own script block now
    loadCartItems(); // Load cart items if on cart page
    loadCheckoutSummary(); // Load summary if on checkout page
    updateLoginStatus(); // Check login status on page load
    updateCartCount(); // Show initial cart count

    // Add any general event listeners here
});

// --- Wait for DOM to be Ready ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selection (Check Console if these are null!) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const navToggleButton = document.getElementById('nav-toggle-button');
    const navLinksContainer = document.getElementById('nav-links-container');
    const loginLogoutLink = document.getElementById('loginLogoutLink');
    const cartLink = document.getElementById('cartLink');
    const featuredProductsGrid = document.querySelector('.products-section .product-grid'); // For index page
    // Add other element selections needed globally or within functions


    // --- Theme Toggle Logic ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
        console.log("Theme applied:", theme); // Debugging
    };

    // Apply initial theme
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light if nothing saved
    applyTheme(savedTheme);

    // Theme toggle button event listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let currentTheme = document.body.getAttribute('data-theme');
            let newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
            applyTheme(newTheme);
             console.log("Theme toggled to:", newTheme); // Debugging
        });
    } else {
        console.error("Theme toggle button (#theme-toggle) not found!");
    }


    // --- Mobile Navigation Toggle Logic ---
    if (navToggleButton && navLinksContainer) {
        navToggleButton.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            navToggleButton.classList.toggle('active'); // For hamburger animation
            console.log("Nav toggled. Active state:", navLinksContainer.classList.contains('active')); // Debugging
        });
    } else {
        if (!navToggleButton) console.error("Nav toggle button (#nav-toggle-button) not found!");
        if (!navLinksContainer) console.error("Nav links container (#nav-links-container) not found!");
    }


    // --- Initialize Other Functions (Place your existing calls here) ---
    if (typeof loadFeaturedProducts === 'function' && featuredProductsGrid) {
        loadFeaturedProducts();
    }
    if (typeof loadCartItems === 'function') { // Check if function exists before calling
         loadCartItems();
    }
    if (typeof loadCheckoutSummary === 'function') {
         loadCheckoutSummary();
    }
    if (typeof updateLoginStatus === 'function') {
         updateLoginStatus();
    }
    if (typeof updateCartCount === 'function') {
         updateCartCount();
    }
     if (typeof loadAllProducts === 'function' && document.getElementById('allProductsGrid')) {
         // Handle initial product page load (consider URL params)
         const urlParams = new URLSearchParams(window.location.search);
         const initialType = urlParams.get('type') || urlParams.get('category'); // Simplified check
         loadAllProducts(initialType);
         if (typeof setupProductFilters === 'function') {
             setupProductFilters();
         }
    }
     // Add initial calls for login/signup page specific scripts if needed

     console.log("DOM fully loaded and script initialized."); // Debugging

}); // --- End of DOMContentLoaded ---


// ========================================= //
//      YOUR EXISTING FUNCTIONS BELOW        //
// (getCart, saveCart, addToCart,           //
//  removeFromCart, updateCartQuantity,     //
//  clearCart, updateLoginStatus,           //
//  updateCartCount, loadFeaturedProducts,   //
//  createProductCardHTML, loadAllProducts,  //
//  setupProductFilters, loadCartItems,      //
//  loadCheckoutSummary etc...)             //
// ========================================= //

// Example placeholder for updateLoginStatus if you don't have it
function updateLoginStatus() {
    const loginLogoutLink = document.getElementById('loginLogoutLink');
    if (loginLogoutLink) {
         const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
         if (isLoggedIn) {
             loginLogoutLink.textContent = 'Logout';
             loginLogoutLink.href = '#';
             loginLogoutLink.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                alert('Logged out.');
                window.location.reload(); // Reload to reflect change everywhere
             };
         } else {
             loginLogoutLink.textContent = 'Login';
             loginLogoutLink.href = 'login.html';
             loginLogoutLink.onclick = null;
         }
     }
 }

 // Example placeholder for updateCartCount
 function updateCartCount() {
    const cartLink = document.getElementById('cartLink');
    if (cartLink) {
         // Assume getCart exists and returns an array
        const cart = typeof getCart === 'function' ? getCart() : [];
         const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartLink.textContent = `Cart ${count > 0 ? `(${count})` : ''}`;
     }
 }