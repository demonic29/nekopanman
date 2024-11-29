'use client'
import React, { useState } from 'react'
import { TbGrid3X3 } from "react-icons/tb";
import { BsBrightnessHighFill } from "react-icons/bs";
import { IoIosFlash } from "react-icons/io";
import { TbCameraRotate } from "react-icons/tb";
import { GiBabyFace } from "react-icons/gi";
import { LuFormInput } from "react-icons/lu";



const BottomNav = ({grid, brightness, cartoonify, background, mode}) => {
    
  const [active, setActive] = useState(false);

  const activeIcon = () => setActive(prev => !prev);

  return (
    <div className='flex absolute justify-center gap-10 bg-black w-full bottom-0 py-5'>
         <div>
            <TbCameraRotate size={30} color='white'/>
        </div>
        <div>
            <TbGrid3X3 size={30} color='white' onClick={grid}/>
        </div>
        <div onClick={() => {brightness(); activeIcon()}}>
            <BsBrightnessHighFill size={30} className={`${active ? 'text-purple-500' : 'text-white'}`} />
        </div>
        <div>
            <GiBabyFace size={30} color='white' onClick={cartoonify} />
        </div>
        <div>
            <LuFormInput size={30} color='white' onClick={background}/>
        </div>
       

    </div>
  )
}

export default BottomNav