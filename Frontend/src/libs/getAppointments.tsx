export default async function getAppointments(token: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(
    "https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/appointments",
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get Appointments");
  }

  return await response.json();
}
