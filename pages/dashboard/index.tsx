import { Spinner } from "@nextui-org/spinner";
// import { Avatar } from "@nextui-org/avatar";
import DashboardLayout from "@/layouts/dashboard";
import { RiShieldCheckFill } from "react-icons/ri";
import { RxCaretRight } from "react-icons/rx";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { siteConfig } from "@/config/site";
import { ServicesCard } from "@/components/dashboard/service-card";
const DashboardPage = () => {
  return (
    <DashboardLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-4 overflow-auto scrollbar-hide">
          {/* Dashboard Details Card */}
          <div className="rounded-xl flex flex-col gap-[10px] bg-primary p-4">
            {/* Card Top */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <RiShieldCheckFill size={14} color="white" />
                <p className="text-white text-[12px] font-light">
                  Available Balance
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-white text-[12px] font-light">
                  Transaction History
                </p>
                <RxCaretRight size={14} color="white" />
              </div>
            </div>

            {/* Card Bottom */}
            <div className="flex items-center justify-between">
              <h1 className="text-[26px] text-white font-semibold">
                <span className="text-[17px]">₦</span>0.00
              </h1>
              <div className="px-[10px] flex items-center py-1 bg-white rounded-full">
                <p className="text-[12px] font-medium text-primary">
                  Add Money
                </p>
              </div>
            </div>
          </div>

          {/* Services Card */}
          <ServicesCard />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
