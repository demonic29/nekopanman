import Image from 'next/image'
import React from 'react'

import finish from '../imgs/IMG_0584 1.png'

const Finish = () => {
  return (
    <div className=' w-screen flex justify-center h-screen items-center'>
      <div className='relative text-center'>
        <Image
        src={finish}  
        alt='fdfjdfkje'
        width={500}
        height={100}
        objectFit='cover'
      />   
      
        <h1 className='font-bold'>アルバム作成完了！</h1>
      </div>
      
    </div>
  )
}

export default Finish