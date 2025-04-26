// --- Sample Product Data ---
// (Initially just a few featured ones)
const allProducts = [
  { id: 1, name: 'AeroBook Pro 15"', price: 1499.99, rentPrice: 79.99, image: 'https://images.unsplash.com/photo-1695639509828-d4260075e370?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'laptop', buy: true, rent: true, specs: { ram: '16GB', storage: '512GB SSD', cpu: 'Core i7' } },
  { id: 2, name: 'Pixel Phone X', price: 899.00, rentPrice: 49.99, image: 'https://images.unsplash.com/photo-1730818029305-5c53a66f9c6f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'phone', buy: true, rent: true, specs: { screen: '6.4 inch OLED', camera: '50MP', battery: '4500mAh' } },
  { id: 3, name: 'Gamer Console Z', price: 499.50, rentPrice: null, image: 'https://images.unsplash.com/photo-1632803227975-b6a5688c9c46?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'gaming', buy: true, rent: false, specs: { storage: '1TB NVMe', resolution: '4K @ 120Hz', controller: 'Wireless Haptic' } },
  { id: 4, name: 'SoundSphere Mini', price: 129.00, rentPrice: 15.99, image: 'https://images.unsplash.com/photo-1623773458421-af7f8fe20bcb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', type: 'accessory', buy: true, rent: true, specs: { connectivity: 'Bluetooth 5.2', playtime: '15 Hours', waterproof: 'IPX7' } },
  // Add more products later if needed
];

// Function to create HTML for one product card
function createProductCardHTML(product) {
  // Determine price display based on buy/rent options
  const priceHTML = product.buy ? `<span class="product-price">$${product.price.toFixed(2)}</span>` : '';
  const rentPriceHTML = product.rent ? `<span class="product-rent-price">Rent: $${product.rentPrice.toFixed(2)}/mo</span>` : ''; // Example monthly

  // Add basic action buttons (functionality later)
  const buyButtonHTML = product.buy ? `<button class="btn btn-add-cart" data-id="${product.id}" data-type="buy">Add to Cart</button>` : '';
  const rentButtonHTML = product.rent ? `<button class="btn btn-rent-now" data-id="${product.id}" data-type="rent">Rent Now</button>` : '';

  // Basic Specs display
  let specsPreviewHTML = '';
  if (product.specs) {
      specsPreviewHTML = Object.values(product.specs).slice(0, 2).join(' / ') + (Object.keys(product.specs).length > 2 ? '...' : '');
  }

  return `
      <div class="product-card" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <div class="product-pricing">
                  ${priceHTML}
                  ${rentPriceHTML}
              </div>
              <div class="product-details-preview">
                  ${specsPreviewHTML}
              </div>
               <div class="product-actions">
                  ${buyButtonHTML}
                  ${rentButtonHTML}
              </div>
          </div>
      </div>
  `;
}

// Load featured products (first 4 from allProducts)
function loadFeaturedProducts() {
  const productsGrid = document.querySelector('.products-section .product-grid'); // Target specific grid
  if (productsGrid) {
      const featured = allProducts.slice(0, 4); // Get first 4
      if(featured.length > 0) {
          productsGrid.innerHTML = featured.map(createProductCardHTML).join('');
      } else {
           productsGrid.innerHTML = '<p>No featured products to display right now.</p>';
      }

  } else {
       console.warn("Product grid container not found on this page for featured products.");
  }
}

// --- DOMContentLoaded Listener ---
document.addEventListener('DOMContentLoaded', () => {
  // --- Existing Theme Toggle & Mobile Nav Code ---
  // ... (keep the code from previous steps) ...

  // --- CALL loadFeaturedProducts ---
  loadFeaturedProducts(); // Load products when the page is ready

});

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
      if (theme === 'dark') {
          document.body.setAttribute('data-theme', 'dark');
      } else {
          document.body.removeAttribute('data-theme');
      }
      // Optionally save theme to localStorage
      localStorage.setItem('theme', theme);
      console.log("Theme applied:", theme);
  };

  // Apply initial theme on load
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
  applyTheme(savedTheme);

  // Theme toggle button event listener
  if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
          let currentTheme = document.body.getAttribute('data-theme');
          let newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
          applyTheme(newTheme);
          console.log("Theme toggled to:", newTheme);
      });
  } else {
      console.error("Theme toggle button (#theme-toggle) not found!");
  }

  // --- Add other JS functions/calls below or above ---

}); // End of DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // --- Existing Theme Toggle Code ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  // ... (applyTheme function, initial theme load, theme toggle listener) ...

  // --- ADD MOBILE NAV CODE ---
  const navToggleButton = document.getElementById('nav-toggle-button');
  const navLinksContainer = document.getElementById('nav-links-container');

  if (navToggleButton && navLinksContainer) {
      navToggleButton.addEventListener('click', () => {
          // Toggle classes on the button and the links container
          navLinksContainer.classList.toggle('active');
          navToggleButton.classList.toggle('active'); // For hamburger animation
          console.log("Nav toggled. Active state:", navLinksContainer.classList.contains('active'));
      });
  } else {
      if (!navToggleButton) console.error("Nav toggle button (#nav-toggle-button) not found!");
      if (!navLinksContainer) console.error("Nav links container (#nav-links-container) not found!");
  }
  // --- / END MOBILE NAV CODE ---

  // --- Other existing JS function calls can go here ---

}); // End of DOMContentLoaded
// --- Cart Functionality ---

