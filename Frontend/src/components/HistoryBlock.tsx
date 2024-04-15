import { DentistItem, PatientItem } from "../../interface";
import dayjs from "dayjs";


export default function HistoryBlock({UserType,oneT,Doctor,Symptom,Treatment,Recommendation,Patient}:{UserType:string,oneT:Date,Doctor:DentistItem,Symptom:string,Treatment:string,Recommendation:string,Patient:PatientItem}){
    return(
    <div className="rounded-lg shadow-md p-3 text-black relative">

        {(UserType=="patient")?null:<a href="/report/update">
            <div className="absolute right-3 top-2 text-blue-500 ">Edit</div>
        </a>}
        
        <div className="">Date:{dayjs(oneT).format('YYYY-MM-DD HH:mm:ss Z')}</div>
        <div className="">Doctor:{Doctor.name}</div>
        <div className="">Patient:{Patient.name}</div> 
        <div className="">Symptom:{Symptom}</div>
        <div className="">Treatment:{Treatment}</div>
        <div className="">Recommendation:{Recommendation}</div>
    </div>
    );
}