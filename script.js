import { country_list } from "./countryList.js";

const dropList = document.querySelectorAll(".drop-list select");
const exchangeRateButton = document.getElementById("get-exchange-rate");
const convertCurrencyButton = document.getElementById("convert-currency");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const exchangeRateText = document.getElementById("exchange-rate-text");
const amount = document.getElementById("amount");
let amountValue = amount.value;
const convertedAmount = document.getElementById("converted-amount");
let convertedAmountValue = convertedAmount.value;
let globalExchangeRate;
const exchangeIcon = document.getElementById("exchange-icon");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected = "";
    if (i === 0 && currency_code === "USD") {
      selected = "selected";
    } else if (i === 1 && currency_code === "INR") {
      selected = "selected";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

amount.addEventListener("input", (e) => {
  amountValue = e.target.value;
});

exchangeRateButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

convertCurrencyButton.addEventListener("click", (e) => {
  e.preventDefault();
  convertCurrency();
});

exchangeIcon.addEventListener("click", (e) => {
  exchangeConversionCurrency();
});

window.addEventListener("load", (e) => {
  getExchangeRate();
});

async function getExchangeRate() {
  exchangeRateButton.classList.add("loading");
  exchangeRateButton.textContent = "Loading Exchange Rate...";
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/08fdca54154709c00ed6cf81/latest/${fromCurrency.value}`
    );

    if (response.ok) {
      const data = await response.json();
      let exchangeRate = data.conversion_rates[toCurrency.value];
      globalExchangeRate = exchangeRate;
      exchangeRateText.textContent = `1 ${fromCurrency.value} = ${exchangeRate} ${toCurrency.value}`;

      convertCurrencyButton.disabled = false;
    } else {
      exchangeRateText.textContent = "Failed to fetch exchange rate";
    }
  } catch (error) {
    exchangeRateText.textContent = "Error fetching exchange rate";
  } finally {
    exchangeRateButton.textContent = "Get Exchange Rate";
    exchangeRateButton.classList.remove("loading");
  }
}

function convertCurrency() {
  convertedAmountValue =
    parseFloat(amountValue) * parseFloat(globalExchangeRate);
  convertedAmount.value = convertedAmountValue;
}

function exchangeConversionCurrency() {
  const tempValue = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempValue;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
}

function loadFlag(element) {
  const currencyCode = element.value;
  const imgTag = element.parentElement.querySelector("img");

  if (imgTag && country_list[currencyCode]) {
    imgTag.src = `https://flagsapi.com/${country_list[currencyCode]}/flat/64.png`;
    imgTag.alt = `${currencyCode} flag`;
  }
}
