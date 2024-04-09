'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import getUserProfile from '@/libs/getUserProfile'

export default function Banner() {
//   const covers =['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
//   const [index, setIndex] = useState(0)

  const router = useRouter()

  
  const { data: session } = useSession();

  const token = session?.user.token;

  const [me , setMe] = useState<any>(null)

  useEffect( ()=>{
    const fetchMe = async ()=>{
        if (!token) return null
        const profile = await getUserProfile(token)
        setMe(profile)
    }
    fetchMe()
  },[])

  
  return (
    <div className="block p-5 m-0 w-screen h-[80vh] relative flex flex-row items-center justify-center"
    style={{ backgroundColor: 'rgb(247, 238, 221)' }}>
        
        <div className="text-black text-left max-w-md rounded-lg p-10 mx-20 z-20 font-mono" style={{ backgroundColor: 'rgb(247, 238, 221)' }}>
            <h1 className='text-5xl font-bold text-amber-500 mb-10'>CUD Dentist Clinic</h1>
            {
                session && me? <div className='font-semibold text-cyan-800 text-xl'>Welcome {me.data.name}</div> : null
            }
            <button className='bg-blue-500 text-white text-2xl font-semibold py-2 px-2 my-8 rounded hover:bg-blue-400   hover:text-blue-500'
                onClick={(e)=>{e.stopPropagation(); router.push('/dentist');}}>
                Select Your Dentist
            </button>   
        </div>

        <div className='flex-grow'>
            <Image src='/img/cover1.jpg'  alt='cover' fill={true}  priority={true}  className='object-cover w-[100%] h-[100%]' />
        </div>
    </div>
  )
}
