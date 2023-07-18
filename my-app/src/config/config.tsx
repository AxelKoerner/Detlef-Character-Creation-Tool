import { getDatabase } from 'firebase/database';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDjAlBgT7ybr2GZrNgq3zFZoKu1jn7stHg",
    authDomain: "cctool-c001b.firebaseapp.com",
    databaseURL: "https://cctool-c001b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cctool-c001b",
    storageBucket: "cctool-c001b.appspot.com",
    messagingSenderId: "736945444931",
    appId: "1:736945444931:web:07a06f34302f63b8929cf6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
