import { siteConfig } from "@/config/site";
import OnboardLayout from "@/layouts/onboarding";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useState } from "react";

const SigninPage = () => {
  const [loading, setLoading] = useState();
  return (
    <OnboardLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Welcome back
        </p>

        <form className="w-full flex flex-col gap-3">
          <input
            type="email"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Email address"
            name="email"
            required
          />
          <input
            type="password"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Password"
            name="password"
            required
          />
          <Button
            type="submit"
            isLoading={loading}
            className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
          >
            Sign In
          </Button>
        </form>
        <p className="text-gray-600 text-sm">
          Don&lsquo;t have an account?{" "}
          <Link
            href={siteConfig.paths.signup}
            className="font-semibold text-primary underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </OnboardLayout>
  );
};

export default SigninPage;
