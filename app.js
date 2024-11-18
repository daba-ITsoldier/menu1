'use strict';

const cartItems = [];
const prices = { 寿司: 1000, ラーメン: 800, カレー: 700 };

function addToCart(item) {
  cartItems.push(item);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');
  cartList.innerHTML = '';
  let total = 0;

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    cartList.appendChild(li);
    total += prices[item];
  });

  totalPrice.textContent = total;
}
