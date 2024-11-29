import React from 'react'
import IntroScreen from './introScreens/page'
import AlbumLayout from './album/page'
// import CameraComponent from './camera/page'

const page = () => {
  return (
    <div className=''>
      {/* <IntroScreen/> */}
      <AlbumLayout/>
      {/* <CameraComponent/> */}
    </div>
  )
}

export default page