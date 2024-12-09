"use client";
import React, { useState, ChangeEvent } from "react";
import BackBtn from "../signup/BackBtn";
import Button from "../../components/Button";
import defaultLogo from "../imgs/userprofile.png";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import { saveUserProfile } from "../../utils/firebase/firebase"; // Firestore保存関数
import { auth } from "../../utils/firebase/firebase"; // ログインユーザー取得用

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string>(defaultLogo.src); // 初期値として画像URLを設定
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [nationality, setNationality] = useState<string>("Japan");
  const [error, setError] = useState<string>("");

  // プロフィール画像の変更
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // フォーム送信
  const handleSubmit = async () => {
    setError("");
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("ユーザーがログインしていません");
        return;
      }
      const userId = currentUser.uid;

      const profileData = {
        profileImage,
        gender,
        birthDate,
        nationality,
      };

      await saveUserProfile(userId, profileData);
      alert("プロフィールが保存されました！");
    } catch (err) {
      console.error("エラー:", err);
      setError("プロフィールの保存中にエラーが発生しました。");
    }
  };

  return (
    <div>
      <BackBtn navigation={"/introScreens"} />
      <div className="w-full px-4 sm:px-6 lg:px-8 mt-5">
        <h1 className="font-bold text-3xl text-center">Tell me about you</h1>
      </div>

      <div className="flex justify-center mt-10 relative">
        <Image src={profileImage} width={150} height={150} alt="profile-logo" />
        <div className="absolute bottom-4 ms-[100px] bg-purple-500 p-2 rounded-full">
          <label htmlFor="profile-image" className="cursor-pointer">
            <FaPencilAlt className="text-white" />
          </label>
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="p-5 grid gap-1">
        <label htmlFor="sex" className="text-purple-500">
          性別
        </label>
        <select
          id="sex"
          name="sex"
          className="border px-2 border-purple-500 py-3 w-full rounded-lg"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">性別を選択</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>

        <label htmlFor="birthday" className="text-purple-500">
          生年月日
        </label>
        <input
          type="date"
          name="birthdate"
          id="birthday"
          className="border px-2 border-purple-500 py-3 w-full rounded-lg"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />

        <label htmlFor="nationality" className="text-purple-500">
          国/地域
        </label>
        <select
          id="nationality"
          name="nationality"
          className="border px-2 border-purple-500 py-3 w-full rounded-lg"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
        >
          <option value="Japan">Japan</option>
          <option value="America">America</option>
        </select>
      </div>
      <Button title={"Next"} onClick={handleSubmit} navigation={"/camera"} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Profile;
