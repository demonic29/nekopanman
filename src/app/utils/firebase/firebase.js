// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider , signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDN-1ei5zqJdWII9azxJJrNXPHqJtm9N4g",
    authDomain: "fire-project-27112016.firebaseapp.com",
    projectId: "fire-project-27112016",
    storageBucket: "fire-project-27112016.appspot.com",
    messagingSenderId: "854561255946",
    appId: "1:854561255946:web:c4433840c61c45e8c465f3",
    measurementId: "G-D7491E6LGM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);


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