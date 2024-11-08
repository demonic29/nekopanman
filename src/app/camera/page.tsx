"use client";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import BottomNav from "./BottomNav";
import CameraNav from "./CameraNav";
// import uplaode from '../api/upload'

const CameraScreen = () => {

  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState< null>(null);

  // cloud-data
  const [cldData, setCldData] = useState();
  const src = cldData?.secure_url || imageSrc

  function capturePhoto() {
    const image = webcamRef.current?.getScreenshot()
    setImageSrc(image)
  }

  const videoConstraints = {
    facingMode: "user",
  };

  useEffect(() => {
    if(!imageSrc) return;
    (async function run() {
      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: JSON.stringify({
          image : imageSrc
        })
      }).then(r => r.json())
      setCldData(response)
      console.log('resopne', response)
    })()
  }, [imageSrc])

  return (
    <div className="h-screen w-screen flex flex-col items-center relative">
      {/* <Webcam
        ref={webcamRef}
        videoConstraints={videoConstraints}
        className="absolute h-full top-0 left-0 w-full object-contain"
      /> */}
      {/* {cldData && <Im/age src={cldData} width={500} height={500} alt="camera-image" />} */}
      {src && <Image src={src} alt="hi" width={500} height={500}/>}
      {
        !src && 
        <Webcam
          ref={webcamRef}
          videoConstraints={videoConstraints}
          className="absolute h-full top-0 left-0 w-full object-contain"
        /> 
      }
      <CameraNav capture={capturePhoto} />
      <BottomNav />
    </div>
  );
};

export default CameraScreen;
