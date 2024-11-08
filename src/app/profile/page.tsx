'use client'
import React, { ChangeEvent } from "react";
import BackBtn from "../signup/BackBtn";
import Button from "../../components/Button";
import Header from "../signup/Header";
import logo from "../imgs/logo.png";
import { useState } from "react";
import defaultLogo from '../imgs/userprofile.png'
import Image from "next/image";

import { FaPencilAlt } from "react-icons/fa";

const Profile = () => {
    const [profileImage, setProfileImage] = useState<string>("../imgs/userprofile.png");

    const handleImageChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
      }
    };
    return (
        
        <div>
        <BackBtn navigation={"/introScreens"} />
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-5">
            <h1 className="font-bold text-3xl sm:text-[28px] lg:text-[30px] text-center">
            Tell me about you
            </h1>
        
        </div>
        <div className="flex justify-center mt-10 relative">
            <Image src={defaultLogo} width={150} height={150} alt="nekopanman-logo" />
            <div className="absolute  bottom-4 ms-[100px] bg-purple-500 p-2 rounded-full">
                <FaPencilAlt className="text-white" onClick={handleImageChange}/>
            </div>
            
        </div>
        
        <div className="p-5 grid gap-1">
            <label htmlFor="sex" className="text-purple-500">性別</label>
            <select
                id="sex"
                name="sex"
                className="border px-2 border-purple-500 py-3 w-full rounded-lg"
                required
            >
                <option value="gender">性別</option>
                <option value="mela">男性</option>
                <option value="female">女性</option>
            </select>
            <label htmlFor="birthday" className="text-purple-500">生年月日</label>
            <input
                type="date"
                name="birthdate"
                id="birthday"
                className="border px-2 border-purple-500 py-3 w-full rounded-lg"
                placeholder="2000/01/01"
                required
            />
            <label htmlFor="nationality" className="text-purple-500">国/地域</label>
            <select
                id="nationality"
                name="nationality"
                className="border px-2 border-purple-500 py-3 w-full rounded-lg"
                required
            >
                <option value="japan">Japan</option>
                <option value="america">America</option>
            </select>
        </div>
        <Button title={"Next"} navigation={"/camera"}/>
        </div>
    );
};

export default Profile;