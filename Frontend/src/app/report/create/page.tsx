"use client"
"useContext"
import { TextField } from "@mui/material";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

export default function addReport() {

  
  return (
    <main className="justify-center items-center p-5 flex flex-col">
        <h1 className="mx-auto w-fit text-2xl mb-10">Add "Name" Report</h1>
        <AccessAlarmIcon style={{ fontSize: 200 }} color="action"/>
        <div className="shadow-lg rounded-lg w-4/5 flex flex-col justify-items-center content-center p-5 space-y-2">
            
            <div className="flex flex-row">
                <div className="text-xl basis-1/4">Date:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Date" variant="outlined" />
            </div>
            <div className="flex flex-row">
                <div className="text-xl basis-1/4">Doctor:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Doctor" variant="outlined" />
            </div>
            <div className="flex flex-row">
                <div className="text-xl basis-1/4">Symptom:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Symptom" variant="outlined" />
            </div>
            <div className="flex flex-row">
                <div className="text-xl basis-1/4">Treatment:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Treatment" variant="outlined" />
            </div>
            <div className="flex flex-row">
                <div className="text-xl basis-1/4">Recommmendation:</div>
                <TextField className="basis-3/4" id="outlined-basic" label="Recommmendation" variant="outlined" />
            </div>
            </div>
            {/* <button className="relative border-2 border-gray-800 bg-transparent py-2.5 px-5 font-medium uppercase text-gray-800 transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-gray-800 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100">โคตร ปุ่ม</button> */}

            

                    <div className="relative inline-flex justify-center items-center group">
            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
            <a href="#" title="Get quote now" className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">Get it now</a>
        </div>

        <div
    className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl bg-white p-2 hover:bg-slate-200">
    <div className="space-y-2">
        <span className="block h-1 w-10 origin-center rounded-full bg-slate-500 transition-transform ease-in-out group-hover:translate-y-1.5 group-hover:rotate-45"></span>
        <span className="block h-1 w-8 origin-center rounded-full bg-orange-500 transition-transform ease-in-out group-hover:w-10 group-hover:-translate-y-1.5 group-hover:-rotate-45"></span>
    </div>
</div>

<div className="h-screen w-screen flex justify-center items-center dark:bg-gray-800">
  <button onClick={() => document.body.classList.toggle('dark')}
        className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg className="text-violet-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg className="text-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
    </button>
</div>

        
        
        
        
        
    </main>
  );
}