import { title } from "@/components/primitives";
import ServicesPageLayout from "@/layouts/servicespages";
import { copyText } from "@/lib/functions";
import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

const AddMoneyPage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleGenerateAccount = async () => {
    setLoading(true);
    const ref = `VA-${session?.user.id}-${Date.now()}`;

    const adminResponse = await fetch("/api/get-admin-user");
    const adminData = await adminResponse.json();
    const adminUser = adminData.adminUser;

    if (!adminUser) {
      throw new Error("Admin user not found");
    }

    try {
      //
      const response = await fetch(
        "https://appapi.radiustech.com.ng/api/virtualaccountnewmonnify",
        {
          method: "POST",
          body: JSON.stringify({
            ref: ref,
            first_name: session?.user.first_name,
            last_name: session?.user.last_name,
            auth: adminUser?.pin,
            email: session?.user.email,
            phone_number: session?.user.phone_number,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const json = await response.json();
      if (response.ok) {
        const { account_number, bank_name } = json.data;

        // Add to db
        const response = await fetch("/api/generate-wallet", {
          method: "POST",
          body: JSON.stringify({
            ref: ref,
            first_name: session?.user.first_name,
            last_name: session?.user.last_name,
            customer_id: session?.user.id,
            account_number: account_number,
            bank_name: bank_name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Optionally re-sign in the user or update session state
        await signIn("credentials", {
          redirect: false,
          email: session?.user.email,
          xagonn: "sampleregex", // Example data
        });

        // Handle success
        toast("Virtual account created successfully!", { toastId: "caxax" });
      } else {
        toast("Failed to create virtual account", { toastId: "mkwdds" });
      }
    } catch (error: any) {
      console.error("Virtual account creation:", error.message);
      toast("Error creating virtual account: " + error.message, {
        toastId: "caxax",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          {session?.user.account_number ? (
            <div className="bg-card p-4 flex flex-col gap-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] uppercase opacity-65">
                    {session?.user.account_name}
                  </p>
                  <p className="text-[13px] opacity-65">
                    {session?.user?.bank_name}
                  </p>
                </div>
                <h1 className={`${title({ size: "sm" })} tracking-widest`}>
                  {session?.user.account_number}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => copyText(session?.user.account_number)}
                  className="bg-blue-100 w-[100%] font-medium rounded-full text-[13px] text-primary"
                >
                  Copy Number
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card p-4 flex flex-col gap-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] uppercase opacity-65">
                    {session?.user.account_name}
                  </p>
                  <p className="text-[13px] opacity-65">
                    {session?.user?.bank_name}
                  </p>
                </div>
                <h1 className={`${title({ size: "sm" })} tracking-widest`}>
                  Generate your Wallet
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <Button
                  isLoading={loading}
                  onClick={handleGenerateAccount}
                  className="bg-blue-100 w-[100%] font-medium rounded-full text-[15px] text-primary"
                >
                  Generate Wallet
                </Button>
              </div>
            </div>
          )}
          {session?.user.account_name && (
            <p className="text-[12px] p-5 opacity-55 text-center">
              Deposit made to the account above incurs charges of 1.4%. If you
              sent N100, you will receive N98.6.
            </p>
          )}
        </div>
      </section>
    </ServicesPageLayout>
  );
};

export default AddMoneyPage;
