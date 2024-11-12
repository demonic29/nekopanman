"use client";

import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import BottomNav from "./BottomNav";
import CameraNav from "./CameraNav";
import cameragrid from '../imgs/camera-grid.png'

import { brightness } from "@cloudinary/url-gen/actions/adjust";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdBrightness3 } from "react-icons/md";


import logo from '../imgs/logo.png'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// Import the Cloudinary class
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true // force https, set to false to force http
  }
});

new CloudinaryImage(`${logo}`).adjust(brightness().level(60))

const live_filters = [
  { name: "al_dente", css: "contrast(1.2) saturate(1.2)" },
  { name: "athena", css: "grayscale(0.5) sepia(0.3)" },
  { name: "audrey", css: "brightness(1.1) contrast(1.1)" },
  { name: "aurora", css: "hue-rotate(30deg)" },
  { name: "daguerre", css: "sepia(0.7)" },
  { name: "eucalyptus", css: "brightness(0.9) contrast(1.3)" },
  { name: "fes", css: "hue-rotate(180deg) saturate(1.3)" },
]

const live_brightness = [
  -50,-60,-70,-80,-90,50,60,70,80,90,100,
]

const photo_filters = [
  "al_dente",
  "athena",
  "audrey",
  "aurora",
  "daguerre",
  "eucalyptus",
  "fes",
  "frost",
  "hairspray",
  "hokusai",
  "incognito",
  "linen",
  "peacock",
  "primavera",
  "quartz",
  "red_rock",
  "refresh",
  "sizzle",
  "sonnet",
  "ukulele",
  "zorro"
]

const CameraScreen = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cldData, setCldData] = useState<any>(null);
  const [liveFilter, setLiveFilter] = useState<string>("");
  const [photoCaptured, setPhotoCaptured] = useState(false);
  
  const scrollRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = () => {
    if(scrollRef.current){
      const scrollPosition = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setCurrentIndex(newIndex)
    }
  }
  
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilterDisplay = () => setShowFilter(prev => !prev);
  
  const [showGrid, setShowGrid] = useState(false);
  const toggleGrid = () => setShowGrid(prev => !prev)
  
  
  const [photoFilter, setPhotoFilter] = useState<string>("");
  const [photoBrightness, setPhotoBrightness] = useState(100);
  const [showBrightness, setShowBrightness] = useState(false);
  const toggleBrightnessDisplay = () => setShowBrightness(prev => !prev)

  const cloudImage = cldData?.public_id && cloudinary.image(cldData.public_id);
  if (cloudImage && photoFilter && photoBrightness) {
    cloudImage.effect(`e_art:${photoFilter}`);
    cloudImage.adjust(brightness().level(photoBrightness))
  }
  const src = cloudImage?.toURL() || imageSrc;

  function capturePhoto() {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotoCaptured(true)
        if (typeof window !== "undefined") {
          const img = document.createElement("img");
          img.src = imageSrc;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const context = canvas.getContext("2d");
            if (context) {
              context.filter = liveFilter || "none";
              context.drawImage(img, 0, 0, img.width, img.height);
              const filteredImage = canvas.toDataURL("image/png");
              setImageSrc(filteredImage);
            }
          };
        };
      }
    }
  }

  const handleBrightnessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoBrightness(parseInt(event.target.value, 10)); // Parse as integer for better control
  };

  useEffect(() => {
    if (!imageSrc) return;
    (async function run() {
      const response = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: JSON.stringify({ image: imageSrc }),
      }).then((r) => r.json());
      setCldData(response);
    })();
  }, [imageSrc]);

  return (
    <div className="h-screen w-screen flex flex-col items-center relative">
        {/* {!src ? (
          <Webcam
            ref={webcamRef}
            videoConstraints={{ facingMode: "user" }}
            className="w-full h-full object-cover"
            style={{ filter: `${liveFilter} brightness(${photoBrightness}%)` }}
          />
       
        ) : (
          <Image src={src} alt="Captured Image" width={500} height={500} />
        )} */}

        {/* <h2 className="font-bold text-2xl mb-5">Live Filters</h2> */}
        <div className={`${!showFilter  ?  'hidden' : 'mt-[20px] px-5 w-full overflow-x-scroll scroll-smooth snap-x snap-mandatory absolute bottom-[200px]'}`}>
          <ul className="flex gap-[2px] jus items-center w-full" ref={scrollRef} onScroll={handleScroll}>
            {live_filters.map(({ name, css }) => (
              <li key={name} className="snap-center h-[80px] filter-preview w-[50px] border rounded-lg overflow-hidden flex-shrink-0">
                <button onClick={() => setLiveFilter(css)} className="h-full w-full">
                  {/* <Webcam
                    videoConstraints={{facingMode: 'user'}}
                    style={{filter: css}}
                    className="w-full object-cover h-full"
                  /> */}
                  {/* <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="object-cover h-full w-full"
                    style={{ filter: css }}
                  /> */}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${!showGrid && 'hidden'}`}>
          <Image
            src={cameragrid}
            fill
            alt="grid"
          />
        </div>

      {/* <div className="mt-[20px] px-5">
        <h2 className="font-bold text-2xl mb-5">Photo Filters</h2>
        <ul className="flex flex-wrap gap-5">
          {photo_filters.map((filter) => (
            <li className="border border-black p-3 rounded-lg" key={filter}>
              <button onClick={() => setPhotoFilter(filter)}>
                <span className="w-full text-sm">{filter}</span>
              </button>
            </li>
          ))}
        </ul>
      </div> */}
      <div className={`${showBrightness  ? 'hidden' : 'absolute bottom-[200px] flex items-center justify-center gap-5 w-full px-5'}`}>
          <MdBrightness3 size={20} color="black" />
          <input
            type="range"
            min="50"
            max="150"
            value={photoBrightness}
            onChange={handleBrightnessChange}
            className="slider"
          />
          <BsBrightnessHighFill size={30} color="15" />
      </div>

      <CameraNav capture={capturePhoto} toggleFilterDisplay={toggleFilterDisplay}/>
      <BottomNav grid={toggleGrid} brightness={toggleBrightnessDisplay}/>
    </div>
  );
};

export default CameraScreen;

