import React from 'react'

// icons
import { LuSearch } from "react-icons/lu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";


const Header = () => {
  return (
    <div className='flex justify-between mt-5'>
        <div>
            <h1 className='font-bold text-xl'>Nekopanman</h1>
        </div>
        <div className='flex gap-5'>
            <LuSearch size={25}/>
            <HiOutlineDotsHorizontal size={25}/>
        </div>
    </div>
  )
}

export default Header