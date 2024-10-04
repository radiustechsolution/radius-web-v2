import { siteConfig } from "@/config/site";
import OnboardLayout from "@/layouts/onboarding";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const SignUpPage = () => {
  // Hook
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);

  return (
    <OnboardLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Create an account
        </p>

        <form className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-[49%]"
              placeholder="First Name"
              name="first_name"
              required
            />
            <input
              type="text"
              className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-[49%]"
              placeholder="Last Name"
              name="last_name"
              required
            />
          </div>
          <input
            type="email"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Email address"
            name="email"
            required
          />
          <div className="flex justify-between items-center">
            <input
              type="tel"
              maxLength={15}
              minLength={4}
              className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-[49%]"
              placeholder="Username"
              name="username"
              required
            />
            <input
              type="tel"
              maxLength={11}
              minLength={11}
              className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-[49%]"
              placeholder="Phone Number"
              name="phone_number"
              required
            />
          </div>

          <div className="flex border border-gray-300 rounded-md items-center">
            <input
              type={!eye ? "password" : "text"}
              className="bg-transparent  text-black px-5 outline-none h-[53px] placeholder-gray-500  basis-[89%] w-[100%]"
              placeholder="Password"
              name="password"
              required
            />
            {!eye ? (
              <IoEyeOffOutline
                role="presentation"
                onClick={() => setEye(!eye)}
                className="basis-[10%] cursor-pointer"
                size={22}
              />
            ) : (
              <IoEyeOutline
                role="presentation"
                onClick={() => setEye(!eye)}
                className="basis-[10%] cursor-pointer"
                size={22}
              />
            )}
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
            disabled={loading}
          >
            Get Started
          </Button>
        </form>
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            href={siteConfig.paths.signin}
            className="font-semibold text-primary underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </OnboardLayout>
  );
};

export default SignUpPage;
