import React from "react";
import Link from "next/link";

const Button = ({ navigation, title }) => {
  return (
    <div className="flex justify-center">
      <Link
        href={navigation}
        className="bg-purple-500 rounded-full text-white px-[140px] py-3"
      >
        {title}
      </Link>
    </div>
  );
};

export default Button;
