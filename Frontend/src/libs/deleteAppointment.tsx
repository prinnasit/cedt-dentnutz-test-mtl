export default async function deleteAppointment(id:string,token: string) {

    const response = await fetch(
      `https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/appointments/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Cannot delete Appointment");
    }
  
    return await response.json();
  }
  