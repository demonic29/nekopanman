'use client'
import React from 'react'
import AlbumDetailLayout from './[albumDetailsId]/page'

const layout = ({children}) => {
  return (
    <div className='w-screen'>
      {children}
      {/* <AlbumDetailLayout/> */}
    </div>
  )
}

export default layout