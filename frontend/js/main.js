document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navContainer = document.getElementById('nav-container');

  if (hamburgerBtn && navContainer) {
    hamburgerBtn.addEventListener('click', () => {
      navContainer.classList.toggle('active');
    });
  }
});
