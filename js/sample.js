"use strict";

let count = 0;
const numberElement = document.getElementById("number");

function increase() {
  count++;
  numberElement.textContent = count;
}

function decrease() {
  count--;
  numberElement.textContent = count;
}
