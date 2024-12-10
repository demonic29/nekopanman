'use client'
import React, { useState, useRef } from "react";
import BackBtn from "../../signup/BackBtn";
import Button from "../../components/Button"

const Page = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input if exists
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <BackBtn navigation="/signup" />

      <div className="w-full max-w-md mt-10 px-4">
        <h1 className="font-bold text-3xl sm:text-2xl lg:text-3xl">
          確認コード入力
        </h1>
        <p className="text-md sm:text-base lg:text-lg mt-2 text-gray-700">
          確認コードがメールで送信されました
        </p>
      </div>

      <div className="px-5 grid mx-auto gap-4 mt-8 mb-8 grid-cols-4 w-full max-w-xs">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            // maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            className="border text-center border-purple-500 py-3 rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        ))}
      </div>

      <Button navigation="/" title="次へ" />
    </div>
  );
};

export default Page;
