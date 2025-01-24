"use strict";


const menus = [
    { name:"チャーハン", price:"８００円", img:"img/cha_han.jpg" },
    { name:"ビール", price:"４００円", img:"img/beer.jpg" },
    { name:"唐揚げ", price:"５００円", img:"img/kara_age.jpg" },
    { name:"餃子", price:"５５０円", img:"img/gyouza.jpg" },
    { name:"ラーメン", price:"９００円", img:"img/ramen.jpg" },
    { name:"麻婆豆腐", price:"８５０円", img:"img/ma_bo_doufu.jpg" },
    { name:"セットメニュー", price:"１０００円", img:"img/set_menu.jpg" },
];

let currentIndex = 0;

const menuName = document.getElementById("menu-name");
const menuPrice = document.getElementById("menu-price");
createSpan(menus[currentIndex], menuName, "name");
createSpan(menus[currentIndex], menuPrice, "price");

// mainに表示する画像
const mainSpace = document.getElementById("main-space");
const mainImg = document.createElement("img");
mainImg.src = menus[currentIndex].img;
mainSpace.appendChild(mainImg);


// subに表示する画像
menus.forEach((menu, index) => {
    const subImg = document.createElement("img");
    subImg.src = menu.img;
    subImg.classList.add("sub-img");

    const li = document.createElement("li");
    if(index === currentIndex) {
        li.classList.add("current");
    }

    li.addEventListener("click", () => {
        mainImg.src = menu.img;
        const subItems = document.querySelectorAll("#sub-space > ul > li");
        subItems[currentIndex].classList.remove("current");
        currentIndex = index;
        subItems[currentIndex].classList.add("current");
        // menu-nameの表示
        createSpan(menu, menuName, "name");
        // const menuNameSpan = document.createElement("span");
        // menuNameSpan.textContent = menu.name;
        // menuName.appendChild(menuNameSpan);
        
        // menu-priceの表示
        createSpan(menu, menuPrice, "price");
        // const menuPriceSpan = document.createElement("span");
        // menuPriceSpan.textContent = menu.price;
        // menuPrice.appendChild(menuPriceSpan);
    });

    li.appendChild(subImg);
    const ul = document.querySelector("div#sub-space > ul");
    ul.appendChild(li);
});


function createSpan(array, array2, options) {
    if(options === "name") {
        if(array2.firstChild) {
            array2.removeChild(array2.firstChild);
        }
        const spans = document.createElement("span");
        spans.textContent = array.name;
        array2.appendChild(spans);
    }
    
    if(options === "price") {
        if(array2.firstChild) {
            array2.removeChild(array2.firstChild);
        }
        const spans = document.createElement("span");
        spans.textContent = array.price;
        array2.appendChild(spans);
    }
}
