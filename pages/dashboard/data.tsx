import SetPin from "@/components/dashboard/modal-setpin";
import VerifyTransaction from "@/components/dashboard/verify-transaction";
import { siteConfig } from "@/config/site";
import ServicesPageLayout from "@/layouts/servicespages";
import dataPlans, { Product } from "@/util/dataplan";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const networks = [
  { id: "MTN", name: "MTN" },
  { id: "Airtel", name: "AIRTEL" },
  { id: "Glo", name: "GLO" },
  { id: "m_9mobile", name: "9MOBILE" },
];

const DataPage = () => {
  // Hook
  const { data: session } = useSession();
  const router = useRouter();
  const ref = useRef<any>(null);
  const refConfirm = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(""); // State to hold the selected network
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState<any>("");
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(null);

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const network = event.target.value;
    setSelectedNetwork(network);
    setSelectedPlan(null); // Reset selected plan when network changes
    setAmount(""); // Reset amount when network changes
  };

  const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const planId = event.target.value;
    const selected = dataPlans[selectedNetwork].find((provider) =>
      provider.PRODUCT.some((p) => p.PRODUCT_ID === planId)
    );

    if (selected) {
      const plan =
        selected.PRODUCT.find((p: any) => p.PRODUCT_ID === planId) || null;
      setSelectedPlan(plan);

      if (plan) {
        // Calculate the profit (0.06% of PRODUCT_AMOUNT)
        let profit = plan.PRODUCT_AMOUNT * 0.06;

        // Clamp the profit between 20 and 70
        profit = Math.max(20, Math.min(70, profit));

        // Add the clamped profit to the PRODUCT_AMOUNT
        const updatedAmount = plan.PRODUCT_AMOUNT + profit;

        // Set the updated amount
        setAmount(Math.ceil(updatedAmount));
      }
    }
  };

  const handleDataBundlePurchase = async () => {
    if (refConfirm.current) {
      refConfirm?.current?.setOpenConfirm();
    }

    try {
      // API call to buy airtime
      const response = await fetch("/api/buy-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: session?.user.id,
          network: selectedNetwork,
          phone_number: phoneNumber,
          planId: selectedPlan?.PRODUCT_ID,
          merchant: selectedNetwork,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Data purchase successful
        const res = await signIn("credentials", {
          redirect: false,
          email: session?.user?.email,
          xagonn: "sampleregex",
        });
        toast.success("Data purchase successful!", { toastId: "mmnns" });
        router.push(siteConfig.paths.dashboard);
      } else {
        // Handle error messages from the server
        toast.error(data.error || "Data purchase failed. Please try again.", {
          toastId: "ccwes",
        });
      }
    } catch (error) {
      // Handle fetch errors
      toast.error("An unexpected error occurred. Please try again.", {
        toastId: "ccssa",
      });
    } finally {
      setLoading(false);
    }
  };

  const VerifyUserPin = async () => {
    // Check if user balance is sufficient
    if (session?.user?.balance < Number(amount)) {
      return toast.error("Insufficient balance 😔", { toastId: "cmsll" });
    }

    // Check if amount is less than 50
    if (phoneNumber.length != 11) {
      return toast.error("Enter a valid phone number. Eg, 08141314105", {
        toastId: "num",
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
            <div className="border px-2 rounded-md border-gray-300">
              <select
                className="bg-transparent outline-none h-[53px] placeholder-gray-500 w-full"
                name="network"
                value={selectedNetwork}
                onChange={handleNetworkChange}
                required
                disabled={loading}
              >
                <option value="" disabled>
                  Select Network
                </option>
                {networks.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Plan */}
            {selectedNetwork && (
              <div className="border px-2 rounded-md border-gray-300">
                <select
                  className="bg-transparent outline-none h-[53px] placeholder-gray-500 w-full"
                  name="plan"
                  value={selectedPlan?.PRODUCT_ID || ""}
                  onChange={handlePlanChange}
                  required
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select Plan
                  </option>
                  {dataPlans[selectedNetwork][0].PRODUCT.map((product) => {
                    // Parse the amount if it's a string, otherwise use the number directly
                    const amount =
                      typeof product.PRODUCT_AMOUNT === "string"
                        ? parseFloat(product.PRODUCT_AMOUNT)
                        : product.PRODUCT_AMOUNT;

                    // Calculate the profit (0.06% of the amount)
                    let profit = amount * 0.06;

                    // Clamp the profit between 20 and 70
                    profit = Math.max(20, Math.min(70, profit));

                    // Add the clamped profit to the amount
                    const updatedAmount = amount + profit;

                    return (
                      <option
                        key={product.PRODUCT_ID}
                        value={product.PRODUCT_ID}
                      >
                        {product.PRODUCT_NAME} - ₦{Math.ceil(updatedAmount)}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {/* Only show the other fields when a plan is selected */}
            {selectedPlan && (
              <>
                <input
                  type="number"
                  className="bg-transparent border px-2 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
                  placeholder="Amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  readOnly
                  disabled={loading}
                />

                <input
                  type="tel"
                  className="bg-transparent border px-2 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
                  placeholder="eg, 08141314105"
                  name="phone_number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  maxLength={11}
                  minLength={11}
                  disabled={loading}
                />
              </>
            )}
            <Button
              type="button"
              onClick={VerifyUserPin}
              isLoading={loading}
              className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
              disabled={loading || !selectedPlan} // Disable button if no plan is selected
            >
              {loading ? "Processing..." : "Proceed"}
            </Button>
          </div>
        </div>

        <VerifyTransaction
          cancelTransaction={() => setLoading(false)}
          action={handleDataBundlePurchase}
          ref={refConfirm}
        >
          <div className="flex flex-col gap-4 mb-3">
            <div className="flex border-b pb-2 border-bordercolor items-center justify-between">
              <p>Network:</p>
              <p className="font-medium">{selectedNetwork.toUpperCase()}</p>
            </div>
            <div className="flex pb-2 border-b border-bordercolor items-center justify-between">
              <p>Beneficiary:</p>
              <p className="font-medium">{phoneNumber}</p>
            </div>

            <div className="flex pb-2 gap-2 border-b border-bordercolor items-center justify-between">
              <p>Plan:</p>
              <p className="font-medium text-right">
                {selectedPlan?.PRODUCT_NAME}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p>Amount:</p>
              <p className="font-medium">₦{amount}</p>
            </div>
          </div>
        </VerifyTransaction>
        <SetPin ref={ref} />
      </section>
    </ServicesPageLayout>
  );
};

export default DataPage;
