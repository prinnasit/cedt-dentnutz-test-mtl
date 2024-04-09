export default async function getAppointments(token: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(
    "https://swdevprac2-project-this-is-my-kingdom-come-backend.vercel.app/api/v1/appointments",
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
