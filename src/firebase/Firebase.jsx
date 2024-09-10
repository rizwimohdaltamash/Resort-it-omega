import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrlXLlFGmsBbdyaXQ2aKBBvFiE_W0lcvE",
  authDomain: "royalrides-ea0bf.firebaseapp.com",
  projectId: "royalrides-ea0bf",
  storageBucket: "royalrides-ea0bf.appspot.com",
  messagingSenderId: "664045792735",
  appId: "1:664045792735:web:f82175fb66335060f8286a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB =getFirestore(app);
const auth =getAuth(app);
const storage =getStorage(app);

export {fireDB,auth,storage};













// const firebaseConfig = {
//   apiKey: "AIzaSyC0qs9fw6ulVhoJhNDykQDt_CA-QPGu1Qs",
//   authDomain: "resort-it.firebaseapp.com",
//   projectId: "resort-it",
//   storageBucket: "resort-it.appspot.com",
//   messagingSenderId: "885304141801",
//   appId: "1:885304141801:web:70d2987750fbd080db8d78"
// };