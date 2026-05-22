const BASE_URL =
"https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Create dropdown options
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");

    newOption.innerText = currCode;
    newOption.value = currCode;

    // Default values
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    }

    if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    // Add option to dropdown
    select.append(newOption);
  }

  // Change flag on dropdown change
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update exchange rate
async function updateExchangeRate() {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL =
    `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate =
        data[fromCurr.value.toLowerCase()]
        [toCurr.value.toLowerCase()];

        let finalAmount = amtVal * rate;

        msg.innerText =
        `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

    } catch (error) {
        console.log(error);
        msg.innerText = "Failed to fetch exchange rate";
    }
}
// Update flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let img = element.parentElement.querySelector("img");

  img.src = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
};

// Button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Initial load
window.addEventListener("load", () => {
  updateExchangeRate();

  updateFlag(fromCurr);
  updateFlag(toCurr);
});