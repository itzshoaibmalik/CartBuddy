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