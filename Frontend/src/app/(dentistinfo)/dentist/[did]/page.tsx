import Image from "next/image";
import getDentist from "@/libs/getDentist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function DentistDetailPage({
  params,
}: {
  params: { did: string };
}) {

  const dentistDetail = await getDentist(params.did);

  return (
    <main className="text-center p-5">
      <Suspense fallback={<div>
          <p className="mt-20 mb-5 text-black text-center text-5xl text-bold space-y-6">Loading... </p>
          <div className=" mb-20 "><LinearProgress/></div>
        </div>}>
          <h1 className="text-lg font-medium"></h1>
          <div className="flex flex-row my-5">
            <Image
              src={dentistDetail.data.picture}
              alt="Hospital Image"
              width={0}
              height={0}
              sizes="100vm"
              className="rounded-lg w-[30%]"
            />
            <div className="text-xl mx-5 text-left text-black space-y-5 bg-slate-100 rounded-lg w-full p-5">
              {" "}
              <div className="flex space-x-5">
                <div className="text-3xl font-bold">
                  Doctor {dentistDetail.data.name}</div>
                <Link href={`/makeappointment?dentistid=${dentistDetail.data.id}&dentistname=$<div>{dentistDetail.data.name}</div>`}>
                  <button className="bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold py-2 
                  px-3"> Select</button>
                </Link>
              </div>
              <div className="bg-slate-200 h-[85%] rounded-lg pl-2 py-5 space-y-5">
                <div className=" mx-5">
                  Year Of Experiences: {dentistDetail.data.yearsOfExperience}{" "}
                </div>
                <div className=" mx-5 ">
                  Area Of Expertise: {dentistDetail.data.areaOfExpertise}{" "}
                </div>
              </div>
            </div>
          </div>
      </Suspense>
    </main>
  );
}
