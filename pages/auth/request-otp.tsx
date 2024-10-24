import { siteConfig } from "@/config/site";
import OnboardLayout from "@/layouts/onboarding";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { sendEmail } from "@/lib/sendmail";

const SigninPage = () => {
  // Hooks
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(false);

  const RequestOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");

      // Check if the email exists
      if (!email) {
        console.error("Email is required.");
        return;
      }

      const response = await fetch("/api/request-otp", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast("OTP Sent! Check your email ", { toastId: "otp-success" });
        router.push(`${siteConfig.paths.resetpassword}?mail=${email}`);
      } else {
        toast(data.message, { toastId: "claim" });
      }
    } catch (error) {
      toast("Something went wrong!", { toastId: "claim" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Kindly enter your email
        </p>

        <form onSubmit={RequestOTP} className="w-full flex flex-col gap-3">
          <input
            type="email"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Email address"
            name="email"
            required
            disabled={loading}
          />
          <Button
            type="submit"
            isLoading={loading}
            className="h-[50px] text-white rounded-lg mt-3 font-semibold bg-primary w-full"
          >
            Proceed
          </Button>
        </form>
        <p className="text-gray-600 text-center text-sm">
          We will send a One Time Password to the email address.
        </p>
      </div>
    </OnboardLayout>
  );
};

export default SigninPage;
