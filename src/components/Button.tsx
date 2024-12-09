import React from "react";
import Link from "next/link";

const Button = ({ navigation, title, onClick }) => {
  return (
    <div className="flex justify-center px-4">
      <Link
        href={navigation}
        onClick={onClick}
        className="bg-purple-500 rounded-full text-white w-full text-center py-3"
      >
        {title}
      </Link>
    </div>
  );
};

export default Button;
