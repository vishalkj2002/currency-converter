import { country_list } from "./countryList.js";

const dropList = document.querySelectorAll(".drop-list select");

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
}
