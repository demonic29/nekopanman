"use client";

import React from "react";
import { useState } from "react";
import BackBtn from "./BackBtn";
import Image from "next/image";
import { auth , googleProvider , db } from "../../utils/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";



// icons
import { FiSquare } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";


import logo from '../imgs/logo.png'
import google from '../imgs/google.png'
import Button from "../../components/Button";
import Link from "next/link";

const signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errorUserName, setErrorUserName] = useState<string | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    // 入力値のバリデーション
    let hasError = false;
  
    if (!username.trim()) {
      setErrorUserName("ユーザー名を入力してください。");
      hasError = true;
    } else {
      setErrorUserName(null);
    }
  
    if (!email.trim() || !email.includes("@")) {
      setErrorEmail("有効なメールアドレスを入力してください。");
      hasError = true;
    } else {
      setErrorEmail(null);
    }
  
    if (!password.trim() || password.length < 4) {
      setErrorPassword("パスワードは4文字以上にしてください。");
      hasError = true;
    } else {
      setErrorPassword(null);
    }
  
    if (hasError) return;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Firestore にユーザー情報を保存
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        username: username,
        email: user.email,
        createdAt: new Date(),
      });
  
      alert("登録成功！");
    } catch (error: any) {
      console.error("登録エラー:", error);
  
      if (error.code === "auth/email-already-in-use") {
        setErrorEmail("このメールアドレスは既に使用されています。");
      } else {
        setError("登録に失敗しました。もう一度お試しください。");
      }
    }
  };
    

  const GoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError("");
    }
  };

  return (
    <div>
      <BackBtn navigation={"/introScreens"}/>

      <h1 className="font-bold text-2xl text-center">新規登録</h1>
      <div className="flex justify-center">
        <Image src={logo} width={150} height={150} alt="nekopanman-logo" />
      </div>
      <form className={`p-5 grid ${error ? 'gap-0' : 'gap-6'}`}>
        <div>
          <input
            type="text"
            className="border px-2 border-purple-500 py-3 w-full rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ユーザー名"
            required
          />
          {errorUserName && <label className="text-xs text-red-500 pl-2">{errorUserName}</label>}
        </div>
        <div>
          <input
            type="text"
            className="border px-2 border-purple-500 py-3 w-full rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メール"
            required
          />
          {errorEmail && <label className="text-xs text-red-500 pl-2">{errorEmail}</label>}
        </div>
        <div>
          <input
            type="password"
            className="border px-2 border-purple-500 py-3 w-full rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            required
          />
          {errorPassword && <label className="text-xs text-red-500 pl-2">{errorPassword}</label>}
        </div>
      </form>

      <div className="flex items-center gap-2 px-5 mb-5">
        <input type="checkbox" className="p-7"/>
        <p>利用規約に同意する</p>
      </div>

      {/* <Button title={"アカウント作成"} navigation={"/profile"}/> */}
      <div className="flex justify-center px-4">
        <button className="bg-purple-500 rounded-full text-white w-full text-center py-3" onClick={handleRegister}>登録</button>
      </div>

      <p className="text-center mt-3 text-sm">
        すでにアカウントをお持ちですか？
        <Link href={"/login"} className="text-purple-500 font-semibold">
          {" "}
          ログイン
        </Link>
      </p>

      <div className="p-4 mt-10">
        <div className="flex gap-2 justify-center items-center border-purple-500 rounded-md mb-2 py-3 border">
          <Image
            src={google}
            width={20}
            height={50}
            alt="google-icon"
          />
          <button className="" onClick={GoogleLogin}>
            Google でログイン
          </button>
        </div>
        <div className="flex gap-2 justify-center items-center border-purple-500 rounded-md mb-2 py-3 border">
            <FaFacebook size={20} color="blue"/>
          <button className="">
            Facebook でログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default signup;
