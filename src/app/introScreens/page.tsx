'use client'

import Image from 'next/image'
import React, { useState, useRef } from 'react'
import { Camera } from 'react-camera-pro'

// Images
import img1 from '../imgs/mainImg1.png'
import img2 from '../imgs/mainImg2.png'
import img3 from '../imgs/mainImg3.png'
import Link from 'next/link'

const IntroScreen = () => {
    const [screens] = useState([
        { text: "Welcome to Screen 1", img: img1, id: 1 },
        { text: "Explore Screen 2", img: img2, id: 2 },
        { text: "Discover Screen 3", img: img3, id: 3 }
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);

    const camera = useRef();

    // scroll event
    const handleScroll = () => {
        if(scrollRef.current){
            const scrollPosition = scrollRef.current.scrollLeft;
            const itemWidth = scrollRef.current.offsetWidth;
            const newIndex = Math.round(scrollPosition/ itemWidth);
            setCurrentIndex(newIndex)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-scroll space-x-5 p-4 max-w-full scroll-smooth snap-x snap-mandatory"
            >
                {screens.map((screen) => (
                    <div 
                        key={screen.id} 
                        className="flex-shrink-0 w-[90vw] max-w-[600px] snap-center"
                    >
                        <Image
                            src={screen.img}
                            alt="home-screen-img"
                            className="rounded-lg object-cover"
                        />
                        <h1 className="text-center mt-4 font-semibold">{screen.text}</h1>
                    </div>
                ))}
            </div>

            {/* Dot pagination */}
            <div className="flex space-x-2 mt-5">
                {screens.map((screen, index) => (
                    <div
                        key={screen.id}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>

            {/* footerBtn */}
            <div className='mt-5 text-center'>
                {currentIndex === screens.length - 1 && (
                    <>
                        <button className='bg-purple-500 px-[100px] w-[90vw] rounded-full text-white py-3 mb-2'></button><br />
                        <Link href="/camera" className=''>カメラ起動</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default IntroScreen;
