import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkFSZAcsa2tjHM_sobjvDGcnH7Km4zbew",
  authDomain: "week7-yating.firebaseapp.com",
  projectId: "week7-yating",
  storageBucket: "week7-yating.appspot.com",
  messagingSenderId: "601517685707",
  appId: "1:601517685707:web:fd6e6d2460499fc80ad44e"
};

// Initialize Firebase
initializeApp(firebaseConfig);