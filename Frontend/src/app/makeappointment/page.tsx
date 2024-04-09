"use client";
import DateReserve from "@/components/DateReserve";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import addAppointment from "@/libs/addAppointment";
import { LinearProgress } from "@mui/material";

export default function AppointmentMaking() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = session?.user.token;
  if (!token) return null;

  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
  const [dentistID, setDentistID] = useState<string | null>(searchParams.get("dentistid"));
  const [dentist, setDentist] = useState<string | null>(searchParams.get("dentistname"));

  let appDate = dayjs(appointmentDate).format("YYYY/MM/DD");

  const makingAppointment = async () => {
    if (!dentistID || !appDate) return alert("Please enter all fields");
    const appointment = await addAppointment(
      dentistID,
      appDate,
      token
    );
    if (appointment) {
      alert("Appointment booked successfully");
    } else {
      alert("Appointment booking failed");
    }
  };

  return (
    <main className="w-[100%] text-center items-center space-y-5 mt-20 mb-20" >
      <div className=" font-mono font-semibold w-fit rounded-lg mx-auto my-2 
      px-14 py-5 text-black space-y-14 justify-center items-center" style={{ backgroundColor: 'rgb(247, 238, 221)' }}>
        <div className="text-5xl mt-4" >
          Dentist Appointment
        </div>

          <DateReserve
            onDateChange={(value: Dayjs) => {
              setAppointmentDate(value);
            }} currentDentist= {dentistID}
            currentDate={appointmentDate}
            onDentistChange={(value: string) => {setDentistID(value)}}
          />
            
        <button
          className="block rounded-md bg-[#008DDA] hover:bg-indigo-500 px-5 py-4 shadow-sm text-xl text-bold mb-10 mt-3 text-white mx-auto"
          name="Make Appointment"
          onClick={makingAppointment}
        >
          Make Appointment
        </button>
      </div>
    </main>
  );
}
