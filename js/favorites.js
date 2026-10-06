const FAVORITES_KEY = "travel-explorer-favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorite(country) {
  const favorites = getFavorites();

  const alreadySaved = favorites.some(
    (favorite) => favorite.code === country.code
  );

  if (!alreadySaved) {
    favorites.push(country);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(countryCode) {
  const favorites = getFavorites().filter(
    (favorite) => favorite.code !== countryCode
  );

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

const favoritesList = document.querySelector("#favorites-list");
const favoritesMessage = document.querySelector("#favorites-message");

if (favoritesList && favoritesMessage) {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesMessage.textContent = "You have no saved destinations yet.";
  } else {
    favoritesMessage.textContent = `You have ${favorites.length} saved destination(s).`;

    favoritesList.innerHTML = favorites
      .map(
        (country) => `
          <article class="destination-card">
            <img
              src="${country.flag}"
              alt="Flag of ${country.name}"
              loading="lazy"
            />

            <div class="destination-card-content">
              <h3>${country.name}</h3>
              <p><strong>Capital:</strong> ${country.capital}</p>
              <p><strong>Region:</strong> ${country.region}</p>
              <p>
                <strong>Population:</strong>
                ${country.population.toLocaleString()}
              </p>

              <a
                href="details.html?country=${country.code}"
                class="details-link"
              >
                View Details
              </a>

              <button
                type="button"
                class="remove-favorite"
                data-country-code="${country.code}"
              >
                Remove from Favorites
              </button>
            </div>
          </article>
        `
      )
      .join("");
  }
}
const removeButtons = document.querySelectorAll(".remove-favorite");

removeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countryCode = button.dataset.countryCode;

    removeFavorite(countryCode);

    window.location.reload();
  });
});