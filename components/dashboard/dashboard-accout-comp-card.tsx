import { siteConfig } from "@/config/site";
import Link from "next/link";
import { RiShieldCheckFill } from "react-icons/ri";
import { RxCaretRight } from "react-icons/rx";

type Types = {
  balance: any;
};

export const DashboardAccountCompCard = ({ balance }: Types) => {
  return (
    <div className="rounded-xl flex flex-col gap-[10px] bg-primary p-4">
      {/* Card Top */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <RiShieldCheckFill size={14} color="white" />
          <p className="text-white text-[12px] font-light">Available Balance</p>
        </div>
        <Link href={siteConfig.paths.transfer} className="flex items-center">
          <p className="text-white text-[12px] font-light">Send Money</p>
          <RxCaretRight size={14} color="white" />
        </Link>
      </div>

      {/* Card Bottom */}
      <div className="flex items-center justify-between">
        <h1 className="text-[26px] text-white font-semibold">
          <span className="text-[17px]">₦</span>
          {balance}
        </h1>
        <Link
          href={siteConfig.paths.addmoney}
          className="px-[10px] flex items-center py-1 bg-white rounded-full"
        >
          <p className="text-[12px] font-medium text-primary">Add Money</p>
        </Link>
      </div>
    </div>
  );
};
