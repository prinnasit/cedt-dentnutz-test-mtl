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
    <div className="container mx-auto">  
      <div className="flex flex-wrap p-5">
        {appointmentJsonReady.data.map((appointmentItem) => (
          <Link href={`/appointment/${appointmentItem._id}`}
            className="w-full sm:w-1/2 md:w-1/2 xl:w-1/2 p-4 transition ease-in-out hover:scale-105"
            key={appointmentItem._id}>
            <div
              className="p-4 bg-white font-medium rounded-xl text-black text-center border-2 border-slate-200  hover: border-2 hover:bg-slate-50 relative shadow-lg hover:border-sky-500 " key={appointmentItem._id}>
              <div className="text-2xl text-slate-800 mt-5 text-left">Patient : {appointmentItem.userName}</div>
              <div className="text-2xl text-slate-800 mt-5 text-left">Doctor : {appointmentItem.dentist?.name}</div>
              <div className="text-2xl text-slate-800 mt-5 text-left">Date :{" "} {dayjs(appointmentItem.appDate).format("DD / MM / YYYY - HH:mm")}</div>

              {/* <div className="text-base text-blue-500 mt-5 text-right mr-5">Edit</div> */}

              {/* <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
                            <button className="text-base text-blue-500 mt-5 text-right" name="Edit Appointment">Edit</button>
                        </Link> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
