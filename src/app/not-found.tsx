import Link from 'next/link'
import notfoundImg from '../app/imgs/stickers/7.png'
import Button from './components/Button'
import Image from 'next/image'
 
export default function NotFound() {
  return (
    <div className='flex justify-center items-center h-screen px-3'>
        <div className='grid gap-10'>      
            <div>
                <h1 className='font-bold text-2xl mb-2 text-red-500'>ERROR - わからない</h1>
                <p className=''>探しているページは現在提供していません。開発者チームに <span className='text-red-500'>しっかりしなさいと伝えときます。</span> 探しているページなくてごめんなさい！</p>
            </div>
            <div className='relative h-64'>
                <Image
                    alt='not-found-image'
                    fill
                    src={notfoundImg}
                    objectFit='cover'
                />
            </div>
            <Button title={"戻る"} navigation={"/album"}/>
        </div>
    </div>
  )
}