import { Spinner } from "@nextui-org/spinner";
// import { Avatar } from "@nextui-org/avatar";
import DashboardLayout from "@/layouts/dashboard";
import { ComingSoonComp, NotFound } from "@/components/coming-soon";
import ServicesPageLayout from "@/layouts/servicespages";

const PageNotFound = () => {
  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <NotFound />
        </div>
      </section>
    </ServicesPageLayout>
  );
};

export default PageNotFound;
