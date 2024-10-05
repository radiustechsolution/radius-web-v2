import { Spinner } from "@nextui-org/spinner";
// import { Avatar } from "@nextui-org/avatar";
import DashboardLayout from "@/layouts/dashboard";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { siteConfig } from "@/config/site";
import { ServicesCard } from "@/components/dashboard/service-card";
import { DashboardAccountCompCard } from "@/components/dashboard/dashboard-accout-comp-card";
import { getSession, useSession } from "next-auth/react";
import { formatCurrency } from "@/lib/functions";
import { GrAnnounce } from "react-icons/gr";
import { useState } from "react";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClaimBonus = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/claim-bonus", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        // Re-fetch the session to get the updated balance
        console.log(data);
        // const session = await getSession();
        // console.log("Updated session balance:", session?.user?.balance);
      } else {
        console.log(data);
        toast("Something went wrong!", { toastId: "claim" });
      }
    } catch (error) {
      console.error("Error claiming bonus:", error);
      toast("Something went wrong!", { toastId: "claim" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-4 overflow-auto scrollbar-hide">
          {/* Dashboard Details Card */}
          <DashboardAccountCompCard
            balance={formatCurrency(session?.user?.balance)}
          />
          {/* Services Card */}
          <ServicesCard />

          {/* Claim Bonus */}
          <div className="bg-card px-3 rounded-lg py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 sborder-[0.5px] border-blue-200 border rounded-full">
                  <GrAnnounce className="text-primary" />
                </div>
                <div className=" leading-4">
                  <h1 className="text-[14px] font-medium">
                    Claim today&lsquo;s Bonus
                  </h1>
                  <p className="text-[11px] opacity-65 ">
                    Top up balance with ₦2 bonus
                  </p>
                </div>
              </div>
              <div
                role="presentation"
                onClick={handleClaimBonus}
                className="rounded-lg bg-primarymodecolor px-3 py-1"
              >
                <p className="text-[12px] text-card font-medium">Claim</p>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="fixed left-0 top-0 w-full z-50 bg-[#36363690] flex items-center justify-center h-svh">
            <Spinner color="white" />
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
