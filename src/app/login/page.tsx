'use client'
import React from 'react'
import Header from '../signup/Header'
import BackBtn from '../signup/BackBtn'
import Button from '../../components/Button'
import Link from 'next/link'
import google from '../imgs/google.png'
import Image from 'next/image'
import { FaFacebook } from 'react-icons/fa'

const page = () => {
  return (
    <div>
        <BackBtn navigation={"/signup"}/>
        
        <Header/>

        <div className="px-5 grid gap-6 mt-[30px] mb-2">
        
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

        <Link href={"/password"} className='flex justify-end px-5 mt-2 mb-5 text-purple-500'>
            パスワード忘れた方
        </Link>

        <Button title={"ログイン"} navigation={"/signup/profile"}/>

        <p className="text-center mt-3 text-sm">
            すでにアカウントをお持ちですか？
            <Link href={"/signup/login"} className="text-purple-500 font-semibold">
            {" "}
            ログイン
            </Link>
        </p>

        <div className='px-5 grid gap-4'>
            <div className=" flex gap-2 justify-center items-center border-purple-500 rounded-md mt-10 p-3 border">
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
          <FaFacebook size={20} color="blue" />
          <button className="">Facebook でログイン</button>
        </div>
        </div>
    </div>
  )
}

export default page