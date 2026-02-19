import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formData = { email, password }
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            console.log(email, password);
            const response = await axios.post("http://localhost:3000/api/v1/users/login-user", formData);
            const token = response.data.token;
            Cookies.set("token", token , {
                expires : 7
            })
            toast.success("loggedin successfully")
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="mx-auto h-10 w-auto" />
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Sign in to your account</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="" onSubmit={submitForm} class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-700">Email address</label>
                        <div class="mt-2">
                            <input id="email" type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-700">Password</label>
                            <div class="text-sm">
                                <Link to = "/forgot-password" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</Link>
                            </div>
                        </div>
                        <div class="mt-2">
                            <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required autocomplete="current-password" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
                    </div>
                </form>

                <p class="mt-10 text-center text-sm/6 text-gray-400">
                    Dont have an account ?
                    <Link to = "/signup" class="font-semibold text-indigo-400 hover:text-indigo-300">Signup</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
