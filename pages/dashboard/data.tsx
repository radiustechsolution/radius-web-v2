import ServicesPageLayout from "@/layouts/servicespages";
import dataPlans, { Product } from "@/util/dataplan";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";

const networks = [
  { id: "MTN", name: "MTN" },
  { id: "Airtel", name: "AIRTEL" },
  { id: "Glo", name: "GLO" },
  { id: "m_9mobile", name: "9MOBILE" },
];

const DataPage = () => {
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

      // Adding 0.06% to the PRODUCT_AMOUNT
      if (plan) {
        const updatedAmount = plan.PRODUCT_AMOUNT + plan.PRODUCT_AMOUNT * 0.06;
        setAmount(Math.ceil(updatedAmount));
      }
    }
  };

  const handleDataBundlePurchase = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request for airtime purchase
    setTimeout(() => {
      setLoading(false);
      alert("Data bundle purchase successful!");
    }, 2000);
  };

  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <form
            onSubmit={handleDataBundlePurchase}
            className="w-full flex flex-col gap-3"
          >
            {/* Select Network */}
            <div className="border px-2 rounded-md border-gray-300">
              <select
                className="bg-transparent text-[15px] outline-none h-[47px] placeholder-gray-500 w-full"
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
                  className="bg-transparent text-[15px] outline-none h-[47px] placeholder-gray-500 w-full"
                  name="plan"
                  value={selectedPlan?.PRODUCT_ID || ""}
                  onChange={handlePlanChange}
                  required
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select Plan
                  </option>
                  {dataPlans[selectedNetwork][0].PRODUCT.map((product) => (
                    <option key={product.PRODUCT_ID} value={product.PRODUCT_ID}>
                      {product.PRODUCT_NAME} - ₦
                      {Math.ceil(
                        typeof product.PRODUCT_AMOUNT === "string"
                          ? parseFloat(product.PRODUCT_AMOUNT) * 1.06
                          : product.PRODUCT_AMOUNT * 1.06
                      )}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Only show the other fields when a plan is selected */}
            {selectedPlan && (
              <>
                <input
                  type="number"
                  className="bg-transparent text-[15px] border px-2 outline-none h-[47px] placeholder-gray-500 rounded-md border-gray-300 w-full"
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
                  className="bg-transparent text-[15px] border px-2 outline-none h-[47px] placeholder-gray-500 rounded-md border-gray-300 w-full"
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
              type="submit"
              isLoading={loading}
              className="h-[50px] text-white rounded-lg mt-5 font-semibold bg-primary w-full"
              disabled={loading || !selectedPlan} // Disable button if no plan is selected
            >
              {loading ? "Processing..." : "Proceed"}
            </Button>
          </form>
        </div>
      </section>
    </ServicesPageLayout>
  );
};

export default DataPage;
