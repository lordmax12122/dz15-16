const search = document.querySelector("#search");
const countriesInput = document.querySelector("#countries-input");
const countriesOutput = document.querySelector("#countries-output");

function showCountry(countries) {
    countriesOutput.innerHTML = countries.map((c) => `<li>${c.name.common}</li>`).join("");
}

async function fetchCountries() {
    const query = countriesInput.value.trim();
    if (!query) {
        countriesOutput.innerHTML = "";
        return;
    }
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        const data = await res.json();

        if (data.length > 10) {
            countriesOutput.innerHTML = "";
        } else if (data.length > 1) {
            showCountry(data);
        } else if (data.length === 1) {
            showCountryAll(data[0]);
        }
    } catch {
        countriesOutput.innerHTML = "";
    }
}

search.addEventListener("click", fetchCountries);

function showCountryAll(country) {
    const languages = Object.values(country.languages);
    countriesOutput.innerHTML = `
    <li>
      <h2>${country.name.common}</h2>
      <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
      <p>Population: ${country.population.toLocaleString()}</p>
      <p>Languages: ${languages}</p>
      <img src="${country.flags.svg}" alt=""  />
    </li>`;
}


