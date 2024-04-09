
export default async function addAppointment(dentistID:string, appDate:string , token:string) {

    const response = await fetch(`https://swdevprac2-project-this-is-my-kingdom-come-backend.vercel.app/api/v1/dentists/${dentistID}/appointments`, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({appDate: appDate})
    })

    if (!response.ok) {
        throw new Error("Failed to add appointment")
    }

    return await response.json()
}