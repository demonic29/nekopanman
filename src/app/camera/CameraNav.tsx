import React from 'react'
import { FaRegCircle } from "react-icons/fa6";
import { RiColorFilterLine } from "react-icons/ri";
import { FaRegFaceGrinTongueWink } from "react-icons/fa6";


const CameraNav = ({capture}) => {
  return (
    <div className='absolute bottom-28 flex gap-10 items-end'>
        <div>
            <RiColorFilterLine size={30} />
        </div>

        <div>
            <FaRegCircle size={60} onClick={capture}/>
        </div>

        <div>
            <FaRegFaceGrinTongueWink size={30}/>
        </div>

    </div>
  )
}

export default CameraNav