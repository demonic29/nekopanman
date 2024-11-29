import React from "react";

// icons
import { IoMdAlbums } from "react-icons/io";
import { GrMap } from "react-icons/gr";
import { FaCamera } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

const ButtonNav = () => {
  return (
    <div className="fixed bottom-5 left-0 right-0 px-5">
      <div className="flex justify-evenly items-center bg-white shadow-xl py-3 rounded-full">
        <IoMdAlbums size={25} className="text-gray-700" />
        <GrMap size={25} className="text-gray-700" />
        <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-md">
          <FaCamera size={25} color="white" />
        </div>
        <FaRegBell size={25} className="text-gray-700" />
        <IoPerson size={25} className="text-gray-700" />
      </div>
    </div>
  );
};

export default ButtonNav;
