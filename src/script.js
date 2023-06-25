const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const country = document.querySelector(".country");
const allCountries = document.querySelector(".allCountries");
const search = document.querySelector(".search");
const regions = document.querySelectorAll(".region-filter");
const countryDetail = document.getElementById("country-detail");
const closeBtn = document.querySelector(".closeBtn");
// const darkMode = document.querySelector(".dark-mode");

async function getData() {
  const url = await fetch("https://restcountries.com/v3.1/all");
  const resp = await url.json();
  console.log(resp);
  resp.forEach((reqData) => {
    showCountry(reqData);
  });
}

getData();

function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `
  <img class="object-cover h-40 w-full" src=${data.flags.svg} alt="" />
          <div class="pl-3 pt-3">
            <h2 class="text-md font-bold common-name">${data.name.common}</h2>
            <div class="text-sm pt-3 leading-6 text-neutral-700">
              <p><strong>Population : </strong>${data.population}</p>
              <p class="region-name"><strong>Region : </strong>${data.region}</p>
              <p><strong>Capital : </strong>${data.capital}</p>
            </div>
           </div> 


  `;

  country.addEventListener("click", () => {
    countryDetail.style.display = "flex-col";
    allCountries.style.display = "none";
    showCountryDetail(data);
  });

  allCountries.appendChild(country);
}

function showCountryDetail(country) {
  countryDetail.innerHTML = `
  <button
          class="closeBtn flex items-center gap-2 text-sm b-shadow px-6 py-2 mb-10"
        >
          <ion-icon name="arrow-back"></ion-icon>Back
        </button>
        <div class="flex gap-12">
          <div class="w-2/6">
            <img class="object-cover h-60" src="${country.flags.svg}" alt="" />
          </div>

          <div class="w-2/4 ">
            <h2 class="text-2xl font-bold pb-6">${country.name.common}</h2>
            <div class="flex flex-row text-neutral-700 text-sm leading-7">
              <div class="w-full">
                <p>
                  <strong>Native Name : </strong>${country.name.nativeName}
                </p>
                <p><strong>Population : </strong>${country.population}</p>
                <p><strong>Region : </strong>${country.region}</p>
                <p><strong>Sub Region : </strong>${country.subregion}</p>
                <p><strong>Capital : </strong>${country.capital}</p>
              </div>

              <div class="">
                <p><strong>Top Level Domain : </strong>${
                  country.tld[1] || ""
                }</p>
                <p><strong>Currencies : </strong></p>
                <p><strong>Languages : </strong></p>
              </div>
            </div>
          </div>
        </div>
  `;
}

closeBtn.addEventListener("click", () => {
  countryDetail.style.display = "none";
});

const comName = document.getElementsByClassName("common-name");

search.addEventListener("input", (e) => {
  Array.from(comName).forEach((countryName) => {
    if (
      countryName.innerText.toLowerCase().includes(search.value.toLowerCase())
    ) {
      countryName.parentElement.parentElement.style.display = "grid";
    } else {
      countryName.parentElement.parentElement.style.display = "none";
    }
  });
});

const regName = document.getElementsByClassName("region-name");

regions.forEach((region) => {
  console.log(region);
  region.addEventListener("click", (e) => {
    Array.from(regName).forEach((reg) => {
      console.log(reg);
      if (reg.innerText.includes(region.innerText)) {
        reg.parentElement.parentElement.parentElement.style.display = "grid";
      } else {
        reg.parentElement.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

const toggleDropdown = function () {
  dropdownMenu.classList.toggle("hidden");
};

dropdownBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDropdown();
});

document.documentElement.addEventListener("click", function () {
  if (!dropdownMenu.classList.contains("hidden")) {
    toggleDropdown();
  }
});

// darkMode.addEventListener("click", () => {
//   document.body.classList.toggle("dark");
// });
