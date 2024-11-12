'use client'
import React, { useState } from 'react'
import { TbGrid3X3 } from "react-icons/tb";
import { BsBrightnessHighFill } from "react-icons/bs";
import { IoIosFlash } from "react-icons/io";
import { TbCameraRotate } from "react-icons/tb";
import { IoColorFilterOutline } from "react-icons/io5";

const BottomNav = ({grid, brightness}) => {
  const [active, setActive] = useState(false);

  const activeIcon = () => setActive(prev => !prev);

  return (
    <div className='flex absolute justify-center gap-10 bg-black w-full bottom-0 py-5'>
         <div>
            <TbCameraRotate size={35} color='white'/>
        </div>
        <div>
            <TbGrid3X3 size={35} color='white' onClick={grid}/>
        </div>
        <div onClick={() => {brightness(); activeIcon()}}>
            <BsBrightnessHighFill size={35} className={`${active ? 'text-purple-500' : 'text-white'}`} />
        </div>
        <div>
            <IoIosFlash size={35} color='white'/>
        </div>
        <div>
            <TbCameraRotate size={35} color='white'/>
        </div>
       

    </div>
  )
}

export default BottomNav