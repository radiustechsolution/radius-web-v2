import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboard";
import { ComingSoonComp } from "@/components/coming-soon";

type ProfitData = {
  date: string;
  profit: number;
  bonusClaimed: number; // Assuming this field represents the bonus claimed
};

const ProfitPage = () => {
  const [profits, setProfits] = useState<ProfitData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [yesterdayBonus, setYesterdayBonus] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfits = async () => {
      try {
        const response = await fetch("/api/profit");
        const data: ProfitData[] = await response.json();
        setProfits(data);

        // Calculate yesterday's date
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const yesterdayDateString = yesterday.toISOString().slice(0, 10);

        // Find yesterday's bonus claimed
        const yesterdayData = data.find(
          (profit) => profit.date === yesterdayDateString
        );

        if (yesterdayData) {
          setYesterdayBonus(yesterdayData.bonusClaimed);
        } else {
          setYesterdayBonus(0); // Default to 0 if no data found for yesterday
        }
      } catch (error) {
        setProfits([]);
        setYesterdayBonus(null);
        console.error("Error fetching profit data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfits();
  }, []);

  return (
    <DashboardLayout>
      <section className="w-full max-w-[900px] mx-auto flex flex-col gap-6">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-4 overflow-auto scrollbar-hide">
          <h2 className="text-3xl font-semibold">Profit Summary</h2>

          {loading ? (
            <div className="text-center">
              <p>Loading</p>
            </div>
          ) : (
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="mb-5">
                <p className="text-xl font-semibold mb-2">
                  Yesterday&apos;s Bonus Claimed
                </p>
                <p className="text-red-500 text-lg">
                  {yesterdayBonus !== null
                    ? `₦${yesterdayBonus.toFixed(2)}`
                    : "No data available"}
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-4">
                Last 30 Days&apos; Profits
              </h3>

              {profits.length === 0 ? (
                <p>No profit data available.</p>
              ) : (
                <ul className="space-y-4">
                  {profits.map((profit) => (
                    <li
                      key={profit.date}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{profit.date}</span>
                      <span className="text-lg font-medium text-green-600">
                        ₦{profit.profit.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default ProfitPage;
