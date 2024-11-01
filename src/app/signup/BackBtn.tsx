import Link from "next/link";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";

const BackBtn = ({navigation}) => {
  return (
    <div className="ms-3 mt-3">
      <Link href={navigation}>
        <FiChevronLeft size={30} />
      </Link>
    </div>
  );
};

export default BackBtn;
