import { siteConfig } from "@/config/site";
import { IoPhonePortrait } from "react-icons/io5";
import { IoIosTv } from "react-icons/io";
import { ImPower } from "react-icons/im";
import { TiWiFi } from "react-icons/ti";
import { BiSolidGift } from "react-icons/bi";
import { IoIosWallet } from "react-icons/io";
import { SiNetflix } from "react-icons/si";
import { FaNairaSign } from "react-icons/fa6";
import Link from "next/link";

const ServiceObject = [
  {
    id: 0,
    title: "Airtime",
    icon: <IoPhonePortrait size={17} className="text-serviceIconColor" />,
    path: siteConfig.paths.airtime,
  },
  {
    id: 1,
    title: "Data",
    icon: <TiWiFi size={17} className="text-serviceIconColor" />,
    path: siteConfig.paths.databundle,
  },
  {
    id: 2,
    title: "Cable",
    icon: <IoIosTv size={17} className="text-serviceIconColor" />,
    path: siteConfig.paths.cable,
  },
  {
    id: 3,
    title: "Power",
    icon: <ImPower size={17} className="text-serviceIconColor" />,
    path: siteConfig.paths.power,
  },
  {
    id: 4,
    title: "Bonus",
    icon: <BiSolidGift size={17} className="text-serviceIconColor" />,
    path: siteConfig.paths.bonus,
  },
  {
    id: 5,
    title: "Save",
    icon: <IoIosWallet size={17} className="text-serviceIconColor" />,
    path: siteConfig.paths.savings,
  },
  {
    id: 6,
    title: "Netflix",
    icon: <SiNetflix size={17} className="text-serviceIconColor" />,
    path: siteConfig.paths.netflix,
  },
  {
    id: 7,
    title: "Loan",
    icon: <FaNairaSign size={17} className="text-serviceIconColor" />,
    path: siteConfig.paths.loan,
  },
];

export const ServicesCard = () => (
  <div className="grid grid-cols-4 gap-4 py-4 px-2 rounded-lg bg-card ">
    {ServiceObject.map((d) => (
      <Link
        href={d.path}
        key={d.id}
        className="gap-1 flex flex-col items-center"
      >
        <div className="p-[9px] border-[0.5px] border-blue-200  rounded-full">
          {d.icon}
        </div>
        <p className="text-[12px] opacity-60">{d.title}</p>
      </Link>
    ))}
  </div>
);
