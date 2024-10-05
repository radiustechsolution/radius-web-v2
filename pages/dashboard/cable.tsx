import { ComingSoonComp } from "@/components/coming-soon";
import ServicesPageLayout from "@/layouts/servicespages";

const CablePage = () => {
  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <ComingSoonComp />
        </div>
      </section>
    </ServicesPageLayout>
  );
};

export default CablePage;
