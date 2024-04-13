"use client"
"useContext"
import { TextField } from "@mui/material";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

export default function updateReport() {

  
  return (
    <main className="justify-center items-center p-5 flex flex-col">
        <h1 className="mx-auto w-fit text-2xl mb-10">Update "Name" Report</h1>
        <AccessAlarmIcon style={{ fontSize: 200 }} color="action"/>
        <div className="shadow-lg rounded-lg w-4/5 flex flex-col justify-items-center content-center p-5 space-y-2">
            <div className="flex flex-row ">
                <div className="text-xl basis-1/4">Date:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Date" variant="outlined" />
            </div>
            <div className="flex flex-row ">
                <div className="text-xl basis-1/4">Doctor:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Doctor" variant="outlined" />
            </div>
            <div className="flex flex-row ">
                <div className="text-xl basis-1/4">Symptom:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Symptom" variant="outlined" />
            </div>
            <div className="flex flex-row ">
                <div className="text-xl basis-1/4">Treatment:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Treatment" variant="outlined" />
            </div>
            <div className="flex flex-row ">
                <div className="text-xl basis-1/4">Recommmendation:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Recommmendation" variant="outlined" />
            </div>
            
            <button className="relative border-2 border-gray-800 bg-transparent py-2.5 px-5 font-medium uppercase text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gray-800 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100">โคตร ปุ่ม</button>
        </div>
            
        
        
    </main>
  );
}