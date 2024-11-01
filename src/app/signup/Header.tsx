import React from "react";
import logo from "../imgs/logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center">新規登録</h1>
      <div className="flex justify-center">
        <Image src={logo} width={150} height={150} alt="nekopanman-logo" />
      </div>
    </div>
  );
};

export default Header;
