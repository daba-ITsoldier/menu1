'use strict';

// Firebaseの設定（index.html内に記述したものと同様）
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Firebaseの初期化
const firebaseConfig = {
    apiKey: "AIzaSyAqPQHty5jpTZKjxt-nt41E6XZF0_9GJZM",
    authDomain: "menu-app-c6350.firebaseapp.com",
    projectId: "menu-app-c6350",
    storageBucket: "menu-app-c6350.firebasestorage.app",
    messagingSenderId: "101548584419",
    appId: "1:101548584419:web:f62d55e819e082a11e04d6",
    measurementId: "G-MWLPJ2MXY6"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 注文データをFirestoreに追加
function addOrder(itemName, itemPrice) {
  addDoc(collection(db, "orders"), {
    item: itemName,
    price: itemPrice,
    orderTime: new Date().toISOString() // Firestoreで日時を文字列として保存
  })
  .then((docRef) => {
    console.log("注文が保存されました: ", docRef.id);
    fetchOrders(); // 注文一覧を更新
  })
  .catch((error) => {
    console.error("注文の保存に失敗しました: ", error);
  });
}

// Firestoreから注文データを取得して表示
function fetchOrders() {
  const q = query(collection(db, "orders"), orderBy("orderTime", "desc"));
  getDocs(q)
    .then((querySnapshot) => {
      const orderList = document.getElementById("order-list");
      orderList.innerHTML = ""; // 一旦リストをクリア

      querySnapshot.forEach((doc) => {
        const order = doc.data();
        const listItem = document.createElement("li");
        listItem.textContent = `${order.item} - ${order.price}円 - ${order.orderTime}`;
        orderList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("注文データの取得に失敗しました: ", error);
    });
}

// ページロード時に注文状況を取得
window.onload = fetchOrders;

// 注文データをFirestoreに送信する関数
function sendOrder() {
  // サンプルのカートデータ（実際のアプリではカートデータを取得）
  const orderData = {
    items: [
      { name: "ラーメン", price: 800, quantity: 2 },
      { name: "チャーハン", price: 600, quantity: 1 }
    ],
    total: 2200, // 合計金額
    timestamp: new Date().toISOString() // 注文日時
  };

  // Firestoreのコレクションにデータを追加
  addDoc(collection(db, "orders"), orderData)
    .then((docRef) => {
      console.log("注文が送信されました。注文ID: ", docRef.id);
      alert("注文を送信しました！");
    })
    .catch((error) => {
      console.error("注文の送信に失敗しました: ", error);
      alert("注文の送信に失敗しました。もう一度お試しください。");
    });
}

// ボタンのクリックイベントを設定
const sendOrderButton = document.getElementById("sendOrderButton");
if (sendOrderButton) {
  sendOrderButton.addEventListener("click", sendOrder);
}

// メニューアイテムをクリックしたときに注文を追加
function addOrder(itemName, itemPrice) {
  addOrder(itemName, itemPrice);
}
