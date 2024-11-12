import { Spinner } from "@nextui-org/spinner";
import DashboardLayout from "@/layouts/dashboard";
import { ServicesCard } from "@/components/dashboard/service-card";
import { DashboardAccountCompCard } from "@/components/dashboard/dashboard-accout-comp-card";
import { signIn, useSession } from "next-auth/react";
import { formatCurrency } from "@/lib/functions";
import { GrAnnounce } from "react-icons/gr";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { FaWhatsapp } from "react-icons/fa6";
import WhatsAppCard from "@/components/dashboard/whatsapp-group";
import CheckProfitCard from "@/components/dashboard/CheckProfit";
import { siteConfig } from "@/config/site";

const DashboardPage = () => {
  const router = useRouter();
  const { data: session, update, status } = useSession();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updated = async () => {
      const res = await signIn("credentials", {
        redirect: false,
        email: session?.user?.email,
        xagonn: "sampleregex",
      });
    };
    session?.user.email && updated();
  }, [session?.user?.email]);

  const handleClaimBonus = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/claim-bonus", {
        method: "POST",
      });

      const data = await response.json();
      if (response.ok) {
        const res = await signIn("credentials", {
          redirect: false,
          email: session?.user?.email,
          xagonn: "sampleregex",
        });
        toast.success("Bonus claimed successfully!", {
          toastId: "claim-success",
        });
      } else {
        // console.log(data);
        toast.error(data.message, { toastId: "claim" });
      }
    } catch (error) {
      // console.error("Error claiming bonus", error);
      toast.error("Something went wrong!", { toastId: "claim" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-4 overflow-auto scrollbar-hide">
          {/* Dashboard Detail Card */}
          <DashboardAccountCompCard
            balance={formatCurrency(session?.user?.balance)}
          />

          {/* Services Card */}
          <ServicesCard />

          {/* Claim Bonus */}
          <div className="bg-card px-3 rounded-lg py-3">
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
                className="rounded-lg bg-primarymodecolor px-[14px] py-[6px]"
              >
                <p className="text-[12px] text-card font-medium">Claim</p>
              </div>
            </div>
          </div>

          {/* Chat on whatsapp */}
          <WhatsAppCard />

          {/* Check Profit card */}
          {session?.user.email === siteConfig.adminEmail && <CheckProfitCard />}
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
