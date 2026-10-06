const API_KEY = "rc_live_5a4da38230f443bc808effa21959aaeb";
const API_BASE_URL = "https://api.restcountries.com/countries/v5";

export async function searchCountries(countryName) {
  const response = await fetch(
    `${API_BASE_URL}?q=${encodeURIComponent(countryName)}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Country not found.");
  }

  const result = await response.json();

  return result.data.objects;
}

export function processCountryData(country) {
  
  return {
    name: country.names?.common || "Unknown",
    officialName: country.names?.official || "Unknown",
    languages: country.languages
  ? Object.values(country.languages)
      .map((language) => language.name || language)
      .join(", ")
  : "N/A",
currencies: country.currencies
  ? Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol || ""})`)
      .join(", ")
  : "N/A",
    capital: country.capitals?.[0]?.name || "N/A",
    region: country.region || "N/A",
    subregion: country.subregion || "N/A",
    flag: country.flag?.url_svg || "",
    flagEmoji: country.flag?.emoji || "",
    code: country.codes?.alpha_2 || "",
    population: country.population || 0,
    area: country.area?.kilometers || 0,
borders: Array.isArray(country.borders) ? country.borders : [],
    coordinates: country.capitals?.[0]?.coordinates
      ? [
          country.capitals[0].coordinates.lat,
          country.capitals[0].coordinates.lng,
        ]
      : [],
  };
}

export async function getCountryByCode(countryCode) {
  const response = await fetch(
    `${API_BASE_URL}/codes.alpha_2/${encodeURIComponent(countryCode)}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Destination not found.");
  }

  const result = await response.json();

  return result.data.objects;
}

console.log("api.js loaded");