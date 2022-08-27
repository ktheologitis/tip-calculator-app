let billAmount = 0;
let tipPercentage = 0;
let peopleCount = 0;
let selectedButtonId;

let billInputElement = document.getElementById("bill-input");
let tipInputElement = document.getElementById("tip-input");
let peopleInputElement = document.getElementById("people-input");
let invalidInputMessageElement = document.getElementById("invalid-message");
let tipButtons = document.getElementsByClassName("tip-button");
let resetButton = document.getElementById("reset-button");
let tipAmountElement = document.getElementById("tip-amount-per-person");
let totalAmountElement = document.getElementById("total-amount-per-person");

const getBillAmount = () => {
  let val = billInputElement.value;
  billAmount = parseFloat(val);
  calculateAmounts();
  console.log("hello");
};

const getPredefinedTip = (val, id) => {
  tipPercentage = val;

  Object.values(tipButtons).forEach((button) => {
    if (button.id == id) {
      selectedButtonId = id;
      button.style.backgroundColor = "hsl(172, 67%, 45%)";
      button.style.color = "black";
    } else {
      button.style.backgroundColor = "hsl(183, 100%, 15%)";
      button.style.color = "white";
    }
  });
  calculateAmounts();
};

const resetSelectedButtonStyle = () => {
  if (selectedButtonId !== undefined) {
    let selectedButton = document.getElementById(selectedButtonId);
    selectedButton.style.backgroundColor = "hsl(183, 100%, 15%)";
    selectedButton.style.color = "white";
  }
};

const getCustomTip = () => {
  let val = tipInputElement.value;
  tipPercentage = parseFloat(val);

  calculateAmounts();
};

const getNumberOfPeople = () => {
  let val = parseFloat(peopleInputElement.value);

  if (val === 0) {
    peopleInputElement.className = "input invalid-input";
    invalidInputMessageElement.style.display = "inline";
  } else {
    peopleInputElement.className = "input valid-input";
    invalidInputMessageElement.style.display = "none";
  }

  peopleCount = parseFloat(val);
  calculateAmounts();
};

const calculateAmounts = () => {
  if (
    peopleCount === 0 ||
    isNaN(peopleCount) ||
    isNaN(billAmount) ||
    isNaN(tipPercentage)
  ) {
    tipAmountElement.innerHTML = "$0.00";
    totalAmountElement.innerHTML = "$0.00";
    return;
  }

  resetButton.disabled = false;
  let tipAmount = billAmount * (tipPercentage / 100);
  let totalAmount = billAmount + tipAmount;

  let tipAmountPerPerson = tipAmount / peopleCount;
  let totalAmountPerPerson = totalAmount / peopleCount;

  tipAmountElement.innerHTML = "$" + tipAmountPerPerson.toFixed(2).toString();
  totalAmountElement.innerHTML =
    "$" + totalAmountPerPerson.toFixed(2).toString();
};

const reset = () => {
  billAmount = 0;
  tipPercentage = 0;
  peopleCount = 0;

  billInputElement.value = null;
  billInputElement.placeHolder = "0";
  peopleInputElement.value = null;
  peopleInputElement.placeHolder = "0";

  resetSelectedButtonStyle();

  tipInputElement.value = null;
  tipInputElement.placeHolder = "Custom";
  tipAmountElement.innerHTML = "$0.00";
  totalAmountElement.innerHTML = "$0.00";

  resetButton.disabled = "true";
};
