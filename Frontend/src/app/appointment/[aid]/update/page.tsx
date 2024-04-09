'use client'
import getAppointment from "@/libs/getAppointment";
import deleteAppointment from "@/libs/deleteAppointment";
import { Select, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import getDentists from "@/libs/getDentists";
import updateAppointment from "@/libs/updateAppointment";
import DateReserve from "@/components/DateReserve";
import { LinearProgress } from "@mui/material";

export default function AppointmentDetailPage({
  params,
}: {
  params: { aid: string };
}) {

  const [appointmentDetail, setAppointmentDetail] = useState<any>(null);
  const [appointmentDate, setAppointmentDate] = useState<Dayjs|null>(null);
  const [dentist, setDentist] = useState<any>(null);
  const [allDentist, setAllDentist] = useState<any>(null);
  

  const { data: session } = useSession();

  const token = session?.user.token;
  if (!token) return null;

  useEffect(() => {
    const fetchData = async () => {
      const appointment = await getAppointment(params.aid, token);
      const dentist = await getDentists();
      setAllDentist(dentist);
      setAppointmentDetail(appointment);
      setAppointmentDate(dayjs(appointment.data.appDate));
      setDentist(appointment.data.dentist._id);
    }
    fetchData();
  },[]);

 

  const router = useRouter();

    const editAppointment = async () => {
        await updateAppointment(appointmentDetail.data._id,dentist,dayjs(appointmentDate).format("YYYY/MM/DD"),token);
        router.push(`/appointment/${appointmentDetail.data._id}`);
      }

  if (!appointmentDetail) return (<div>
    <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">Loading... </p>
    <div className=" mb-20 "><LinearProgress/></div>
  </div>);

  return (
    <main className="text-center mt-20 mb-20">
      <div
          className="bg-slate-200 font-mono font-semibold w-fit rounded-lg mx-auto my-2 px-10 py-5 text-black space-y-8 justify-center items-center"
          key={appointmentDetail.data._id}
        >
          <div className="text-5xl mt-4">Patient : {appointmentDetail.data.userName}</div>
          <DateReserve
            onDateChange={(value: Dayjs) => {
              setAppointmentDate(value);
            }} currentDentist= {dentist}
            currentDate={appointmentDate}
            onDentistChange={(value: string) => {setDentist(value)}}
          />
          <button className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-5 py-3 shadow-sm text-white mx-auto text-2xl"
            name="Submit Changes" onClick={editAppointment}>
            Submit Changes
          </button>
        </div>
    </main>
    )
}
