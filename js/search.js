console.log("search.js is working");
import { searchCountries, processCountryData } from "./api.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#country-search");
const searchMessage = document.querySelector("#search-message");

const destinationResults = document.querySelector("#destination-results");

searchForm.addEventListener("submit", async (event) => {
console.log("Search form submitted");
    event.preventDefault();

  const countryName = searchInput.value.trim();

  if (!countryName) {
    searchMessage.textContent = "Please enter a country name.";
    searchMessage.className = "error-message";
    return;
  }

  searchMessage.textContent = `Searching for ${countryName}...`;
  searchMessage.className = "";

  try {
    const countries = await searchCountries(countryName);
    const processedCountries = countries.map(processCountryData);
    if (countries.length === 0) {
  throw new Error("No destinations found. Please try another country name.");
}

    destinationResults.innerHTML = processedCountries
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
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>

          <a
  href="details.html?country=${country.code}"
  class="details-link"
>
  View Details
</a>
        </div>
      </article>
    `
  )
  .join("");

    console.log("Raw country data:", JSON.stringify(countries[0], null, 2));
    console.log("Processed country data:", processedCountries);

    searchMessage.textContent = `Found ${countries.length} destination(s).`;
    console.log(countries);
 } catch (error) {
  console.error("Search error:", error);

  destinationResults.innerHTML = "";

  searchMessage.textContent =
    "Unable to find that destination. Please check the country name and try again.";

  searchMessage.className = "error-message";
}
});