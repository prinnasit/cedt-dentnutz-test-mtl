"use client";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function SignUp() {
    const [name, setName] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const register = async () => {
        if (!name || !email || !password || !telephoneNumber) {
            alert("Please fill in all the fields");
            return;
        }

        try {
            alert(`${name}, ${email}, ${telephoneNumber}`);
            const newUser = await userRegister(
                name,
                email,
                password,
                telephoneNumber
            );
            if (newUser) {
                router.push("/api/auth/signin");
            } else {
                
                alert("Failed to register");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to register");
        }
    };

    return (
        <div className="m-40">
            <Container
                className="p-20  text-black rounded-lg border border-slate-300"
                component="main"
                maxWidth="sm"
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={register}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Telephone Number"
                                    label="Telephone Number"
                                    name="Telephone Number"
                                    value={telephoneNumber}
                                    onChange={(e) =>
                                        setTelephoneNumber(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                        />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="mt-3 mb-10"
                            sx={{
                                color: "black",
                                "&:hover": {
                                    color: "white",
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

// 'use client';
// import { TextField, Button } from "@mui/material";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import userRegister from "@/libs/userRegister";

// export default function Booking() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [tel, setTel] = useState("");

//     const router = useRouter();

//     const register = async () => {
//         if (!name || !email || !password || !tel) {
//             alert("Please fill in all the fields");
//             return;
//         }

//         try {
//             const newUser = await userRegister(name, email, password, tel);
//             if (newUser) {
//                 router.push("/api/auth/signin");
//             } else {
//                 alert("Failed to register");
//             }
//         } catch (error) {
//             alert("Failed to register");
//         }
//     };

//     return (
//         <main className="flex justify-center items-center p-5">
//             <div className="w-fit items-center justify-center rounded-lg px-20 py-16 space-y-6 m-10"
//                 style={{ backgroundColor: 'rgb(247, 238, 221)' }}>
//                 <div className="text-5xl font-medium text-black text-center rounded-lg p-5 mb-10 shadow-lg"
//                     style={{ backgroundColor: 'rgb(172, 226, 225)' }}>Register</div>

//                 <div className="w-fit space-y-2">
//                     {[
//                         { label: "Name", value: name, onChange: setName },
//                         { label: "Email", value: email, onChange: setEmail },
//                         { label: "Password", value: password, onChange: setPassword },
//                         { label: "Telephone Number", value: tel, onChange: setTel }
//                     ].map((field, index) => (
//                         <div key={index}>
//                             <div className="text-2xl text-left my-4 text-black">{`Enter your ${field.label}`}</div>
//                             <div className="w-[100%] rounded-lg space-x-5 space-y-2 px-10 py-5 text-black font-semibold shadow-lg"
//                                 style={{ backgroundColor: 'rgb(241, 250, 218)' }}>
//                                 <TextField className="text-2xl" fullWidth name={field.label} label={field.label} variant="standard"
//                                     value={field.value} onChange={(e) => field.onChange(e.target.value)} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                     <button className="block bg-blue-500 rounded-lg hover:bg-blue-400 text-white font-semibold px-5 py-3 shadow-lg text-white mt-10 mx-auto text-2xl" name="Book Vaccine"
//                     onClick={register}>Register</button>
//             </div>
//         </main>
//     );
// }
