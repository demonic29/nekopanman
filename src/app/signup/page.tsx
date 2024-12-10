"use client";
import React, { useState } from "react";
import BackBtn from "./BackBtn";
import Image from "next/image";

// icons
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Text } from "@radix-ui/themes";
import { FaCheckSquare } from "react-icons/fa";

import google from "../imgs/google.png";
import Button from "../components/Button";
import Link from "next/link";
import Header from "./Header";
import { Checkbox, Flex } from "@radix-ui/themes";
const signup = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <BackBtn navigation={"/introScreens"} />

      <Header />

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

      <div
        className="flex items-center gap-2 px-5 mb-5 cursor-pointer"
        onClick={handleCheckboxToggle}
      >
        {isChecked ? (
          <FaCheckSquare color="purple" size={20}/>
        ) : (
          <FiSquare size={20} className="text-purple-500" />
        )}
        <p>利用規約に同意する</p>
      </div>
      

      <Button title={"登録"} navigation={"/profile"} />

      <p className="text-center mt-3 text-sm">
        すでにアカウントをお持ちですか？
        <Link href={"/login"} className="text-purple-500 font-semibold">
          {" "}
          ログイン
        </Link>
      </p>

      <div className="p-4 mt-10">
        <div className="flex gap-2 justify-center items-center border-purple-500 rounded-md mb-2 py-3 border">
          <Image src={google} width={20} height={50} alt="google-icon" />
          <button className="">Google でログイン</button>
        </div>
        <div className="flex gap-2 justify-center items-center border-purple-500 rounded-md mb-2 py-3 border">
          <FaFacebook size={20} color="blue" />
          <button className="">Facebook でログイン</button>
        </div>
      </div>
    </div>
  );
};

export default signup;
