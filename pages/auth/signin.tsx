import { siteConfig } from "@/config/site";
import OnboardLayout from "@/layouts/onboarding";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SigninPage = () => {
  // Hooks
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res && !res.error) {
      router.push(siteConfig.paths.dashboard);
    } else {
      //   console.log(res);
      toast(
        (res?.error == "CredentialsSignin" &&
          "Email or password is incorrect") ||
          "Login failed",
        { toastId: "failedlogin" }
      );
    }

    setLoading(false);
  };

  return (
    <OnboardLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Welcome back
        </p>

        <form onSubmit={login} className="w-full flex flex-col gap-3">
          <input
            type="email"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Email address"
            name="email"
            required
            disabled={loading}
          />
          <input
            type="password"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Password"
            name="password"
            required
            disabled={loading}
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