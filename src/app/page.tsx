'use client'
import React, { Component, useEffect, useState } from 'react'
import IntroScreen from './introScreens/page'
import AlbumLayout from './album/page'
import { LoadingProvider, UseLoading } from './context/LoadingContext'
import Loading from './components/Loading'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase/firebase'
import { useRouter } from 'next/navigation'
// import CameraComponent from './camera/page'

const RootLayout = ({Component, pageProps}) => {

  const [ loading, setLoading ] = useState(false);

  const router = useRouter();

 // if user already sign-in
  useEffect(() => {
    setLoading(true);
    const loginUsers = onAuthStateChanged(auth, (user) => {
      const uid = user?.uid;
      if(uid){
        router.push('/album');
      }else{
        router.push('/introScreens')
      }
    })
    return () => loginUsers();
    setLoading(false);
  },[router]);
  
  return (
    <div>

      {
        loading ? <Loading loadingText="アプリへ起動中..."/> : <IntroScreen/>
      }

      {/* <IntroScreen/> */}

      {/* <AlbumLayout/> */}
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

export default RootLayout