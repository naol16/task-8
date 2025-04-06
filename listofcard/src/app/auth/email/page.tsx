'use client'
import { poppins } from "../font/font";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const otpLength =4

export default function Page() {
  
  const searchParams = useSearchParams();
  const userEmail = searchParams.get("email") || "";
  const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(""));
  const [otpError, setOtpError] = useState(true);
  const otpBoxReference = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [ loading, setLoading ] = useState(false)

  function handleChange(value: string, index: number) {
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < otpLength - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  function handleBackspaceAndEnter(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && e.currentTarget.value && index < otpLength - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  }

  useEffect(() => {
    const otpValue = otp.join("");
    setOtpError(otpValue.length !== otpLength);
  }, [otp]);

  const handleVerification = async () => {
    const otpValue = otp.join("");
    try {
      const res = await fetch("https://akil-backend.onrender.com/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          OTP: otpValue
        })
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/auth/signin');
      } else {
        setLoading(false)
        alert(data.message || "Verification failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during verification.");
    }
  };

  return (
    <div className='px-4 pt-15'>
      <div className="m-auto w-100 md:w-105 mt-5 flex flex-col content-center gap-10 align-center pr-3">
        <div className="flex flex-col items-center">
          <h1 className={`${poppins.className} text-2xl text-slate-800 font-extrabold`}>Verify Email</h1>
        </div>
        <div>
          <p className='text-slate-500 text-sm md:p-0 pl-2'>
            We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className='flex items-center gap-5 md:gap-8'>
            {otp.map((digit, index) => (
              <input
                key={index}
                value={digit}
                maxLength={1}
                placeholder='0'
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index)}
                onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => handleBackspaceAndEnter(e, index)}
                ref={(ref) => { otpBoxReference.current[index] = ref; }}
                className="border-2 text-3xl md:text-4xl border-indigo-200 caret-indigo-300 w-20 h-auto px-2 py-1 text-center placeholder:opacity-40 placeholder:font-bold rounded-md block focus:shadow-[0_0_0_2px_rgb(100,116,139,0.4)] focus:outline-none appearance-none"
              />
            ))}
          </div>
          <div className='self-center'>
            <p className='text-slate-500'>
              You can request to <span className='text-indigo-600 font-bold'>Resend Code</span> in <span className='text-indigo-600 font-bold'>0:30</span>
            </p>
          </div>
        </div>
        {!loading ? (<button
          onClick={() => {
            handleVerification()
            setLoading(true)
          }}
          disabled={otpError}
          className={`self-center mt-5 border-0 ${otpError ? 'bg-indigo-200 cursor-not-allowed' : 'bg-indigo-800 cursor-pointer'} text-white py-[0.8rem] px-[1.1rem] font-extrabold w-80 md:w-102 rounded-3xl text-sm`}
        >
          Continue
        </button>) : 
        (
          <button
          className='self-center mt-5 border-0 bg-indigo-200 cursor-not-allowed text-white py-[0.8rem] px-[1.1rem] font-extrabold w-80 md:w-102 rounded-3xl text-sm'
        >
          Verifying...
        </button>
        )}
      </div>
    </div>
  );
}
