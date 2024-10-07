import { siteConfig } from "@/config/site";
import OnboardLayout from "@/layouts/onboarding";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { IoEyeOffOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const SignUpPage = () => {
  // Hook
  const router = useRouter();

  // State
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const email = formData.get("email");
    const phone_number = formData.get("phone_number");
    const password = formData.get("password");
    const username = formData.get("username");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        phone_number,
        email,
        password,
        username,
      }),
    });

    const ref = `VA-${"acct"}-${Date.now()}`;
    const response = await res.json();

    if (res.ok) {
      toast("Creating your Bank Account", {
        toastId: "xxsa",
        isLoading: loading,
      });

      // Step 2 Create Virtual account
      const response2 = await fetch(
        "https://appapi.radiustech.com.ng/api/virtualaccountnew",
        {
          method: "POST",
          body: JSON.stringify({
            ref: ref,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
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

        // Add to db
        const response3 = await fetch("/api/generate-wallet", {
          method: "POST",
          body: JSON.stringify({
            ref: ref,
            first_name: first_name,
            last_name: last_name,
            customer_id: response.user.id,
            account_number: account_number,
            bank_name: bank_name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response3.ok) {
          // Step 2: Automatically log the user in after registration
          const signInRes = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (signInRes && !signInRes.error) {
            router.push(siteConfig.paths.dashboard);
            setLoading(false);
          } else {
            setLoading(false);
            toast("Login failed after registration");
          }
        } else {
        }
      }
    } else {
      setLoading(false);
      toast(response?.error || "Error during registration");
    }
  };

  return (
    <OnboardLayout>
      <div className="h-svh flex gap-5 flex-col items-center justify-center w-full max-w-[350px]">
        <p className="text-black text-[27px] sm:text-[30px] font-semibold">
          Create an account
        </p>

        <form onSubmit={register} className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <input
              type="text"
              className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-[49%]"
              placeholder="First Name"
              name="first_name"
              required
              disabled={loading}
            />
            <input
              type="text"
              className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-[49%]"
              placeholder="Last Name"
              name="last_name"
              required
              disabled={loading}
            />
          </div>
          <input
            type="email"
            className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
            placeholder="Email address"
            name="email"
            required
            disabled={loading}
          />
          <div className="flex justify-between items-center">
            <input
              type="text"
              maxLength={15}
              minLength={4}
              className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-[49%]"
              placeholder="Username"
              name="username"
              required
              disabled={loading}
            />
            <input
              type="tel"
              maxLength={11}
              minLength={11}
              className="bg-transparent border text-black px-5 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-[49%]"
              placeholder="Phone Number"
              name="phone_number"
              required
              disabled={loading}
            />
          </div>

          <div className="flex border border-gray-300 rounded-md items-center">
            <input
              type={!eye ? "password" : "text"}
              className="bg-transparent  text-black px-5 outline-none h-[53px] placeholder-gray-500  basis-[89%] w-[100%]"
              placeholder="Password"
              name="password"
              required
              disabled={loading}
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
