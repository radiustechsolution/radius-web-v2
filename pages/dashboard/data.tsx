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
  const [amount, setAmount] = useState("");
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
        selected.PRODUCT.find((p) => p.PRODUCT_ID === planId) || null;
      setSelectedPlan(plan);
      setAmount(plan?.PRODUCT_AMOUNT.toString() || ""); // Update amount based on selected plan
    }
  };

  const handleDataBunlePurchase = (e: any) => {
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
            onSubmit={handleDataBunlePurchase}
            className="w-full flex flex-col gap-3"
          >
            {/* Select Network */}
            <div className="border px-3 rounded-md border-gray-300">
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
              <div className="border px-3 rounded-md border-gray-300">
                <select
                  className="bg-transparent outline-none h-[53px] placeholder-gray-500 w-full"
                  name="plan"
                  onChange={handlePlanChange}
                  required
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select Plan
                  </option>
                  {dataPlans[selectedNetwork][0].PRODUCT.map((product) => (
                    <option key={product.PRODUCT_ID} value={product.PRODUCT_ID}>
                      {product.PRODUCT_NAME} - {product.PRODUCT_AMOUNT}
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
                  className="bg-transparent border px-3 outline-none h-[53px] placeholder-gray-500 rounded-md border-gray-300 w-full"
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
