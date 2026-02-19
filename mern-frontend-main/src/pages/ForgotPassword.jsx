import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Cookies from "js-cookie"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/v1/users/forgot-password", {email})
            console.log(response);
            toast.success("Email sent successfully")
        } catch (error) {
          console.log(error);
            
        }
    }


  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="mx-auto h-10 w-auto" />
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Forgot Password ? Enter your email below to recover password</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="" class="space-y-6" onSubmit={submitForm}>
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-700">Email address</label>
                        <div class="mt-2">
                            <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>


                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Submit</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default ForgotPassword
