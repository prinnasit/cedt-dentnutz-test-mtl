import dayjs from "dayjs";
import Link from "next/link";
import { AppointmentJson } from "../../interface";

export default async function AppointmentList({
    appointmentJson,
}: {
    appointmentJson: Promise<AppointmentJson>;
}) {
    const appointmentJsonReady = await appointmentJson;

    return (
        <div
            className=" mx-15 pt-10 px-16 rounded-xl"
        >
            {appointmentJsonReady.data.map((appointmentItem) => (
                <Link
                    href={`/appointment/${appointmentItem._id}`}
                    className=""
                    key={appointmentItem._id}
                >
                    <div
                        className="bg-white w-[40vw] font-medium rounded-xl my-3 px-10 pt-3 pb-7 text-black space-y-5 text-center hover:bg-slate-50 relative shadow-lg hover: border-sky-500 "
                        key={appointmentItem._id}
                    >
                        
                        <div className="text-2xl text-slate-800 mt-5 text-left">
                            Patient : {appointmentItem.userName}  
                        </div>
                        <div className="text-2xl text-slate-800 mt-5 text-left">
                            Doctor : {appointmentItem.dentist?.name}
                        </div>
                        <div className="text-2xl text-slate-800 mt-5 text-left">
                            Date : {dayjs(appointmentItem.appDate).format('DD / MM / YYYY')}
                        </div>
                        
                        <div className="text-base text-blue-500 mt-5 text-right">
                            Edit
                        </div>

                        {/* <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
                            <button className="text-base text-blue-500 mt-5 text-right" name="Edit Appointment">Edit</button>
                        </Link> */}

                    </div>
                </Link>
            ))}
        </div>
    );
}
