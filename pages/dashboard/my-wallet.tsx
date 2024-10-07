import { title } from "@/components/primitives";
import ServicesPageLayout from "@/layouts/servicespages";
import { copyText } from "@/lib/functions";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";

const AddMoneyPage = () => {
  const { data: session } = useSession();

  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          {/* Card With Details */}
          <div className="bg-card p-4 flex flex-col gap-4 rounded-lg">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-[13px] uppercase opacity-65">
                  {session?.user.account_name}
                </p>
                <p className="text-[13px] opacity-65">
                  {session?.user?.bank_name}
                </p>
              </div>
              <h1 className={`${title({ size: "sm" })} tracking-widest`}>
                {session?.user.account_number}
              </h1>
            </div>
            <div className="flex justify-between items-center">
              <Button
                onClick={() => copyText(session?.user.account_number)}
                className="bg-blue-100 w-[100%] font-medium rounded-full text-[13px] text-primary"
              >
                Copy Number
              </Button>
              {/* <Button className="bg-primary w-[49%] rounded-full text-[13px] text-white">
                Share Details
              </Button> */}
            </div>
          </div>
          <p className="text-[12px] p-5 opacity-55 text-center">
            Deposit made to the account above incures charges of 1.4%. If you
            sent N100, you will receive N98.6
          </p>
        </div>
      </section>
    </ServicesPageLayout>
  );
};

export default AddMoneyPage;
