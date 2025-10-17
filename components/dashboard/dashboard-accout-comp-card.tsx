import { siteConfig } from "@/config/site";
import Link from "next/link";
import { RiShieldCheckFill } from "react-icons/ri";
import { RxCaretRight } from "react-icons/rx";
import { BiDialpadAlt, BiSolidCopy } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { copyText } from "@/lib/functions";
import type { IconType } from "react-icons";

type Types = {
  balance: any;
};

export const DashboardAccountCompCard = ({ balance }: Types) => {
  const { data: session } = useSession();

  // Type assertion
  const ShieldIcon = RiShieldCheckFill as IconType;
  const CaretIcon = RxCaretRight as IconType;
  const DialpadIcon = BiDialpadAlt as IconType;
  const CopyIcon = BiSolidCopy as IconType;

  return (
    <div className="rounded-xl bg-promoCodeDisplayBg">
      <div className="rounded-xl flex flex-col gap-[10px] bg-primary p-4">
        {/* Card Top */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ShieldIcon size={14} color="white" />
            <p className="text-white text-[12px] font-light">
              Available Balance
            </p>
          </div>
          <Link
            href={siteConfig.paths.transactions}
            className="flex items-center"
          >
            <p className="text-white text-[12px] font-light">Transactions</p>
            <CaretIcon size={14} color="white" />
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
      <div>
        <div className="px-4 flex gap-2 items-center py-1">
          <div className="flex items-center gap-1">
            <DialpadIcon size={16} className="text-primarymodecolor" />
            <p className="text-[12px]">
              Promo code -{" "}
              <span className="text-primarymodecolor font-semibold">
                {session?.user.username}
              </span>{" "}
            </p>
          </div>
          <CopyIcon
            role="presentation"
            onClick={() => copyText(session?.user.username)}
            className=" text-warning"
            size={13}
          />
        </div>
      </div>
    </div>
  );
};
