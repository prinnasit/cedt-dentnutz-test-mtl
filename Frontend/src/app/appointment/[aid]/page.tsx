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

export default function AppointmentDetailPage({
  params,
}: {
  params: { aid: string };
}) {
  const [appointmentDetail, setAppointmentDetail] = useState<any>(null);

  const { data: session } = useSession();

  const token = session?.user.token;
  if (!token) return null;

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
    <main className="text-center mt-20 mb-20">
        <div
          className=" font-mono font-semibold w-fit rounded-lg mx-auto 
          my-2 px-14 py-5 text-black space-y-14" style={{ backgroundColor: 'rgb(247, 238, 221)' }}
          key={appointmentDetail.data._id}>
          <div className="text-5xl mt-4">Patient : {appointmentDetail.data.userName}</div>
          <div className="text-3xl text-slate-700">
            Dentist : Doctor {appointmentDetail.data.dentist?.name}
          </div>
          <div className="text-2xl text-slate-700">
            Appointment Date :{" "}
            {new Date(appointmentDetail.data.appDate).toLocaleDateString()}
          </div>
          <div className="space-x-10">
          {
            (session.user.type==='patient' || (session.user.type!=='patient' && session.user.type!=='dentist'))?
            <div>
            <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
            <button
              className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-3 py-2 shadow-sm text-white inline"
              name="Edit Appointment"
            >
              Edit Appointment
            </button>
          </Link>
          <button onClick={cancelAppointment} className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Cancle
        </button>
        </div>
            :
            <div>
            <button onClick={(e)=>{e.stopPropagation(); router.push(`../report/create/${appointmentDetail.data.user}`)}}
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
