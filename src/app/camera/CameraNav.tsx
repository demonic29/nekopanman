import React, { useState } from 'react';
import { FaRegCircle } from "react-icons/fa6";
import { RiColorFilterLine } from "react-icons/ri";
import { FaRegFaceGrinTongueWink } from "react-icons/fa6";

const CameraNav = ({ capture, toggleFilterDisplay }) => {
  const [active, setActive] = useState(false);

  const activeIcon = () => setActive(prev => !prev);

  return (
    <div className='absolute bottom-28 flex gap-10 items-end'>
      <div onClick={() => { toggleFilterDisplay(); activeIcon(); }}>
        <RiColorFilterLine size={30} className={`${active ? 'text-purple-500' : 'text-white'}`} />
      </div>
      <div>
        <FaRegCircle size={60} color='white' onClick={capture} />
      </div>
      <div>
        <FaRegFaceGrinTongueWink size={30} color='white' />
      </div>
    </div>
  );
};

export default CameraNav;
