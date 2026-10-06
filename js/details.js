import { getCountryByCode, processCountryData } from "./api.js";
import { saveFavorite, getFavorites } from "./favorites.js";
import {
  addToCompare,
  getCompareCountries,
} from "./compare.js";
import { displayMap } from "./map.js";

const params = new URLSearchParams(window.location.search);
const countryCode = params.get("country");

const detailsContainer = document.querySelector("#destination-details");

async function loadCountryDetails() {
  try {
    const countries = await getCountryByCode(countryCode);
    const country = processCountryData(countries[0]);

    displayMap(country.coordinates, country.name);

    detailsContainer.innerHTML = `
      <article class="country-details">
        <img
          src="${country.flag}"
          alt="Flag of ${country.name}"
        />

        <div>
          <h1>${country.name}</h1>
          <p><strong>Official Name:</strong> ${country.officialName}</p>
          <p><strong>Capital:</strong> ${country.capital}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Subregion:</strong> ${country.subregion}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Country Code:</strong> ${country.code}</p>
          <p><strong>Languages:</strong> ${country.languages}</p>
          <p><strong>Currencies:</strong> ${country.currencies}</p>
          <p>
            <strong>Area:</strong>
           ${country.area.toLocaleString()} km²
          </p>
          <p>
            <strong>Bordering Countries:</strong>
            ${
              country.borders.length > 0
                ? country.borders.join(", ")
                : "None"
            }
          </p>
          <p>
            <strong>Coordinates:</strong>
            ${country.coordinates.join(", ")}
          </p>
          <button
  type="button"
  id="favorite-button"
  class="favorite-button"
>
  Add to Favorites
</button>
<button
  type="button"
  id="compare-button"
  class="compare-button"
>
  Add to Compare
</button>
        </div>
      </article>
    `;
    const favoriteButton = document.querySelector("#favorite-button");

const alreadyFavorite = getFavorites().some(
  (favorite) => favorite.code === country.code
);

if (alreadyFavorite) {
  favoriteButton.textContent = "Saved to Favorites";
  favoriteButton.disabled = true;
}

favoriteButton.addEventListener("click", () => {
  saveFavorite(country);

  favoriteButton.textContent = "Saved to Favorites";
  favoriteButton.disabled = true;
});
const compareButton = document.querySelector("#compare-button");

const compareCountries = getCompareCountries();

if (compareCountries.some((item) => item.code === country.code)) {
  compareButton.textContent = "Added to Compare";
  compareButton.disabled = true;
}

compareButton.addEventListener("click", () => {
  const currentCountries = getCompareCountries();

  if (currentCountries.length >= 2) {
    alert("You can compare a maximum of two destinations.");
    return;
  }

  addToCompare(country);

  compareButton.textContent = "Added to Compare";
  compareButton.disabled = true;
});
  } catch (error) {
    detailsContainer.textContent =
      "Unable to load destination details.";

    console.error(error);
  }
}

loadCountryDetails();