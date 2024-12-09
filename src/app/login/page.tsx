'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../signup/Header';
import BackBtn from '../signup/BackBtn';
import Link from 'next/link';
import google from '../imgs/google.png';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';

import { auth } from "../../utils/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Firebase でログイン
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in as:', user.email);

      // ログイン成功後にプロフィールページへ遷移
      router.push('/profile');
    } catch (error: any) {
      console.error('Login Error:', error);
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    }
  };

  return (
    <div>
      <BackBtn navigation={"/signup"} />
      <Header title={"ログイン"} />

      <form className="px-5 grid gap-6 mt-[30px] mb-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border px-2 border-purple-500 py-3 w-full rounded-lg"
          placeholder="メールを入力してください"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border px-2 border-purple-500 py-3 w-full rounded-lg"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-purple-500 text-white w-full py-3 rounded-lg"
        >
          ログイン
        </button>
      </form>

      <Link href={"/password"} className='flex justify-end px-5 mt-2 mb-5 text-purple-500'>
        パスワードを忘れた方
      </Link>

      <p className="text-center mt-3 text-sm">
        まだアカウントをお持ちでない方
        <Link href={"/signup/login"} className="text-purple-500 font-semibold">
          {" "}
          新規作成
        </Link>
      </p>

      <div className='px-5 grid gap-4'>
        <div className="flex gap-2 justify-center items-center border-purple-500 rounded-md mt-10 p-3 border">
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

export default LoginPage;
