import React from "react";
import BackBtn from "./BackBtn";
import Image from "next/image";

// icons
import { FiSquare } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import logo from "../imgs/logo.png";
import google from '../imgs/google.png'
import Button from "../../components/Button";
import Link from "next/link";
const signup = () => {
  return (
    <div>
      <BackBtn navigation={"/introScreens"}/>

      <h1 className="font-bold text-2xl text-center">新規登録</h1>
      <div className="flex justify-center">
        <Image src={logo} width={150} height={150} alt="nekopanman-logo" />
      </div>

      <div className="p-5 grid gap-6">
        <input
          type="text"
          className="border px-2 border-purple-500 py-3 w-full rounded-lg"
          placeholder="ユーザー名"
          required
        />
        <input
          type="text"
          className="border px-2 border-purple-500 py-3 w-full rounded-lg"
          placeholder="メールを入力してください"
          required
        />
        <input
          type="text"
          className="border px-2 border-purple-500 py-3 w-full rounded-lg"
          placeholder="パスワード"
          required
        />
      </div>

      <div className="flex items-center gap-2 px-5 mb-5">
        <FiSquare size={20} />
        <p>利用規約に同意する</p>
      </div>

      <Button title={"Sign Up"} navigation={"/signup"} />

      <p className="text-center mt-3 text-sm">
        すでにアカウントをお持ちですか？
        <Link href={"/"} className="text-purple-500 font-semibold">
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
          <button className="">
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
