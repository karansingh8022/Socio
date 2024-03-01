import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/authSlice";
import { useDispatch } from "react-redux";
import { Button, Logo } from "./Index";
import Input from "./Input.jsx";



const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const create = async (data) => {
        // console.log(data);
        setError("");
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
            else{
                console.log("error in signupcomponent");
            }
        } catch (error) {
            console.log(`error occured in signcomponent: ${error}`);
            setError(error.message);
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 p-10 rounded-xl border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">Already have an account:&nbsp;
                    <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">Sign In</Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Name"
                            type="Name" 
                            name="name"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })} />

                        <Input
                            label="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatter: (value) => (/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter a valid email address"),
                                }
                            })} />

                        <Input
                            label="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            {...register("password", {
                                required: true,
                            })} />

                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;