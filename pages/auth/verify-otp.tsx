import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import OnboardLayout from "@/layouts/onboarding";
import { siteConfig } from "@/config/site";
import { signIn } from "next-auth/react";
import { sendWhatsappMessage } from "@/lib/sendWhatsapp";
import { sendEmail } from "@/lib/sendmail";

const VerifyPage = () => {
  // Hooks
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  // Extract email from query string
  useEffect(() => {
    if (router.query.mail) {
      setEmail(router.query.mail as string);
    } else {
      router.push(siteConfig.paths.signup);
    }
  }, [router.query.mail]);

  // Reset Password handler
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: router?.query?.mail,
          otp: otp,
        }),
      });

      const data = await response.json();
      const ref = `VA-${"acct"}-${Date.now()}`;

      if (response.ok) {
        toast("Generating your Bank Account", {
          toastId: "xxsa",
          isLoading: true,
        });

        console.log(data);

        // Step 2 Create Virtual account
        const response2 = await fetch(
          "https://appapi.radiustech.com.ng/api/virtualaccountnew",
          {
            method: "POST",
            body: JSON.stringify({
              ref: ref,
              first_name: data.data.first_name,
              last_name: data.data.last_name,
              email: email,
              phone_number: data.data.phone_number,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const json = await response2.json();
        if (response2.ok) {
          const { account_number, bank_name } = json.data;
          // Add Generated Wallet
          const response3 = await fetch("/api/generate-wallet", {
            method: "POST",
            body: JSON.stringify({
              ref: ref,
              first_name: data.data.first_name,
              last_name: data.data.last_name,
              customer_id: data.data.id,
              account_number: account_number,
              bank_name: bank_name,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          const json3 = await response3.json();
          console.log(json3);

          if (response3.ok) {
            // Step 2: Automatically log the user in after registration
            // const signInRes = await signIn("credentials", {
            //   redirect: false,
            //   email,
            //   password,
            // });

            // await sendWhatsappMessage(
            //   ``
            // );

            await sendEmail(
              siteConfig.adminEmail2,
              `Sucessful customer registration. Wallet generated successfully.`,
              "New Customer Wallet Generated"
            );

            const signInRes = await signIn("credentials", {
              redirect: false,
              email,
              xagonn: "sampleregex",
            });

            if (signInRes && !signInRes.error) {
              router.push(siteConfig.paths.dashboard);
              toast.dismiss();
              setLoading(false);
            } else {
              toast.dismiss();
              setLoading(false);
              toast("Login failed after registration");
            }
          } else {
          }
        }
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (error: any) {
      toast.error(
        error.message
          ? `${error.message}`
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Email Verification
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

          <p className="text-gray-600 text-center text-sm">
            Check your email (Inbox or Spam folder) for an OTP.
          </p>

          <Button
            type="submit"
            isLoading={loading}
            className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
          >
            Verify
          </Button>
        </form>
      </div>
    </OnboardLayout>
  );
};

export default VerifyPage;
