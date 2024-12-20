import React from 'react'

const AlbumDetails = ({title, desc}) => {
  return (
    <div className='mt-5 mb-10 ps-3'>
        <div>
            <h1 className='text-xl'> <span className='text-[13px] text-gray-300'>Title:</span> {title}</h1>
            <p className='text-sm mt-2 leading-6'>
                <span className='text-[13px] text-gray-300'>Description:</span>  {desc}
            </p>
        </div>
    </div>
  )
}

export default AlbumDetails