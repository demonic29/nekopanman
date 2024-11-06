import React from 'react'
import { TbGrid3X3 } from "react-icons/tb";
import { BsBrightnessHighFill } from "react-icons/bs";
import { IoIosFlash } from "react-icons/io";
import { TbCameraRotate } from "react-icons/tb";




const BottomNav = () => {
  return (
    <div className='flex absolute justify-center gap-10 bg-black w-full bottom-0 py-5'>
         <div>
            <TbCameraRotate size={35} color='white'/>
        </div>
        <div>
            <TbGrid3X3 size={35} color='white'/>
        </div>
        <div>
            <BsBrightnessHighFill size={35} color='white' />
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