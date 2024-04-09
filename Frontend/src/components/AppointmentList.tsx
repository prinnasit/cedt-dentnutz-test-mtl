import Link from "next/link";

export default async function AppointmentList({
  appointmentJson,
}: {
  appointmentJson: Promise<AppointmentJson>;
}) {
  const appointmentJsonReady = await appointmentJson;

  return (
    <div className="w-fit mx-auto py-10 px-16 rounded-xl" style={{ backgroundColor: 'rgb(247, 238, 221)' }}>
      {appointmentJsonReady.data.map((appointmentItem) => (
        <Link href={`/appointment/${appointmentItem._id}`} className="" key={appointmentItem._id}>
          <div
            className="bg-slate-200 font-mono w-[40vw] font-bold rounded-xl my-2 px-10 py-10 text-black space-y-5 text-center hover:bg-slate-300 relative"
            key={appointmentItem._id}
          >
            <div className="text-4xl text-slate-800 mt-5">
              {new Date(appointmentItem.appDate).toLocaleDateString()}
            </div>
            <div className="text-3xl text-slate-700 absolute top-0 left-0 pl-5">
              Name: {appointmentItem.userName}
            </div>
            <div className="text-3xl text-slate-700">
              Doctor {appointmentItem.dentist?.name}
            </div>
            <div className="text-lg text-slate-400 font-normal">
              (click to see more infomation)
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
