  "use client";
import getAppointment from "@/libs/getAppointment";
import deleteAppointment from "@/libs/deleteAppointment";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import dayjs from "dayjs";

export default function AppointmentDetailPage({
  params,
}: {
  params: { aid: string };
}) {
  const [appointmentDetail, setAppointmentDetail] = useState<any>(null);

  const { data: session } = useSession();

  const token = session?.user.token;
  if (!token) return null;
  console.log(session.user.type)

  useEffect(() => {
    const fetchAppointment = async () => {
      const appointment = await getAppointment(params.aid, token);
      setAppointmentDetail(appointment);
    };
    fetchAppointment();
  }, []);

  const router = useRouter();

  const cancelAppointment = async () => {
    await deleteAppointment(appointmentDetail.data._id, token);
    router.push("/schedule");
  };

  if (!appointmentDetail) return (<div>
      <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">Loading... </p>
      <div className=" mb-20 "><LinearProgress/></div>
    </div>);
  return (
    <main className=" mt-5 mb-20">
      <h1 className="text-5xl font-medium w-fit text-black bg rounded-lg m-3 py-6 px-10 mx- bg-bule-300 "> Patient Appointments</h1>
        <div className="font-semibold w-fit rounded-xl mx-auto my-2 px-14 py-5 text-black shadow-lg"
          key={appointmentDetail.data._id}>
          <div className="text-3xl text-slate-800 mt-5 text-left font-medium">Patient : {appointmentDetail.data.userName}</div>
          <div className="text-3xl text-slate-800 mt-5 text-left font-medium">Dentist : Doctor {appointmentDetail.data.dentist?.name}</div>
          <div className="text-3xl text-slate-800 mt-5 text-left font-medium">Appointment Date : {dayjs(appointmentDetail.data.appDate).format('DD / MM / YYYY')}</div>
          <div className="text-right">
          {
            (session.user.type==='patient' || (session.user.type!=='patient' && session.user.type!=='dentist'))?
            <div>
            <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
              <button className=" text-base text-blue-500 mt-5 text-right font-medium" name="Edit Appointment">Edit</button>
            </Link>
          <button onClick={cancelAppointment} className="ms-5 text-base text-blue-500 mt-5 text-right font-medium me-2">
          Cancle
          </button>
          </div>
            :
            <div>
            <button onClick={(e)=>{e.stopPropagation(); router.push(`../report/create?userId=${appointmentDetail.data.user}&dentistId=${appointmentDetail.data.dentist._id}&apptId=${appointmentDetail.data._id}`)}}
              className="ml-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                +
                </button>
            <button onClick={cancelAppointment} className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Finish
            </button>
            </div>
            
          }
            </div>
          </div>
    </main>
  );
}
