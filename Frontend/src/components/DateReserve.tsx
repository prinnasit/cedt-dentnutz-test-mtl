"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import { useState,useEffect } from "react";
import { Dayjs } from "dayjs";
import getDentists from "@/libs/getDentists";
import { useSession } from "next-auth/react";

export default function DateReserve({
  onDateChange, onDentistChange, currentDate, currentDentist
}: {
  onDateChange: Function, currentDentist: string|null, currentDate: Dayjs|null, onDentistChange: Function
}) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(currentDate);
  const [dentist, setDentist] = useState<any>(currentDentist);
  const [allDentist, setAllDentist] = useState<any>(null);
  

  const { data: session } = useSession();

  const token = session?.user.token;
  if (!token) return null;

  useEffect(() => {
    const fetchData = async () => {
      const dentist = await getDentists();
      setAllDentist(dentist);
    }
    fetchData();
  },[]);

  if (!allDentist) return null;

  return (
    <div className="rounded-lg space-x-5 space-y-2 w-[100%] px-10 py-5 flex flex-col justify-center items-center">
      <div className="flex flex-row items-center">
        <div className="text-3xl font-semibold mb-[9.25%] mr-5">
          Dentist : Doctor
        </div>
        <Select variant="standard" name="dentist" id="dentist" value={dentist} className="h2-[2em] min-w-[200px] w-fit mb-10 text-3xl font-semibold" 
        inputProps={{MenuProps: {disableScrollLock: true}}} onChange={(e) => {setDentist(e.target.value),onDentistChange(e.target.value)}}>
                {allDentist.data.map((dentistItem:DentistItem) => {
                  return <MenuItem value={dentistItem._id}>{dentistItem.name}</MenuItem>
                })}
        </Select>
      </div>
        
      <div className="flex flex-row items-center space-x-5">
        <div className="text-2xl mx-auto">Appointment date : </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="text-2xl font-semibold"
            value={reserveDate}
            onChange={(value) => {
              setReserveDate(value);
              onDateChange(value);
            }}
          />
        </LocalizationProvider>
      </div>
        

      
    </div>
  );
}
