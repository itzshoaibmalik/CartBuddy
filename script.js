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