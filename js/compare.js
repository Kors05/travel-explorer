const COMPARE_KEY = "travel-explorer-compare";

export function getCompareCountries() {
  return JSON.parse(localStorage.getItem(COMPARE_KEY)) || [];
}

export function addToCompare(country) {
  const countries = getCompareCountries();

  const alreadyAdded = countries.some(
    (item) => item.code === country.code
  );

  if (!alreadyAdded && countries.length < 2) {
    countries.push(country);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(countries));
  }
}

export function removeFromCompare(countryCode) {
  const countries = getCompareCountries().filter(
    (country) => country.code !== countryCode
  );

  localStorage.setItem(COMPARE_KEY, JSON.stringify(countries));
}

const compareResults = document.querySelector("#compare-results");
const compareMessage = document.querySelector("#compare-message");

if (compareResults && compareMessage) {
  const countries = getCompareCountries();

  if (countries.length === 0) {
    compareMessage.textContent = "No destinations selected for comparison.";
  } else {
    compareMessage.textContent = `Comparing ${countries.length} destination(s).`;

    compareResults.innerHTML = countries
      .map(
        (country) => `
          <article class="destination-card">
            <img
              src="${country.flag}"
              alt="Flag of ${country.name}"
              loading="lazy"
            />

            <div class="destination-card-content">
              <h2>${country.name}</h2>
              <p><strong>Capital:</strong> ${country.capital}</p>
              <p><strong>Region:</strong> ${country.region}</p>
              <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p><strong>Languages:</strong> ${country.languages}</p>
              <p><strong>Currency:</strong> ${country.currencies}</p>
              <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
              <p><strong>Coordinates:</strong> ${country.coordinates.join(", ")}</p>

              <button
                type="button"
                class="remove-compare"
                data-country-code="${country.code}"
              >
                Remove
              </button>
            </div>
          </article>
        `
      )
      .join("");
  }
}

const removeCompareButtons = document.querySelectorAll(".remove-compare");

removeCompareButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countryCode = button.dataset.countryCode;

    removeFromCompare(countryCode);

    window.location.reload();
  });
});