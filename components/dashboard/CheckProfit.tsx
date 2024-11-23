import { useRouter } from "next/router";
import { FaWhatsapp } from "react-icons/fa";

const CheckProfitCard = () => {
  // hook
  const router = useRouter();

  const handleCheck = () => {
    router.push("/dashboard/profit");
  };

  return (
    <div className="bg-card px-3 rounded-lg py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="leading-4">
            <h1 className="text-[14px] font-medium">Previous 30 Days Profit</h1>
            <p className="text-[11px] opacity-65">Check the sales on Radius</p>
          </div>
        </div>
        <div
          role="presentation"
          onClick={handleCheck} // Trigger WhatsApp invite link
          className="rounded-lg bg-iconBg  flex items-center gap-1 px-[14px] py-[7px] cursor-pointer"
        >
          <p className="text-[12px] text-serviceIconColor font-medium">Check</p>
        </div>
      </div>
    </div>
  );
};

export default CheckProfitCard;
