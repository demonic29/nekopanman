'use client';
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import BottomNav from "./BottomNav";
import CameraNav from "./CameraNav";

const CameraScreen = () => {
    const cameraRef = useRef<Webcam>(null);
    const [img, setImg] = useState<string | null>(null);

    function capturePhoto() {
        if (cameraRef.current) {
            const imgSrc = cameraRef.current.getScreenshot();
            setImg(imgSrc);
        }
    }

    const videoConstraints = {
        facingMode: "user",
    };

    useEffect(() => {
        if (!img) return;

        (async function uploadImage() {
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: img })
                });
                const data = await response.json();
                console.log('Upload response:', data);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        })();
    }, [img]);

    return (
        <div className="h-screen w-screen flex flex-col items-center relative">
            <Webcam
                ref={cameraRef}
                videoConstraints={videoConstraints}
                className="absolute h-full top-0 left-0 w-full object-cover"
            />
            {img && (
                <div className="mt-4">
                    <p>Captured Image:</p>
                    <Image src={img} alt="Captured" className="w-72 h-72" width={200} height={200} />
                </div>
            )}

            <CameraNav capture={capturePhoto} />

            <BottomNav />
        </div>
    );
};

export default CameraScreen;
