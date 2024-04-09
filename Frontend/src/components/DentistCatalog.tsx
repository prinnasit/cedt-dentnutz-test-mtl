import Link from "next/link"
import Card from "./Card"

export default async function DentistCatalog({dentistsJson} : {dentistsJson: Promise<DentistJson>}) {

    const dentistsJsonReady = await dentistsJson

    return (
            <div className="bg-black rounded-lg pt-10 m-5 flex flex-wrap justify-center" style={{ backgroundColor: 'rgb(247, 238, 221)' }} >
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