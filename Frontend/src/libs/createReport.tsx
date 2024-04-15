
export default async function createReport(dentistID:string,patientID:string, appID:string, treatment:string, presMed:string ,rec:string, token:string) {

    const response = await fetch('https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/reports', {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({patientId: patientID, dentistId: dentistID, appointmentId: appID, treatment: treatment, prescribed_medication: presMed, recommendations: rec})
    })

    if (!response.ok) {
        throw new Error("Failed to create Report")
    }

    return await response.json()
}