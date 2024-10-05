import ServicesPageLayout from "@/layouts/servicespages";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const networks = [
  { id: 1, name: "MTN" },
  { id: 2, name: "AIRTEL" },
  { id: 3, name: "GLO" },
  { id: 4, name: "9MOBILE" },
];

const AirtimePage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(""); // State to hold the selected network
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleAirtimePurchase = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request for airtime purchase
    setTimeout(() => {
      setLoading(false);
      alert("Airtime purchase successful!");
    }, 2000);
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
                onChange={(e) => setSelectedNetwork(e.target.value)}
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
      </section>
    </ServicesPageLayout>
  );
};

export default AirtimePage;
