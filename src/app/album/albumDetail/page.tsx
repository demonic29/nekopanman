// 'use client'
import React from 'react'

// components
import AlbumCover from './AlbumCover'
import Members from './Members'
import AlbumDetails from './AlbumDetails'
import Button from '../../components/Button'

const page = () => {
  return (
    <div>
      <AlbumCover/>
      <Members/>
      <AlbumDetails/>
      <Button title={'アルバムホームページへ戻る'} navigation={"/album"}/>
    </div>
  )
}

export default page