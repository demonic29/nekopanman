"use client";

// react_imports
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// component_imports
import BottomNav from "./BottomNav";
import CameraNav from "./CameraNav";

// imgs_imports
import cameragrid from '../imgs/camera-grid.png'
import logo from '../imgs/logo.png'

// cloudinary_imports
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { brightness } from "@cloudinary/url-gen/actions/adjust";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdBrightness3 } from "react-icons/md";
import { cartoonify } from "@cloudinary/url-gen/actions/effect";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";
import { scale } from "@cloudinary/url-gen/actions/resize";

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

// const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

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

const CameraScreen = ({navigation}) => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cldData, setCldData] = useState<any>(null);
  const [liveFilter, setLiveFilter] = useState<string>("");
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("")
  const [changeNav, setChangeNav] = useState('default');

  const [loading, setLoading] = useState(true);
  
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
  
  // grid
  const [showGrid, setShowGrid] = useState(false);
  const toggleGrid = () => setShowGrid(prev => !prev)
  
  // filter
  const [photoFilter, setPhotoFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState(false);
  const toggleFilterDisplay = () => setShowFilter(prev => !prev);

  // brightness
  const [photoBrightness, setPhotoBrightness] = useState(80);
  const [showBrightness, setShowBrightness] = useState(false);
  const toggleBrightnessDisplay = () => setShowBrightness(prev => !prev)
  
  // cartoonify
  const [photoCartoonify, setPhotoCartoonify] = useState(0);
  const [showCartoonify, setShowCartoonify] = useState(false);
  const toggleCartoonDisplay = () => setShowCartoonify(prev => !prev);

  // generate_bg
  const [generateBg, setGenerateBg] = useState<string>("");
  const [showGenerateBg, setShowGenerateBg] = useState(false);
  const toggleGenerateBg = () => setShowGenerateBg(prev=>!prev);
 
  const cloudImage = cldData?.public_id && cloudinary.image(cldData.public_id);

  if (cloudImage) {
    if (photoFilter) {
        cloudImage.effect(`e_art:${photoFilter}`);
    }
    if (photoBrightness) {
        const brightnessStrength = Math.min(Math.max(photoBrightness, 10), 100);
        cloudImage.adjust(brightness().level(brightnessStrength));
    }
    if (photoCartoonify) {
        const cartoonifyStrength = Math.min(Math.max(photoCartoonify, 10), 100);
        cloudImage.effect(cartoonify().lineStrength(cartoonifyStrength));
    }
    // if(generateBg){
    //   cloudImage.effect();
    // }
   
  }

  const src = cloudImage?.toURL() || imageSrc;

  function capturePhoto() {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotoCaptured(true);
        setChangeNav('post-capture');
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
              setDownloadUrl(filteredImage)
            }
          };
        };
      }
    }
  }



  const handleBrightnessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (parseInt(event.target.value, 10)); // Parse as integer for better control
    setPhotoBrightness(Math.min(Math.max(value,10), 100))
  };

  const handleCartoonifyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) || 0;
    setPhotoCartoonify(Math.min(Math.max(value, 10), 1000)); // Clamp to 10–100 range
  };

  const handleBackgroundChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
    try {
      const userInput = event.target.value.trim();
      setGenerateBg(userInput);
      cloudImage.resize(scale().width(500)); 
      cloudImage.effect(`e_gen_background_replace:prompt_${userInput}`);
      const updatedImageUrl = cloudImage.toURL();
      setImageSrc(updatedImageUrl);
      
    } catch (error) {
      console.error("Error applying background effect:", error);
      alert("Background generation timed out. Please try again later.");
    }
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
    <div className="h-dvh w-screen flex flex-col items-center relative">
        {/* {!src ? (
          <Webcam
            ref={webcamRef}
            videoConstraints={{ facingMode: "user" }}
            className="w-full h-full object-cover"
            style={{ filter: `${liveFilter} brightness(${photoBrightness}%)` }}
          />
       
        ) : (
         <div className="flex justify-center items-center h-full">
           <div  className="">
            <div className=" text-center bg-purple-500 text-white py-2 rounded-lg">
              <a href={downloadUrl || "#"} download='YourPhoto.png'>Download Image</a>
            </div>
            <Image src={src} alt="Captured Image" width={350} height={400} className="rounded-lg mt-5 mb-10"/>
          </div>
         </div>
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
      <div className={`${!showBrightness  ? 'hidden' : 'absolute bottom-[200px] flex items-center justify-center gap-5 w-full px-5'}`}>
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

      <div className={`${!showCartoonify ? 'hidden' : 'absolute bottom-[200px] flex items-center justify-center gap-5 w-full px-5'}`}>
          <MdBrightness3 size={20} color="black" />
          <input
              type="range"
              min="10"
              max="100"
              value={photoCartoonify}
              onChange={handleCartoonifyChange}
              className="slider"
          />
          <BsBrightnessHighFill size={30} color="15" />
      </div>

      <div className={`${!showGenerateBg ? 'hidden' : 'absolute bottom-[200px] grid gap-2 w-full px-5'}`}>
        <label htmlFor="background-input" className="text-sm font-medium">
          何でもいいから、入力しや
        </label>
        <input
          id="background-input"
          type="text"
          value={generateBg}
          onChange={handleBackgroundChange}
          placeholder="e.g., beach, mountains, cityscape"
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <CameraNav capture={capturePhoto} toggleFilterDisplay={toggleFilterDisplay} />
      <BottomNav 
        background={toggleGenerateBg} 
        grid={toggleGrid} 
        brightness={toggleBrightnessDisplay} 
        cartoonify={toggleCartoonDisplay} 
      />

      {/* <button onClick={() => navigation.navigate('Sticker')}>click me</button> */}
    </div>
  );
};

export default CameraScreen;

