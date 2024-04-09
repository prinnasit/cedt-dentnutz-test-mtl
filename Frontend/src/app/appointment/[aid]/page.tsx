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
    router.push("/appointment");
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
            <Link href={`/appointment/${appointmentDetail.data._id}/update`}>
              <button
                className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-3 py-2 shadow-sm text-white inline"
                name="Edit Appointment"
              >
                Edit Appointment
              </button>
            </Link>
            <button
              className="block bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600  hover:text-red-200 px-3 py-2 shadow-sm text-white inline"
              name="Cancel Appointment"
              onClick={cancelAppointment}
            >
              Cancel Appointment
            </button>
            </div>
          </div>
    </main>
  );
}
