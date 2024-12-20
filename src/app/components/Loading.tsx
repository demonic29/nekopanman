import React from 'react'
import {Spinner} from "@nextui-org/spinner";
import Image from 'next/image';

import logo from '../imgs/loadingImg.png'

const Loading = ({loadingText}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 p-5">
      <div className='relative h-64 w-screen'>
        <Image
          fill
          src={logo}
          alt='Logo'
          objectFit='cover'
          // color='white'
        />
      </div>
      <div>
        <Spinner color="default"/>
      </div>
      <div>
        <p className='text-xl'>{loadingText}</p>
      </div>
    </div>
  )
}

export default Loading