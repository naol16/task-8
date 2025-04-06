'use client'
import { poppins } from "../font/font";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    });
    if (res?.ok) {
      router.push('/')
    } else {
      setLoading(false)
      alert("Login failed: " + (res?.error || "Unknown error"));
    }
  };


  return (
    <>
      <div className='px-4 pt-15'>
        <div className="m-auto w-70 md:w-80 mt-5 flex flex-col gap-2 align-center px-1">
          <div className="flex flex-col gap-5 items-center content-center">
            <h1 className={`${poppins.className} align-middle text-2xl text-slate-800 font-extrabold`}>Welcome Back,</h1>
          </div>
          <div className="w-70 md:w-80 text-center border-b border-gray-200 leading-[0.1em] mt-5 mb-[20px] self-center">
          </div>

          <form className="flex flex-col w-70 md:w-80" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              <p className="text-red-500 text-[12px] align-right absolute top-[100%] width-[100%] mt-[5px]">{errors.email?.message}</p>
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
              <p className="text-red-500 text-[12px] align-right absolute top-[100%] width-[100%] mt-[5px]">{errors.email?.message}</p>
            </div>
            {!loading ?
              (<button onClick={() => setLoading(true)} className="self-center mt-5 border-0 bg-indigo-800 text-white py-[0.5rem] px-[1.1rem]rounded-[0.3rem] font-extrabold w-70 md:w-80 rounded-3xl text-sm cursor-pointer">Continue</button>) :
              (
                <button className="self-center cursor-not-allowed mt-5 border-0 bg-indigo-300 text-white py-[0.5rem] px-[1.1rem]rounded-[0.3rem] font-extrabold w-70 md:w-80 rounded-3xl text-sm">
                  Logging In...
                </button>
              )}
          </form>

          <div className="text-[12px] mt-4 opacity-70">
            Don't have an account? <Link href='/auth/signup' className="text-indigo-800 font-bold ml-1">Sign Up</Link>
          </div>
        </div>
      </div>

    </>
  )
}