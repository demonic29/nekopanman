'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react'

import coverAlbum from '../../imgs/sabrina.png'

const AlbumCover = ({coverImage}) => {

    return (
        <div className='relative h-[500px]'>
            <Image
                src={coverImage}
                alt='Album-Cover'
                fill
                objectFit='cover'
                className='rounded-b-3xl'
            />
        </div>
    )
}

export default AlbumCover