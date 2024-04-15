import { useSession } from "next-auth/react";
import deleteReport from "@/libs/deleteReport";

import deleteReport from "@/libs/deleteRep o
    const { data: session } = useSession();
    const token = session?.user.token;
    if (!token) return null;

    const deleteReport = await () => {
        const test = await deleteReport(
            reportID,
            token
        )
    }
rt";

const deleteOldReport = async () = {
    const name1 = await deleteReport(
        
    )
}

export default function deleteOldReports(){
    return(
        <main className="grid content-center justify-items-center">
            <div className="my-8 ">
                <button className="ml-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Launch Nuclear</button>
            </div>
        </main>
    );
}

