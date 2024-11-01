import React from "react";
import BackBtn from "../signup/BackBtn";
import Button from "../../components/Button";

const page = () => {
  return (
    <div>
      <BackBtn navigation={"/signup"} />

      <div className="w-full px-4 sm:px-6 lg:px-8 mt-5">
        <h1 className="font-bold text-3xl sm:text-[28px] lg:text-[30px]">
          アカウントを探す
        </h1>
        <p className="text-md sm:text-base lg:text-lg">
          メールアドレスを入力してください
        </p>
      </div>

      <div className="px-5 grid gap-6 mt-[30px] mb-[50px]">
        
        <input
        type="text"
        className="border px-2 border-purple-500 py-3 w-full rounded-lg"
        placeholder="メールを入力してください"
        required
        />
       
    </div>

      <Button navigation={"/password/verify"} title={"次へ"}/>
    </div>
  );
};

export default page;
