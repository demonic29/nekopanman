"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import CarouselImage from "./CarouselImage";

// Icons
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import ButtonNav from "../components/ButtonNav";
import { collection, getDocs, DocumentData, doc } from "firebase/firestore";
import { db } from "../utils/firebase/firebase";
import Loading from "../components/Loading";

interface CatPhoto {
  id: string;
  url: string;
}

interface AlbumDetails {
  userAlbumId: string;
  title: string;
  desc: string;
  img: string;
}

const AlbumLayout = () => {
  const [catPhotos, setCatPhotos] = useState<CatPhoto[]>([]);
  const [albums, setAlbums] = useState<AlbumDetails[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch cat photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          "https://api.thecatapi.com/v1/images/search?limit=10"
        );
        const data: CatPhoto[] = await res.json();
        setCatPhotos(data);
      } catch (error) {
        console.error("Error fetching cat photos:", error);
      }
    };
    fetchPhotos();
  }, []);

  // Fetch albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const albumCollection = collection(db, "albums");

        const snapshot = await getDocs(albumCollection);

        const fetchedAlbums: AlbumDetails[] = snapshot.docs.map(
          (doc: DocumentData) => ({
            albumId: doc.userAlbumId,

            ...(doc.data() as AlbumDetails),
          })
        );
        setAlbums(fetchedAlbums);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div className="w-screen px-3">
      {loading ? (
        <Loading loadingText={""} />
      ) : (
        <div>
          <Header />
          <CarouselImage />

          {/* Recent Albums */}
          <div>
            <div className="flex justify-between mt-[30px] items-center">
              <h1 className="text-lg">Recent Albums</h1>
              <div className="flex items-center gap-2">
                <Link href="/allAlbum">
                  <p className="text-[12px] text-purple-600">See all</p>
                </Link>
                <p className="text-purple-600">
                  <IoIosArrowForward />
                </p>
              </div>
            </div>

            <div className="overflow-x-auto whitespace-nowrap hidden-scrollbar mt-3">
              <div className="flex gap-4">
                {albums.map((album, index) => (
                  <div key={album.userAlbumId || index}>
                    <Link href={`/album/${album.userAlbumId}`}>
                      <div
                        className="relative w-[150px] h-[150px] flex-shrink-0 cursor-pointer"
                        title={album.title}
                      >
                        <Image
                          src={album.img}
                          alt={album.title}
                          fill
                          className="object-cover rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Friends */}
          <div className="mt-10">
            <div className="flex justify-between mt-[20px] items-center">
              <h1 className="">Friends</h1>
              <div className="flex items-center gap-2">
                <p className="text-[12px] text-purple-600">See all</p>
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
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Favorite */}
          <div className="mt-10">
            <div className="flex justify-between mt-[20px] items-center">
              <h1 className="text-lg">Favorite</h1>
              <div className="flex items-center gap-2">
                <p className="text-[12px] text-purple-600">See all</p>
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
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-10">
            <h1 className="my-3 text-xl">Categories</h1>
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
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="">#Family</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <ButtonNav />
        </div>
      )}
    </div>
  );
};

export default AlbumLayout;
