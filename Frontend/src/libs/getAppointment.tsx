export default async function getAppointment(id:string,token: string) {
  await new Promise( (resolve)=> setTimeout(resolve, 1000))

  const response = await fetch(
    `https://project-dentist-backend.vercel.app/api/v1/appointments/${id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get Appointment");
  }

  return await response.json();
}
