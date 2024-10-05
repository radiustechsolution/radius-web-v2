import { Spinner } from "@nextui-org/spinner";
// import { Avatar } from "@nextui-org/avatar";
import DashboardLayout from "@/layouts/dashboard";

const BonusPage = () => {
  return (
    <DashboardLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <p>Bonus Page</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default BonusPage;