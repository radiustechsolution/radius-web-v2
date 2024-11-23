import ServicesPageLayout from "@/layouts/servicespages";
import SetPin from "@/components/dashboard/modal-setpin";
import VerifyTransaction from "@/components/dashboard/verify-transaction";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

const networks = [
  {
    id: "abuja-electric",
    name: "Abuja Distribution (AEDC)",
    type: "prepaid",
  },
  {
    id: "ikeja-electric",
    name: "Ikeja Distribution (IKEDC)",
    type: "prepaid",
  },
  {
    id: "eko-electric",
    name: "Eko Distribution (EKEDC)",
    type: "prepaid",
  },
  {
    id: "kano-electric",
    name: "Kano Distribution (KEDCO)",
    type: "prepaid",
  },
  {
    id: "portharcourt-electric",
    name: "Port Harcourt Distribution (PHED)",
    type: "prepaid",
  },
  {
    id: "jos-electric",
    name: "Jos Distribution (JED)",
    type: "prepaid",
  },
  {
    id: "ibadan-electric",
    name: "Ibadan Distribution (IBEDC)",
    type: "prepaid",
  },
  {
    id: "kaduna-electric",
    name: "Kaduna Electric (KAEDCO)",
    type: "prepaid",
  },
  {
    id: "enugu-electric",
    name: "Enugu Electric (EEDC)",
    type: "prepaid",
  },
  {
    id: "benin-electric",
    name: "Benin Distribution (BEDC)",
    type: "prepaid",
  },
  {
    id: "aba-electric",
    name: "ABA  Distribution (ABA)",
    type: "prepaid",
  },
  {
    id: "yola-electric",
    name: "YOLA Distribution (YEDC)",
    type: "prepaid",
  },
];

// test: 04235190594

const PowerPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [merchant, setMerchant] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [beneficiary, setBeneficiary] = useState<any>(null);
  const ref = useRef<any>(null);
  const refConfirm = useRef<any>(null);

  const handlePrepaidPurchase = async () => {
    if (!meterNumber || !amount || !selectedCompany) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (refConfirm.current) {
      refConfirm.current.setOpenConfirm();
    }

    try {
      const response = await fetch("/api/buy-electricity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: session?.user.id,
          network: selectedCompany,
          phone_number: meterNumber,
          merchant: merchant,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await signIn("credentials", {
          redirect: false,
          email: session?.user?.email,
          xagonn: "sampleregex",
        });
        toast.success("Power purchase successful!", {
          toastId: "success-purchase",
        });
        router.push(siteConfig.paths.dashboard);
      } else if (data.error === "pin") {
        UpdateModal();
      } else {
        toast.error(data.error || "Power purchase failed. Please try again.", {
          toastId: "error-purchase",
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.", {
        toastId: "error-unexpected",
      });
    } finally {
      setLoading(false);
    }
  };

  const VerifyUserPin = async () => {
    if (session?.user?.balance < Number(amount)) {
      return toast.error("Insufficient balance 😔", {
        toastId: "error-balance",
      });
    }

    if (Number(amount) < 50) {
      return toast.error("Amount cannot be less than ₦50", {
        toastId: "error-amount",
      });
    }

    setLoading(true);
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
      setLoading(false);
      if (checkData.error === "pin") {
        UpdateModal();
      } else {
        toast.error(
          checkData.error ||
            "Something went wrong. Try again or contact support.",
          { toastId: "error-pin-check" }
        );
      }
    } else {
      ConfirmTransaction();
    }
  };

  const UpdateModal = () => {
    if (ref.current) {
      ref.current.setOpen();
    }
  };

  const ConfirmTransaction = () => {
    if (refConfirm.current) {
      refConfirm.current.setOpenConfirm();
    }
  };

  const VerifyBeneficiary = async () => {
    if (!selectedCompany || !meterNumber || meterNumber == "") {
      toast.error("Please select a company and enter the meter number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://sandbox.vtpass.com/api/merchant-verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": "c165d6a69f7778db973c0faa8d57ff7d",
            "secret-key": "SK_34918c1682c7342b1512fe263c9122bc5fdb097cdc6",
          },
          body: JSON.stringify({
            billersCode: meterNumber,
            serviceID: selectedCompany,
            type: "prepaid",
          }),
        }
      );

      const data = await response.json();
      if (response.ok && data.code === "000" && !data.content.error) {
        console.log(data);
        setBeneficiary(data.content); // Store beneficiary info
        toast.success("Beneficiary verified successfully!");
        setIsLoading(false);
      } else {
        setBeneficiary(null);
        toast.error(
          data.content.error ||
            "Failed to verify beneficiary. Please try again."
        );
        setIsLoading(false);
      }
    } catch (error) {
      setBeneficiary(null);
      toast.error("An error occurred while verifying the beneficiary.");
      setIsLoading(false);
    }
  };

  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <div className="w-full flex flex-col gap-3">
            <div className="border px-3 rounded-md border-gray-300">
              <select
                className="bg-transparent outline-none h-[53px] placeholder-gray-500 w-full"
                name="network"
                value={selectedCompany}
                onChange={(e) => {
                  const selected = networks.find(
                    (n) => n.id === e.target.value
                  );
                  setSelectedCompany(selected?.id || "");
                  setMerchant(selected?.name || "");
                  setMeterNumber("");
                  setAmount("");
                  setBeneficiary(null); // Reset beneficiary when company changes
                }}
                required
                disabled={loading}
              >
                <option value="" disabled>
                  Select Company
                </option>
                {networks.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCompany && (
              <>
                <input
                  type="tel"
                  className="bg-transparent border px-3 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
                  placeholder="eg, 04235190594"
                  name="phone_number"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                  required
                  maxLength={11}
                  minLength={11}
                  disabled={loading}
                />

                <input
                  type="number"
                  className="bg-transparent border px-3 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full mt-3"
                  placeholder="Amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  disabled={loading}
                />

                <Button
                  type="button"
                  isLoading={isLoading}
                  onClick={VerifyBeneficiary}
                  className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-secondary w-full"
                >
                  Verify Beneficiary
                </Button>

                {beneficiary && (
                  <div className="mt-3 bg-card p-3 rounded-lg">
                    <p>
                      <strong>Customer Name: </strong>
                      {beneficiary.Customer_Name}
                    </p>
                    <p>
                      <strong>Meter Number: </strong>
                      {beneficiary.Meter_Number}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {beneficiary.Address}
                    </p>
                  </div>
                )}
              </>
            )}

            <Button
              type="button"
              // onClick={VerifyUserPin}
              isLoading={loading}
              className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
              disabled={loading || !selectedCompany}
            >
              {loading ? "Processing..." : "Proceed"}
            </Button>
          </div>
        </div>

        <VerifyTransaction
          cancelTransaction={() => setLoading(false)}
          action={handlePrepaidPurchase}
          ref={refConfirm}
        >
          <div className="flex flex-col gap-4 mb-3">
            <div className="flex border-b pb-2 border-bordercolor items-center justify-between">
              <p>Network:</p>
              <p className="font-medium">{merchant.toUpperCase()}</p>
            </div>
            <div className="flex pb-2 border-b border-bordercolor items-center justify-between">
              <p>Beneficiary:</p>
              <p className="font-medium">{meterNumber}</p>
            </div>

            <div className="flex pb-2 border-b border-bordercolor items-center justify-between">
              <p>Amount:</p>
              <p className="font-medium">₦{amount}</p>
            </div>

            <div className="flex pb-2 border-b border-bordercolor items-center justify-between">
              <p>Cashback:</p>
              <p className="font-medium">₦{Number(amount) * 0.015}</p>
            </div>

            <div className="flex items-center justify-between">
              <p>Total Payment:</p>
              <p className="font-medium">
                ₦{Number(amount) - Number(amount) * 0.015}
              </p>
            </div>
          </div>
        </VerifyTransaction>
        <SetPin ref={ref} />
      </section>
    </ServicesPageLayout>
  );
};

export default PowerPage;
