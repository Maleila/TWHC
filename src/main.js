import { createApp } from 'vue'
import "../public/main.css";
import App from './App.vue'
import router from "./router";
import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { VueFire, VueFireAuth } from "vuefire";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaOcnUXtRTaRdRIo-I8lQSftyQDyz1_Rs",
  authDomain: "twhc-2f600.firebaseapp.com",
  projectId: "twhc-2f600",
  storageBucket: "twhc-2f600.appspot.com",
  messagingSenderId: "647297836844",
  appId: "1:647297836844:web:d2050c5a08aafb655c2e89",
  measurementId: "G-EGSKBLL4DP"
};

createApp(App).use(VueFire, {
    firebaseApp: initializeApp(firebaseConfig),
    modules: [VueFireAuth()],
  })
  .use(router)
  .mount('#app')

  const database = getDatabase(App)
