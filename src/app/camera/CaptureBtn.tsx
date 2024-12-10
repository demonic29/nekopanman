'use client'
import React, { useState } from 'react'

// icons
import { FaPlus } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { RiColorFilterLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";

import { CgSoftwareDownload } from "react-icons/cg";



const CaptureBtn = ({modal}) => {
    return (
        <div className='flex absolute justify-center items-center gap-10 bg-black w-full bottom-0 py-5'>
         <div>
            <RiColorFilterLine size={25} color='white'/>
        </div>
        <div>
            <VscSettings size={25} color='white' />
        </div>
        <button onClick={modal}>
            <FaPlus size={25} color='white' />
        </button>
        <div>
            <CgSoftwareDownload size={28} color='white'  />
        </div>
        <div>
            <LuMapPin size={25} color='white'/>
        </div>
       

    </div>
    )
}

export default CaptureBtn