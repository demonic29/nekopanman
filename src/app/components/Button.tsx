import React from "react";
import Link from "next/link";

const Button = ({ navigation, title }) => {
  return (
    <div className="flex justify-center w-screen px-2">
      <Link
        href={navigation}
        className="bg-purple-500 rounded-full text-white text-sm w-full text-center py-3"
      >
        {title}
      </Link>
    </div>
  );
};

export default Button;
