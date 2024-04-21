'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'



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
                <div className="text-xl text-slate-800 mt-5 text-left ml-8 font-medium">Doctor {dentistName}</div>
                <div className="text-xl text-slate-800 mt-5 text-left ml-8 font-medium">Experience : {yearsOfExperience} Years</div>
                <div className="text-xl text-slate-800 mt-5 text-left ml-8 font-medium">Expertise of : {areaOfExpertise}</div>
                
        </InteractiveCard>
    )
}