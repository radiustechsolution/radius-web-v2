import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import OnboardLayout from "@/layouts/onboarding";
import { siteConfig } from "@/config/site";

const SigninPage = () => {
  // Hooks
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Extract email from query string
  useEffect(() => {
    if (router.query.mail) {
      setEmail(router.query.mail as string);
    }
  }, [router.query.mail]);

  // Reset Password handler
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: router?.query?.mail, // Assuming email is passed in the query string
          otp: otp,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successful! Please log in.");
        router.push(siteConfig.paths.signin);
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Create a new password
        </p>

        <form
          onSubmit={handleResetPassword}
          className="w-full flex flex-col gap-3"
        >
          <input
            type="number"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="OTP"
            name="otp"
            required
            maxLength={6}
            minLength={6}
            disabled={loading}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <input
            type="password"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="New Password"
            name="password"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-gray-600 text-center text-sm">
            Check your email for an OTP.
          </p>

          <Button
            type="submit"
            isLoading={loading}
            className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </OnboardLayout>
  );
};

export default SigninPage;
