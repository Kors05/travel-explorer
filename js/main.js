const header = document.querySelector("#main-header");

header.innerHTML = `
  <nav class="site-nav">
    <a href="index.html" class="site-logo">Travel Explorer</a>

    <button
      class="menu-button"
      id="menu-button"
      type="button"
      aria-label="Open navigation menu"
      aria-expanded="false"
      aria-controls="main-menu"
    >
      ☰
    </button>

    <ul class="nav-menu" id="main-menu">
      <li>
        <a href="index.html">Home</a>
      </li>
      <li>
        <a href="favorites.html">Favorites</a>
      </li>
      <li>
        <a href="compare.html">Compare</a>
      </li>
    </ul>
  </nav>
`;

const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#main-menu");

menuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", isOpen);
});

const footer = document.querySelector("#main-footer");

footer.innerHTML = `
  <div class="site-footer">
    <p>&copy; ${new Date().getFullYear()} Travel Explorer. All rights reserved.</p>
    <p>Explore the world, one destination at a time.</p>
  </div>
`;