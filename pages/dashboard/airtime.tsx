import SetPin from "@/components/dashboard/modal-setpin";
import VerifyTransaction from "@/components/dashboard/verify-transaction";
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
  const refConfirm = useRef<any>(null);

  const handleAirtimePurchase = async () => {
    if (refConfirm.current) {
      refConfirm?.current?.setOpenConfirm();
    }

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
        if (data.error == "pin") {
          UpdateModal();
        } else {
          // Handle error messages from the server
          toast.error(
            data.error || "Airtime purchase failed. Please try again.",
            { toastId: "csscsa" }
          );
        }
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

  const VerifyUserPin = async () => {
    // Check if user balance is sufficient
    if (session?.user?.balance < Number(amount)) {
      return toast.error("Insufficient balance 😔!", { toastId: "cmsll" });
    }

    // Check if amount is less than 50
    if (Number(amount) < 50) {
      return toast.error("Amount cannot be less than ₦50", {
        toastId: "cmslll",
      });
    }

    setLoading(true);
    // Check if user has set pin
    const checkRes = await fetch("/api/check-user-setpin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session?.user.id,
      }),
    });
    const checkData = await checkRes.json();

    if (!checkRes.ok) {
      if (checkData.error == "pin") {
        setLoading(false);
        return UpdateModal();
      } else {
        setLoading(false);
        return toast.error(
          checkData.error ||
            "Something went wrong!. Try again or contact support.",
          { toastId: "failed-pin-set" }
        );
      }
    } else {
      return ConfirmTransaction();
    }
  };

  const UpdateModal = () => {
    if (ref.current) {
      ref?.current?.setOpen();
    }
  };

  const ConfirmTransaction = () => {
    if (refConfirm.current) {
      refConfirm?.current?.setOpenConfirm();
    }
  };

  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <div className="w-full flex flex-col gap-3">
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
                  setPhoneNumber("");
                  setAmount("");
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
              type="button"
              onClick={VerifyUserPin}
              isLoading={loading}
              className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
              disabled={loading || !selectedNetwork} // Disable button if no network is selected
            >
              {loading ? "Processing..." : "Proceed"}
            </Button>
          </div>
        </div>

        <VerifyTransaction
          cancelTransaction={() => setLoading(false)}
          action={handleAirtimePurchase}
          ref={refConfirm}
        >
          <div className=" leading-7">
            <p className="text-lg">Network: {merchant.toUpperCase()}</p>
            <p>Beneficiary: {phoneNumber}</p>
            <p>Amount: ₦{amount}</p>
            <p>Cashback: ₦{Number(amount) * 0.015}</p>
            <p>Total: ₦{Number(amount) - Number(amount) * 0.015}</p>
          </div>
        </VerifyTransaction>
        <SetPin ref={ref} />
      </section>
    </ServicesPageLayout>
  );
};

export default AirtimePage;
