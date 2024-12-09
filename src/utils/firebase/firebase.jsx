// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider , signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvk5FOmwBrC9mIvqOHrj_iE4wTxdDMSmg",
    authDomain: "nekopanman-f6ea9.firebaseapp.com",
    projectId: "nekopanman-f6ea9",
    storageBucket: "nekopanman-f6ea9.appspot.com",
    messagingSenderId: "592915998989",
    appId: "1:592915998989:web:d246d6f68deb637d5f2844",
    measurementId: "G-WWHJ5GJMEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();


// Emailとパスワードでログインする関数
export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // ログインしたユーザー情報を返す
    } catch (error) {
        console.error("ログインに失敗しました:", error);
        throw error; // エラーを再スローして呼び出し元で処理
    }
};

// ユーザープロフィールをFirestoreに保存する関数
export const saveUserProfile = async (userId, profileData) => {
    try {
        // Firestoreの"users"コレクションにプロフィールデータを保存
        await setDoc(doc(db, "users", userId), profileData);
        console.log("プロフィールが保存されました！");
    } catch (error) {
        console.error("プロフィール保存エラー:", error);
        throw error; // エラーを再スローして呼び出し元で処理
    }
};