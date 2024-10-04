import { siteConfig } from "@/config/site";
import { BsFillRSquareFill } from "react-icons/bs";
export const Navbar = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-[1300px] w-full px-4">
        {/* Logo */}
        <div className="flex py-5 items-center gap-1">
          <BsFillRSquareFill color={siteConfig.siteColors.primary} size={28} />
          <h1 className="text-[20px] text-black font-extrabold">RADIUS</h1>
        </div>
      </div>
    </div>
  );
};