// Get cart from localStorage or initialize an empty array
function getCart() {
  return JSON.parse(localStorage.getItem('cartBuddyCart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cartBuddyCart', JSON.stringify(cart));
}

// Update cart count display in the header
function updateCartCount() {
  const cart = getCart();
  // Calculate total quantity (sum of item.quantity)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartLink = document.getElementById('cartLink'); // Uses the ID we confirmed/added
  if (cartLink) {
      // Update text content based on count
      cartLink.textContent = `Cart ${count > 0 ? `(${count})` : ''}`;
  }
}

// Add item to cart
function addToCart(productId, type) { // type: 'buy' or 'rent'
  // Find the full product details from our allProducts array
  // Note: Convert productId from string (from data attribute) to number for comparison
  const product = allProducts.find(p => p.id === Number(productId));
  if (!product) {
      console.error("Product not found:", productId);
      return; // Exit if product doesn't exist
  }

  let cart = getCart();
  // Create a unique ID for cart items based on product ID and type (e.g., "1-buy", "1-rent")
  const cartItemId = `${productId}-${type}`;

  // Check if the *exact* item (same product ID and same type) is already in the cart
  const existingItemIndex = cart.findIndex(item => item.cartId === cartItemId);

  if (existingItemIndex > -1) {
      // If item (product + type) exists, increment its quantity
      cart[existingItemIndex].quantity += 1;
      console.log(`Incremented quantity for ${cartItemId}. New quantity: ${cart[existingItemIndex].quantity}`);
  } else {
      // If item doesn't exist, add it as a new entry
      const newItem = {
          cartId: cartItemId, // Unique identifier for this product *and* type
          id: product.id,
          name: product.name,
          // Use buy price or rent price based on the 'type' argument
          price: type === 'buy' ? product.price : product.rentPrice,
          image: product.image,
          quantity: 1,
          type: type // Store whether it's a purchase or rental
      };
      cart.push(newItem);
      console.log(`Added new item to cart: ${cartItemId}`);
  }

  saveCart(cart); // Save the updated cart back to localStorage
  updateCartCount(); // Update the header count
   alert(`${product.name} (${type === 'buy' ? 'Purchase' : 'Rental'}) added to cart!`); // User feedback
}

// --- (Keep existing product data and functions like createProductCardHTML, loadFeaturedProducts) ---

// --- DOMContentLoaded Listener ---
document.addEventListener('DOMContentLoaded', () => {
  // --- Existing Theme Toggle & Mobile Nav Code ---
  // ...

  // --- Load Featured Products ---
  loadFeaturedProducts(); // Loads product cards

   // --- Initialize Cart Count on Load ---
  updateCartCount(); // Show correct count when page loads

  // --- Add Event Listener for Product Buttons (using Event Delegation) ---
  const productGrid = document.querySelector('.products-section .product-grid');
  if(productGrid) {
      productGrid.addEventListener('click', (event) => {
          // Check if the clicked element is an 'Add to Cart' or 'Rent Now' button
          const targetButton = event.target.closest('.btn-add-cart, .btn-rent-now');

          if (targetButton) {
              // Prevent default button behavior if necessary (though not really needed here)
              // event.preventDefault();

              // Get the product ID and type from the button's data attributes
              const productId = targetButton.dataset.id;
              const productType = targetButton.dataset.type; // 'buy' or 'rent'

              if (productId && productType) {
                  addToCart(productId, productType);
              } else {
                  console.error("Button is missing data-id or data-type attribute", targetButton);
              }
          }
      });
  } else {
      console.warn("Featured product grid not found for adding button listeners.");
  }

   // --- (Make sure other initial calls like theme application are still here) ---

}); // End of DOMContentLoaded