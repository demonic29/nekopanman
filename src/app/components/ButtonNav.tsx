import React, { useState } from "react";

// icons
import { IoMdAlbums } from "react-icons/io";
import { GrMap } from "react-icons/gr";
import { FaCamera } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";

const ButtonNav = () => {
  // State with icons and hrefs
  const [nav, setNav] = useState([
    { id: 1, href: "album", icon: <IoMdAlbums size={25} className="text-gray-700" /> },
    { id: 2, href: "map", icon: <GrMap size={25} className="text-gray-700" /> },
    { id: 3, href: "camera", icon: <FaCamera size={25} color="white" />, active: true },
    { id: 4, href: "noti", icon: <FaRegBell size={25} className="text-gray-700" /> },
    { id: 5, href: "profile", icon: <IoPerson size={25} className="text-gray-700" /> },
  ]);

  return (
    <div className="fixed bottom-5 left-0 right-0 px-5">
      <div className="flex justify-evenly items-center bg-white shadow-xl py-3 rounded-full">
        {nav.map((item) => (
          <div
            key={item.id}
            className={`${
              item.active
                ? "p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-md"
                : ""
            }`}
          >
            <Link href={item.href}>
                {item.icon}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonNav;
