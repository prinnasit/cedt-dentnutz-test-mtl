import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";

export default async function MyAccount() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  var createdAt = new Date(profile.data.createdAt);

  return (
    <main className="mt-16 mb-20 font-mono">
      <div className="text-[36px] text-center text-[#008DDA] mb-10">
        My Account
      </div>
      <div className="text-black mx-auto">
        <table className="table-auto border-separate border-spacing-2 mx-auto text-[22px] text-center">
          <tbody className="bg-slate-200">
            <tr>
              <td className="font-semibold p-3 rounded-lg">Name</td>
              <td className="rounded-lg px-10">{profile.data.name}</td>
            </tr>
            <tr>
              <td className="font-semibold p-3 rounded-lg">Email</td>
              <td className="rounded-lg px-10">{profile.data.email}</td>
            </tr>
            <tr>
              <td className="font-semibold p-3 rounded-lg">Tel.</td>
              <td className="rounded-lg px-10">{profile.data.tel}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
