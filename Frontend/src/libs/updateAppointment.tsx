
export default async function updateAppointment(appID:string ,dentist:string, appDate:string , token:string) {

    const response = await fetch(`https://swdevprac2-project-this-is-my-kingdom-come-backend.vercel.app/api/v1/appointments/${appID}`, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({appDate: appDate, dentist: dentist})
    })

    if (!response.ok) {
        throw new Error("Failed to update appointment")
    }

    return await response.json()
}