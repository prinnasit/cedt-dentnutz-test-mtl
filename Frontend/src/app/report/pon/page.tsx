"use client"
import PersonalInformation from "@/components/PersonalInformation";
import getReport from "@/libs/getReport";
import getReports from "@/libs/getReports";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import getAppointment from "@/libs/getAppointment";
import HistoryBlock from "@/components/HistoryBlock";
import { getServerSession } from "next-auth";

export default function SelectReport() {

  const [reports, setreports] = useState<ReportJson | null>(null);

  const { data: session } = useSession();

  if (!session) {
    return <div>loading...</div>;
  }
  const token = session.user.token;
  
  useEffect( ()=>{
    const fetchData = async ()=>{
      const data = await getReports(token); 
      setreports(data)
    }
    fetchData()
  },[])
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const session = await getServerSession(authOptions);
    //       if (!session || !session.user.token) return null;
    //       const data = await getReports(session.user.token);
    //       if(!data) console.log("No data");
    //       setreports(data);
    //       console.log("getData:", data);
    //     } catch (error) {
    //       console.error("Error fetching reports:", error);
    //     }
    //   };
      
    //   fetchData();
    // }, []);

  return (
    <main className="justify-center items-center p-5 flex flex-col">
        <h1 className="mx-auto w-fit text-2xl mb-10 font-semibold mt-5">Name Report</h1>
        <div className="shadow-lg rounded-lg relative justify-items-center w-4/5">
            <div className="flex flex-row p-5">
                <PersonalInformation name="" phone="" email=""/>
            </div>
            <div className="text-center font-semibold text-2xl">History</div>
            <div className="flex flex-col p-5 space-y-2">
                {reports?.data.map( (reportItem : ReportItem) =>
                (<HistoryBlock oneT={reportItem.date} Doctor={reportItem.dentistId} Symptom={reportItem.prescribed_medication} Treatment={reportItem.treatment} Recommendation={reportItem.recommendations} Patient={reportItem.patientId}/>)
                )}
                
            </div>
        </div>
        
        
    </main>
  );
}
