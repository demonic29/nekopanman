'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface CatPhoto{
    id: string;
    url: string;
}

const Members = () => {
    const [catPhotos, setCatPhotos] = useState<any[]>([]);
    useEffect(() => {
        const fetchCatPhotos = async() => {
            try{
                const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
                const data: CatPhoto[] = await res.json();
                setCatPhotos(data);
            }catch(err){
                console.error('Cat fetch data error', err);
            }
        };
        fetchCatPhotos();
    }, []);

    return (
        <div className=" mt-5 px-3">
            <h1 className='font-semibold mb-2 text-xl'>メンバー</h1>
            <div className='overflow-x-auto whitespace-nowrap hidden-scrollbar'>
                <div className="flex gap-2">
                    {catPhotos.map((catPhoto) => (
                    <div
                        key={catPhoto.id}
                        className="relative w-[40px] h-[40px] flex-shrink-0"
                    >
                        <Image
                            src={catPhoto.url}
                            alt="Cat-Photo"
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Members