export default async function checkReport(Apptid:string,token: string) {
  // await new Promise( (resolve)=> setTimeout(resolve, 1000))
  const response = await fetch(
    `https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/reports`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ appointmentId: Apptid }),
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get Report");
  }

  return await response.json();
}
