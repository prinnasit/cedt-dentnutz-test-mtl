'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from '@mui/material'
import { useState , useEffect} from 'react'
import getDentists from '@/libs/getDentists'
import DentistCatalog from './DentistCatalog'


export default  function Card({dentistName , imgSrc, onRating  , yearsOfExperience , areaOfExpertise }:{ dentistName:string, imgSrc:string, onRating?:Function 
    , yearsOfExperience : string , areaOfExpertise : string}) {
    // let ratingName = dentistName + " Rating"

    // const [value, setValue] = useState<number | null>(5);
    


    return (
        <InteractiveCard contentName={dentistName}>
                <div className='w-full h-[70%] relative rounded-lg'>
                    <Image src={imgSrc}
                    alt='Hospital picture'
                    fill={true}
                    className='object-cover rounded-t-lg'
                    /> 
                </div>
                <div className=' rounded-b-lg w-full h-[30%] text-black text-xl font-semibold py-8'
                style={{ backgroundColor: 'rgb(220, 242, 241)' }}
                >   
                    Doctor {dentistName}
                    <h3>Years of Experience : {yearsOfExperience}</h3>
                    <h3>Area of Expertise : {areaOfExpertise}</h3>
                </div>
                
        </InteractiveCard>
    )
}