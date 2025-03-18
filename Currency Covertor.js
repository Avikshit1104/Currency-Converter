const BASE_URL ="https://api.fxfeed.io/v1/latest?";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateExchangeRate = async()=>{
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if(amountVal === "" || amountVal < 1){
    amount.value = "1";
    amountVal = 1;
  }
  const URL = `${BASE_URL}base=${fromCurr.value}&currencies=${toCurr.value}&api_key=demo`;
  let response = await fetch (URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  console.log(rate);

  let finalAmt = amountVal * rate;
  console.log(finalAmt);
  msg.innerText =   `${amount.value} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag =(element)=>{
  let curCode = element.value;
  let countryCode = countryList[curCode];
  let newSrcLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrcLink;
}

button.addEventListener("click",(evt)=>{
  evt.preventDefault(); //stops from refreshing page(default actions).
  updateExchangeRate();
});

window.addEventListener("load",()=>{
  updateExchangeRate();
})