'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormValues {
  fullName: string;
  email: string;
  message: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const form = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;
  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          role: "user"
        })
      });

      const responseData = await res.json();

      if (res.ok) {
        router.push(`/auth/email?email=${data.email}`);
      } else {
        setLoading(false)
        alert(responseData.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during signup.");
    }
  };

  return (
    <>
      <div className='px-4'>
        <div className="m-auto w-70 md:w-80 mt-5 flex flex-col gap-2 align-center px-1">
          <div className="flex flex-col gap-5 items-center content-center">
            <h1 className="align-middle text-2xl text-slate-800 font-extrabold">Sign Up Today!</h1>
            <button className="w-70 md:w-80 border-1 border-violet-200 rounded-[5px] py-2 cursor-pointer">
              <div className="flex gap-1 w-[60%] mx-auto content-center ">
                <Image
                  src="/icongoogle.svg"
                  alt="Google icon"
                  height={0}
                  width={0}
                  className="w-5 h-5"
                />
                <span className="text-indigo-600 font-bold text-sm">Sign Up with Google</span>
              </div>
            </button>
          </div>
          <div className="w-70 md:w-80 text-center border-b border-gray-200 leading-[0.1em] mt-5 mb-[20px] self-center">
            <span className="bg-white px-2.5 opacity-40">
              Or Sign Up with Email
            </span>
          </div>

          <form className="flex flex-col w-70 md:w-80" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flext content-between mb-[10px]">
              <div className="relative">
                <label htmlFor="firstName" className="opacity-80 text-sm font-600">Full Name</label>
                <input
                  type="text"
                  id="name"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "* required",
                    },
                  })}
                  placeholder="Enter your full name"
                  className="w-70 md:w-80 block px-[12px] py-[6px] leading-1.42857143 border-1 border-violet-200 rounded-[0.3rem] m-[1px] opacity-70 placeholder:text-[13px] focus:outline-none"
                />
                <p className="text-red-500 text-[12px] align-right absolute top-[100%] right-0  width-[100%] mt-[5px]">{errors.fullName?.message}</p>
              </div>
            </div>
            <div className="mb-[10px] relative">
              <label htmlFor="email" className="opacity-80 text-sm font-600">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "* required",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Enter you email"
                className="w-70 md:w-80 block px-[12px] py-[6px] leading-1.42857143 border-1 border-violet-200 rounded-[0.3rem] m-[1px] opacity-70 placeholder:text-[13px] focus:outline-none"
              />
              <p className="text-red-500 text-[12px] align-right absolute top-[100%] right-0 width-[100%] mt-[5px]">{errors.email?.message}</p>
            </div>
            <div className="mb-[10px] relative">
              <label htmlFor="password" className="opacity-80 text-sm font-600">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "* required",
                  },
                })}
                placeholder="Enter you password"
                className="w-70 md:w-80 block px-[12px] py-[6px] leading-1.42857143 border-1 border-violet-200 rounded-[0.3rem] m-[1px] opacity-70 placeholder:text-[13px] focus:outline-none"
              />
              <p className="text-red-500 text-[12px] align-right absolute top-[100%] right-0 width-[100%] mt-[5px]">{errors.email?.message}</p>
            </div>
            <div className="mb-[20px] relative">
              <label htmlFor="confirmpassword" className="opacity-80 text-sm font-600">Confirm Password</label>
              <input
                type="confirmPassword"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "* required",
                  },
                })}
                placeholder="Confirm password"
                className="w-70 md:w-80 block px-[12px] py-[6px] leading-1.42857143 border-1 border-violet-200 rounded-[0.3rem] m-[1px] text-[13px] opacity-70 placeholder:text-[13px] focus:outline-none"
              />
              <p className="text-red-500 text-[12px] absolute top-[100%] right-0 width-[100%] mt-[5px]">{errors.confirmPassword?.message}</p>
            </div>
            {!loading ?
            (<button onClick={()=> setLoading(true)} className="self-center mt-10px border-0 bg-indigo-800 text-white py-[0.5rem] px-[1.1rem]rounded-[0.3rem] font-extrabold w-70 md:w-80 rounded-3xl text-sm cursor-pointer">
              Continue
            </button>) :
            (
              <button className="cursor-not-allowed self-center mt-10px border-0 bg-indigo-300 text-white py-[0.5rem] px-[1.1rem]rounded-[0.3rem] font-extrabold w-70 md:w-80 rounded-3xl text-sm">
              Signing Up...
            </button>
            )}
          </form>

          <div className="text-[12px] mt-4 opacity-70">
            Already have an account? <Link href='/auth/signin' className="text-indigo-800 font-bold">Login</Link>
          </div>

          <div className="text-[12px] mt-3 mb-3 opacity-70">
            By clicking Continue you acknowledge that you have read and accepted our <Link href='#' className="text-indigo-800 font-bold">Terms of Service</Link> and <Link href='#' className="text-indigo-800 font-bold">Privacy Policy</Link>
          </div>
        </div>
      </div>

    </>
  )
}