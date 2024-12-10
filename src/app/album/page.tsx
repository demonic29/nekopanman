"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import CarouselImage from "./CarouselImage";

// icons
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import ButtonNav from "../components/ButtonNav";

interface CatPhoto {
  id: string;
  url: string;
}
const AlbumLayout = () => {
  const [catPhotos, setCatPhotos] = useState<any[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        const data: CatPhoto[] = await res.json();
        setCatPhotos(data);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="w-screen ps-2">
      <Header />
      <CarouselImage />

      {/* recent_album */}
      <div>
        <div className="flex justify-between mt-[30px] items-center">
          <h1 className="font-bold">最近のアルバム</h1>
          <div className="flex items-center gap-2">
            <Link href="/allAlbum">
              <p className="text-sm text-purple-600">すべて</p>
            </Link>
            <p className="text-purple-600">
              <IoIosArrowForward />
            </p>
          </div>
        </div>

        <div className="overflow-x-auto whitespace-nowrap hidden-scrollbar mt-3">
          <div className="flex gap-4">
            {catPhotos.map((catPhoto) => (
              <div
                key={catPhoto.id}
                className="relative w-[150px] h-[150px] flex-shrink-0"
              >
                <Image
                  src={catPhoto.url}
                  alt="Cat-Photo"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* friends */}
      <div className="mt-10">
        <div className="flex justify-between mt-[20px] items-center">
          <h1 className="font-bold">友達と</h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-purple-600">すべて</p>
            <p className="text-purple-600">
              <IoIosArrowForward />
            </p>
          </div>
        </div>

        <div className="overflow-x-auto whitespace-nowrap hidden-scrollbar mt-3">
          <div className="flex gap-4">
            {catPhotos.map((catPhoto) => (
              <div
                key={catPhoto.id}
                className="relative w-[100px] h-[100px] flex-shrink-0"
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

      {/* favorite */}
      <div className="mt-10">
        <div className="flex justify-between mt-[20px] items-center">
          <h1 className="font-bold">お気に入り</h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-purple-600">すべて</p>
            <p className="text-purple-600">
              <IoIosArrowForward />
            </p>
          </div>
        </div>

        <div className="overflow-x-auto whitespace-nowrap hidden-scrollbar mt-3">
          <div className="flex gap-4">
            {catPhotos.map((catPhoto) => (
              <div
                key={catPhoto.id}
                className="relative w-[150px] h-[150px] flex-shrink-0"
              >
                <Image
                  src={catPhoto.url}
                  alt="Cat-Photo"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-10">
        <h1 className="text-center font-bold my-3 text-xl">カテゴリ</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-[150px]">
        {catPhotos.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="relative w-[180px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <Image
              fill
              alt="Album-Carousel-Images"
              src={item.url}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="font-semibold text-lg">#家族</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <ButtonNav/>
      

    </div>
  );
};

export default AlbumLayout;
