'use client'
import React, { useEffect, useState } from 'react'

// components
import AlbumCover from './AlbumCover'
import Members from './Members'
import AlbumDetails from './AlbumDetails'
import Button from '../../components/Button'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase/firebase'
import { useRouter } from 'next/navigation'
import Loading from '../../components/Loading'

interface AlbumDatas {
  id: string
  title: string
  desc: string
  img: string
}

const AlbumDetailLayout = ({
  params,
}: {
  params: Promise<{ albumDetailsId: string }>
}) => {
  const [showData, setShowData] = useState<AlbumDatas | null>(null)

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const userAlbumId = (await params).albumDetailsId
        const docRef = doc(db, 'albums', userAlbumId) // Reference the document
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setShowData({ id: docSnap.id, ...docSnap.data() } as AlbumDatas)
        } else {
          console.error('No such document!')
        }
      } catch (err) {
        console.error('Error fetching album:', err)
      }
    }
    fetchAlbum()
  }, [])

  return (
    <div className='bg-purple-900 text-white h-screen'>
      {showData ? (
        <div key={showData.id}>
          <AlbumCover coverImage={showData.img} />
          {/* <Members /> */}
          <AlbumDetails title={showData.title} desc={showData.desc} />
          <div className="absolute bottom-10">
            <Button title={'アルバムホームページへ戻る'} navigation={'/album'} />
          </div>
        </div>
      ) : (
        <Loading loadingText={"We are currently moving to Your Album..."}/>
      )}
    </div>
  )
}

export default AlbumDetailLayout
