document.addEventListener('DOMContentLoaded', function () {
  // Get the element by its class name
  const bgElement = document.querySelector('.bg');  // Use querySelector instead of getElementById

  // Fetch the config data
  fetch('../config.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(configData => {
      // Access the HTML colors from the config file
      const htmlColors = configData.THEME_SETUP.HTML;

      // Define the new background gradient using the colors from the theme
      const newGradient = `linear-gradient(45deg, ${htmlColors[0]} 0%, ${htmlColors[1]} 46%, ${htmlColors[2]} 100%)`;

      // Apply the new background gradient to the .bg element
      bgElement.style.backgroundImage = newGradient;
    })
    .catch(error => {
      console.error('Error loading config.json:', error);
    });
});
