import { SetPin } from "@/components/dashboard/modal-setpin";
import { siteConfig } from "@/config/site";
import ServicesPageLayout from "@/layouts/servicespages";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const networks = [
  { id: "01", name: "MTN" },
  { id: "04", name: "AIRTEL" },
  { id: "02", name: "GLO" },
  { id: "03", name: "9MOBILE" },
];

const AirtimePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [merchant, setMerchant] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const ref = useRef<any>(null);

  const handleAirtimePurchase = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to buy airtime
      const response = await fetch("/api/buy-airtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: session?.user.id,
          network: selectedNetwork,
          phone_number: phoneNumber,
          merchant: merchant,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Airtime purchase successful
        const res = await signIn("credentials", {
          redirect: false,
          email: session?.user?.email,
          xagonn: "sampleregex",
        });
        toast.success("Airtime purchase successful!", { toastId: "cscsa" });
        router.push(siteConfig.paths.dashboard);
      } else {
        // Handle error messages from the server
        toast.error(
          data.error || "Airtime purchase failed. Please try again.",
          { toastId: "csscsa" }
        );
      }
    } catch (error) {
      // Handle fetch errors
      toast.error("An unexpected error occurred. Please try again.", {
        toastId: "mlkk",
      });
    } finally {
      setLoading(false);
    }
  };

  const UpdateModal = () => {
    if (ref.current) {
      ref?.current?.setOpen();
    }
  };

  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <form
            onSubmit={handleAirtimePurchase}
            className="w-full flex flex-col gap-3"
          >
            {/* Select Network */}
            <div className="border px-3 rounded-md border-gray-300">
              <select
                className="bg-transparent  outline-none h-[53px] placeholder-gray-500 w-full"
                name="network"
                value={selectedNetwork}
                onChange={(e) => {
                  setSelectedNetwork(e.target.value),
                    setMerchant(
                      e.target.value == "01"
                        ? "MTN"
                        : e.target.value == "02"
                          ? "GLO"
                          : e.target.value == "03"
                            ? "9MOBILE"
                            : e.target.value == "04"
                              ? "AIRTEL"
                              : "undetermined"
                    );
                }}
                required
                disabled={loading}
              >
                <option value="" className="" disabled>
                  Select Network
                </option>
                {networks.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Only show the other fields when a network is selected */}
            {selectedNetwork && (
              <>
                <input
                  type="tel"
                  className="bg-transparent border px-3 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
                  placeholder="eg, 08141314105"
                  name="phone_number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  maxLength={11}
                  minLength={11}
                  disabled={loading}
                />

                <input
                  type="number"
                  className="bg-transparent border px-3 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
                  placeholder="Amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  disabled={loading}
                />
              </>
            )}

            <Button
              type="submit"
              isLoading={loading}
              className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
              disabled={loading || !selectedNetwork} // Disable button if no network is selected
            >
              {loading ? "Processing..." : "Proceed"}
            </Button>
          </form>
        </div>

        <SetPin ref={ref} />
      </section>
    </ServicesPageLayout>
  );
};

export default AirtimePage;
