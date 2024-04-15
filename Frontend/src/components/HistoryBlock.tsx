import { DentistItem, PatientItem } from "../../interface";
import dayjs from "dayjs";
import Link from "next/link";



export default function HistoryBlock({Key,UserType,oneT,Doctor,Symptom,Treatment,Recommendation,Patient}:{Key:string,UserType:string,oneT:Date,Doctor:DentistItem,Symptom:string,Treatment:string,Recommendation:string,Patient:PatientItem}){
    return(
    <div className="rounded-lg shadow-md p-3 text-black relative">

        {(UserType=="patient")?null:
            <Link href={`/report/update?reportId=${Key}`}>
                <div className="absolute right-3 top-2 text-blue-500 ">Edit</div>
            </Link>
            }
        
        <div className="">Date:{dayjs(oneT).format('YYYY-MM-DD HH:mm:ss Z')}</div>
        <div className="">Doctor:{Doctor.name}</div>
        <div className="">Patient:{Patient.name}</div> 
        <div className="">Symptom:{Symptom}</div>
        <div className="">Treatment:{Treatment}</div>
        <div className="">Recommendation:{Recommendation}</div>
    </div>
    );
}