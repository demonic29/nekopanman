'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './album.css'

// Import required modules
import { Navigation, EffectCoverflow , Pagination} from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

interface CarouselImages {
    id: string;
    url: string;
}

const CarouselImage = ({carouselId, carouselURL}) => {
    // const [carouselImages, setCarouselImages] = useState<CarouselImages[]>([]);

    // useEffect(() => {
    //     const fetchPhotos = async () => {
    //         try {
    //             const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
    //             const data: CarouselImages[] = await res.json();
    //             setCarouselImages(data);
    //         } catch (err) {
    //             console.error('Carousel Images fetch error', err);
    //         }
    //     };
    //     fetchPhotos();
    // }, []);

    return (
        <div className="mt-5 flex justify-center w-full">
            <Swiper
                loop={true}
                slidesPerView={2} // Shows three slides at a time
                spaceBetween={-100} // Spacing between slides
                centeredSlides={true} // Ensures the selected slide is centered
                grabCursor={true} // Enables a grabbing cursor
                navigation // Adds navigation buttons
                effect="coverflow" // Adds a 3D coverflow effect
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1.5,
                    slideShadows: true, // Disable shadows for clean visuals
                }}
                pagination={true}
                modules={[Navigation, EffectCoverflow, Pagination]}
            >
                <SwiperSlide key={carouselId} className="flex items-center justify-center">
                       <Link href="/album/albumDetail">
                            <div className="relative w-[250px] h-[350px] flex-shrink-0 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                                <Image
                                    fill
                                    alt="Album-Carousel-Images"
                                    src={carouselURL}
                                    className="object-cover"
                                    unoptimized
                                />
                                {/* Overlay with text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h2 className="font-bold text-lg">横浜ビーチ</h2>
                                        <p className="text-sm">48枚</p>
                                    </div>
                                </div>
                            </div>
                       </Link>
                    </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CarouselImage;