'use strict';

// Firebase設定（Firebaseコンソールから取得した値を貼り付けてください）
const firebaseConfig = {
    apiKey: "AIzaSyAqPQHty5jpTZKjxt-nt41E6XZF0_9GJZM",
    authDomain: "menu-app-c6350.firebaseapp.com",
    projectId: "menu-app-c6350",
    storageBucket: "menu-app-c6350.firebasestorage.app",
    messagingSenderId: "101548584419",
    appId: "1:101548584419:web:f62d55e819e082a11e04d6",
    measurementId: "G-MWLPJ2MXY6"
};

  // Firebaseの初期化
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // 注文データをFireStoreに追加
  function addOrder(itemName, itemPrice) {
    db.collection("orders").add({
      item: itemName,
      price: itemPrice,
      orderTime: firebase.firestore.FieldValue.serverTimestamp()
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
    db.collection("orders")
      .orderBy("orderTime", "desc")
      .get()
      .then((querySnapshot) => {
        const orderList = document.getElementById("order-list");
        orderList.innerHTML = ""; // 一旦リストをクリア
  
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          const listItem = document.createElement("li");
          listItem.textContent = `${order.item} - ${order.price}円 - ${order.orderTime?.toDate().toLocaleString() || "日時不明"}`;
          orderList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("注文データの取得に失敗しました: ", error);
      });
  }
  
  // ページロード時に注文状況を取得
  window.onload = fetchOrders;
  