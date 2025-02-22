import { ComingSoonComp } from "@/components/coming-soon";
import DashboardLayout from "@/layouts/dashboard";
import ServicesPageLayout from "@/layouts/servicespages";

const BonusPage = () => {
  return (
    <DashboardLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <div className=" mt-[100px] flex items-center justify-center">
            <div className="w-full flex items-center gap-4 flex-col justify-center">
              <img
                src="/coming-soon.svg"
                className="w-[65%]"
                alt="coming-soon"
              />
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default BonusPage;
