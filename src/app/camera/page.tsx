"use client";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import BottomNav from "./BottomNav";
import CameraNav from "./CameraNav";

// Import the Cloudinary class
import {Cloudinary} from '@cloudinary/url-gen';

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true // force https, set to false to force http
  }
});

const live_filters = [
  { name: "al_dente", css: "contrast(1.2) saturate(1.2)" },
  { name: "athena", css: "grayscale(0.5) sepia(0.3)" },
  { name: "audrey", css: "brightness(1.1) contrast(1.1)" },
  { name: "aurora", css: "hue-rotate(30deg)" },
  { name: "daguerre", css: "sepia(0.7)" },
  { name: "eucalyptus", css: "brightness(0.9) contrast(1.3)" },
  { name: "fes", css: "hue-rotate(180deg) saturate(1.3)" },
  { name: "frost", css: "brightness(0.85)" },
  { name: "hairspray", css: "contrast(1.5) brightness(1.2)" },
  { name: "hokusai", css: "contrast(1.2) hue-rotate(60deg)" },
  { name: "incognito", css: "grayscale(1)" },
  { name: "linen", css: "sepia(0.3) brightness(1.1)" },
  { name: "peacock", css: "contrast(1.4) saturate(1.4)" },
  { name: "primavera", css: "brightness(1.2) hue-rotate(40deg)" },
  { name: "quartz", css: "contrast(1.2) grayscale(0.5)" },
  { name: "red_rock", css: "sepia(0.7) contrast(1.3)" },
  { name: "refresh", css: "saturate(1.5)" },
  { name: "sizzle", css: "brightness(1.3) contrast(1.3)" },
  { name: "sonnet", css: "hue-rotate(150deg) contrast(1.1)" },
  { name: "ukulele", css: "contrast(1.2) hue-rotate(90deg)" },
  { name: "zorro", css: "contrast(1.1) brightness(0.9)" }
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
  const [photoFilter, setPhotoFilter] = useState<string>("");
  const [photoCaptured, setPhotoCaptured] = useState(false)

  const cloudImage = cldData?.public_id && cloudinary.image(cldData.public_id);
  if (cloudImage && photoFilter) {
    cloudImage.effect(`e_art:${photoFilter}`);
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
      {!src ? (
        <Webcam
          ref={webcamRef}
          videoConstraints={{ facingMode: "user" }}
          className="w-full object-contain"
          style={{ filter: liveFilter || "none" }}
        />
      ) : (
        <Image src={src} alt="Captured Image" width={500} height={500} />
      )}

      <div className={`${photoCaptured ? 'hidden' :' mt-[20px] px-5'} `}>
        <h2 className="font-bold text-2xl mb-5">Live Filters</h2>
        <ul className="flex flex-wrap gap-5">
          {live_filters.map(({ name, css }) => (
            <li key={name} className="border border-black p-3 w-[70px] overflow-hidden rounded-lg">
              <button onClick={() => setLiveFilter(css)}>
                <Webcam
                  videoConstraints={{facingMode: 'user'}}
                  style={{filter: css}}
                  className="w-full h-[100px] object-cover"
                />
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[20px] px-5">
        <h2 className="font-bold text-2xl mb-5">Photo Filters</h2>
        <ul className="flex flex-wrap gap-5">
          {photo_filters.map((filter) => (
            <li className="border border-black p-3 rounded-lg" key={filter}>
              <button onClick={() => setPhotoFilter(filter)}>
                <span>{filter}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CameraNav capture={capturePhoto} />
      <BottomNav />
    </div>
  );
};

export default CameraScreen;

