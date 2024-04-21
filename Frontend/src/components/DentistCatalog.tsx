import Link from "next/link"
import Card from "./Card"
import { DentistJson } from "../../interface"

export default async function DentistCatalog({dentistsJson} : {dentistsJson: Promise<DentistJson>}) {

    const dentistsJsonReady = await dentistsJson

    return (
            <div className=" rounded-2xl border-2 border-gray-300 pt-10 m-5 flex flex-wrap justify-center"  >
                {
                    dentistsJsonReady.data.map( (dentistItem) => (
                   
                    <Link href={`/dentist/${dentistItem._id}`} className="mx-20 mb-20 mt-10">
                        <Card key={dentistItem._id} dentistName={dentistItem.name} imgSrc={dentistItem.picture}
                         areaOfExpertise ={dentistItem.areaOfExpertise} yearsOfExperience={dentistItem.yearsOfExperience} />
                    </Link>
)
                    )
                }
            </div>
    )
}