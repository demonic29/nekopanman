import React, { createElement, useRef, useState } from 'react'

// utilites
import Image from 'next/image';

// icons
import { LuSearch } from "react-icons/lu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaEdit, FaPlus } from 'react-icons/fa';

// nextui
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalContent, useDisclosure , ModalBody, ModalHeader, ModalFooter, Spinner} from '@nextui-org/react';

import logo from '../imgs/loadingImg.png'

// firebase
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../utils/firebase/firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';

const Header = () => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();

    // album-cover-upload
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("");
  
    const handleImageCover = (e) => { 
      const fileInput = document.getElementById("cover-upload") as HTMLInputElement;
      if(fileInput){
        fileInput.click();
      }
      console.log("im clicked")
    }
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file){
        setCoverImage(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    }

  // Firestore にアルバムのデータを保存
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const [albumDesc, setAlbumDesc] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [doneAlbum, setDoneAlbum] = useState(false);

  const uploadNewAlbum = async() => {
    
    if(!albumTitle.trim()){
      alert("アルバム名を入力してください")
    }

    if(!albumDesc.trim()){
      alert("アルバム情報を入力してください")
    }

    if(!coverImage){
      alert("画像を選択してください")
      return;
    }

    const uploadImage = (file:File, path: string): Promise<string> => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`upload is ${progressPercent} % done`)
          },
          (err) => reject(err),
          async() => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        )
      })
    }

    try{
      setDoneAlbum(true);
      const albumId = new Date().getTime().toString()
      const albumDatas = doc(db, "albums", albumId);      
      // upload image to firebase
      const imageUrl = await uploadImage(coverImage, `images/${coverImage.name}`);

      // save album data to firestore
      await setDoc(albumDatas, {
        userAlbumId: albumId,
        title: albumTitle,
        desc: albumDesc,
        img : imageUrl,
        createdAt: new Date(),

      });
      setTimeout(() => {
        setDoneAlbum(false);
        router.push(`/album/${albumId}`);
      });

    }catch(err){
      console.error("Error album create", err)
    }finally{
      setLoading(false);
    }
  }


  
  return (
    <div className='flex justify-between mt-5 px-10 py-5'>
        <div>
            <h1 className='font-bold text-xl'>MoriMori</h1>
        </div>
        <div className='flex gap-5'>
            <LuSearch size={25}/>

            <Dropdown>
              <DropdownTrigger>
                <HiOutlineDotsHorizontal size={25}/>
               
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={onOpen}>アルバム作成</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Modal 
              isOpen={isOpen} 
              onOpenChange={onOpenChange}
              placement='bottom'
             
            >
              <ModalContent className='w-screen'>
                {
                  (onclose) => (
                    <>
                      <ModalHeader>アルバム作成</ModalHeader>
                      <ModalBody>
                        <div className="h-60 border relative">
                         {
                          previewImage ? (
                            <Image
                              src={previewImage}
                              alt="logo"
                              fill
                              objectFit="cover"
                            />
                          ) : (
                            <div>
                              <Image
                                src={logo}
                                alt="logo"
                                fill
                                objectFit="cover"
                              />
                              <button onClick={handleImageCover}>
                                <FaEdit
                                  className="absolute bottom-0 right-0"
                                  size={25}
                                />
                              </button>
                            </div>
                  
                          )
                         }
                         <input
                          id="cover-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className='invisible'
                         />

                          {coverImage && (
                            <button onClick={handleImageCover}>
                            <FaEdit
                              className="absolute bottom-0 right-0 text-white"
                              size={25}
                            />
                          </button>
                        )}
                        </div>
                       
                        <div className="grid gap-7 mt-5">
                          <div className="grid gap-2">
                            <label htmlFor="" className="font-bold">
                              タイトル
                            </label>
                            <Input
                              style={{ border: 0 }}
                              placeholder="アルバム名入力"
                              onChange={(e) => setAlbumTitle(e.target.value)}
                            />
                          </div>

                          <div className="grid gap-2">
                            <label htmlFor="" className="font-bold">
                              デスクリプション
                            </label>
                            <Input
                              style={{ border: 0 }}
                              placeholder="アルバム名入力"
                              onChange={(e) => setAlbumDesc(e.target.value)}
                            />
                          </div>

                          <div className="grid gap-2">
                            <label htmlFor="" className="font-bold">
                              タグ
                            </label>
                            <FaPlus />
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <button onClick={uploadNewAlbum}>作成する</button>

                        <Modal isOpen={doneAlbum} placement="bottom">
                          <ModalContent className="h-[60%]">
                            <ModalBody>
                              <div className="relative h-64">
                                <Image
                                  src={logo}
                                  fill
                                  alt="album-created-image"
                                  objectFit="cover"
                                />
                              </div>
                              <div>
                                <h1>
                                  アルバム作成中です。完了したら自動にアルバムのホームページへ戻ります。
                                </h1>
                              </div>
                              <div className="flex justify-center my-10">
                                <Spinner
                                  label="移動中..."
                                  color="secondary"
                                  labelColor="secondary"
                                />
                              </div>

                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      </ModalFooter>
                    </>
                  )
                }
              </ModalContent>
            </Modal>
            
        </div>
    </div>
  )
}

export default Header