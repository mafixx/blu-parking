import { FirebaseOptions, initializeApp } from "firebase/app";
import * as auth from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCLA4vnLFaVow25ylLUkb57NhmnN6qk1vE",
    authDomain: "fir-auth-65294.firebaseapp.com",
    projectId: "fir-auth-65294",
    storageBucket: "fir-auth-65294.appspot.com",
    messagingSenderId: "105428798939",
    appId: "1:105428798939:web:49a9375f32ea94d4dfebfe"
};

export let myApp = initializeApp(firebaseConfig);

 