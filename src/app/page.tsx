import React, { Component } from 'react'
import IntroScreen from './introScreens/page'
import AlbumLayout from './album/page'
import { LoadingProvider, UseLoading } from './context/LoadingContext'
import Loading from './components/Loading'
// import CameraComponent from './camera/page'

const page = ({Component, pageProps}) => {

  // const { isLoading } = UseLoading();

  return (
    <div className=''>

      {/* <IntroScreen/> */}

      <AlbumLayout/>
      {/* <LoadingProvider>
        {
          isLoading && <Loading/>
        }
        <Component {...pageProps}/>
      </LoadingProvider> */}

      {/* <CameraComponent/> */}
    </div>
  )
}

export default page