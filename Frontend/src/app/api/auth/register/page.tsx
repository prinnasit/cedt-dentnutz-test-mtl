'use client';
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function Booking() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tel, setTel] = useState("");

    const router = useRouter();

    const register = async () => {
        if (!name || !email || !password || !tel) {
            alert("Please fill in all the fields");
            return;
        }

        try {
            const newUser = await userRegister(name, email, password, tel);
            if (newUser) {
                router.push("/api/auth/signin");
            } else {
                alert("Failed to register");
            }
        } catch (error) {
            alert("Failed to register");
        }
    };

    return (
        <main className="flex justify-center items-center p-5">
            <div className="w-fit items-center justify-center rounded-lg px-20 py-16 space-y-6 m-10"
                style={{ backgroundColor: 'rgb(247, 238, 221)' }}>
                <div className="text-5xl font-medium text-black text-center rounded-lg p-5 mb-10 shadow-lg"
                    style={{ backgroundColor: 'rgb(172, 226, 225)' }}>Register</div>

                <div className="w-fit space-y-2">
                    {[
                        { label: "Name", value: name, onChange: setName },
                        { label: "Email", value: email, onChange: setEmail },
                        { label: "Password", value: password, onChange: setPassword },
                        { label: "Telephone Number", value: tel, onChange: setTel }
                    ].map((field, index) => (
                        <div key={index}>
                            <div className="text-2xl text-left my-4 text-black">{`Enter your ${field.label}`}</div>
                            <div className="w-[100%] rounded-lg space-x-5 space-y-2 px-10 py-5 text-black font-semibold shadow-lg"
                                style={{ backgroundColor: 'rgb(241, 250, 218)' }}>
                                <TextField className="text-2xl" fullWidth name={field.label} label={field.label} variant="standard"
                                    value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                            </div>  
                        </div>
                    ))}
                </div>

                    <button className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-5 py-3 shadow-lg text-white mt-10 mx-auto text-2xl" name="Book Vaccine"
                    onClick={register}>Register</button>
            </div>
        </main>
    );
}