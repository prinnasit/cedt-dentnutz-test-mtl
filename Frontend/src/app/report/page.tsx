import PersonalInformation from "@/components/PersonalInformation";


export default async function SelectReport() {

  return (
    <main className="justify-center items-center p-5 flex flex-col">
        <h1 className="mx-auto w-fit text-2xl">Name Report</h1>
        <div className="shadow-md rounded-lg relative justify-items-center">
            <div className="absolute right-2 top-0 ">Edit</div>
            <div className="flex flex-row p-5">
                <PersonalInformation/>
            </div>
            <div className="text-center">History</div>
        </div>
        
        
    </main>
  );
}
