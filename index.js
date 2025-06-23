const search = document.querySelector("#search");
const countriesInput = document.querySelector("#countries-input");
const countriesOutput = document.querySelector("#countries-output");

function showCountry(countries) {
    countriesOutput.innerHTML = countries.map((c) => `<li>${c.name.common}</li>`).join("");
}

function fetchCountries() {
    const query = countriesInput.value.trim();
    if (!query) {
        countriesOutput.innerHTML = "";
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then((country) => country.json())
        .then((data) => {
            if (data.length > 10) {
                countriesOutput.innerHTML = "";
            } else if (data.length > 1) {
                showCountry(data);
            } else if (data.length === 1) {
                showCountryAll(data[0]);
            }
        })
        .catch(() => {
            countriesOutput.innerHTML = "";
        });
}

search.addEventListener("click", fetchCountries);

function showCountryAll(country) {
    const languages = Object.values(country.languages);
    countriesOutput.innerHTML = `
    <li>
      <h2>${country.name.common}</h2>
      <h2>Capital: ${country.capital ? country.capital[0] : "N/A"}</h2>
      <h2>Population: ${country.population.toLocaleString()}</h2>
      <h2>Languages: ${languages}</h2>
      <img src="${country.flags.svg}" alt="${country.name}" />
    </li>`;
}
