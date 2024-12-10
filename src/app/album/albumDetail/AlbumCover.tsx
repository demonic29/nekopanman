'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'

import coverAlbum from '../../imgs/sabrina.png'

const AlbumCover = () => {

    return (
        <div className='animate__animated animate__zoomIn'>
            <div className='relative h-[500px] w-screen bg-purple-500 rounded-b-3xl'>
                <Image
                    src={coverAlbum}
                    alt='Album-Cover'
                    fill
                    objectFit='cover'
                    className='rounded-b-3xl'
                />
            </div>
        </div>
    )
}

export default AlbumCover