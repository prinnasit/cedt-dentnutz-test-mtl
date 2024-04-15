
export default async function createReport(dentistID:string, appDate:string , token:string) {

    const response = await fetch('https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/reports', {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({appDate: appDate})
    })

    if (!response.ok) {
        throw new Error("Failed to create Report")
    }

    return await response.json()
}