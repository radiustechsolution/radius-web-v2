import { SideNav } from "@/components/dashboard/sidenav";
import { Head } from "./head";
import { useState } from "react";
import { NavBar } from "@/components/dashboard/navbar";
import {
  RiHomeFill,
  RiHomeLine,
  RiInformationFill,
  RiInformationLine,
  RiUser6Fill,
  RiUser6Line,
} from "react-icons/ri";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaSheetPlastic } from "react-icons/fa6";
import { LuFileSpreadsheet } from "react-icons/lu";
import { IoGiftOutline, IoGiftSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";

const MenuObj = [
  {
    title: "Home",
    icon: <RiHomeLine size={25} color="gray" />,
    iconFill: <RiHomeFill size={25} className="text-primarymodecolor" />,
    path: siteConfig.paths.dashboard,
  },
  {
    title: "Bonus",
    icon: <IoGiftOutline size={25} color="gray" />,
    iconFill: <IoGiftSharp className="text-primarymodecolor" size={25} />,
    path: siteConfig.paths.bonus,
  },
  {
    title: "History",
    icon: <LuFileSpreadsheet size={25} color="gray" />,
    iconFill: <FaSheetPlastic className="text-primarymodecolor" size={25} />,
    path: siteConfig.paths.transactions,
  },
  {
    title: "Help",
    icon: <RiInformationLine size={25} color="gray" />,
    iconFill: <RiInformationFill className="text-primarymodecolor" size={25} />,
    path: siteConfig.paths.help,
  },
  {
    title: "Profile",
    icon: <RiUser6Line size={25} color="gray" />,
    iconFill: <RiUser6Fill className="text-primarymodecolor" size={25} />,
    path: siteConfig.paths.profile,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hooks
  const { data: session } = useSession();

  // State to manage the sidenav visibility
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState<string>(router.pathname);

  if (!session) {
    return <div></div>;
  }

  return (
    <div className="relative flex h-svh">
      <Head />
      {/* SideNav*/}
      <aside
        className={`absolute z-20 top-0 h-full transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 w-[85%] md:w-64`}
      >
        <SideNav closeSideNav={() => setIsOpen(false)} />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Main Navbar */}
        <NavBar openNavBar={() => setIsOpen(!isOpen)} />
        <div className="flex-1 p-2 overflow-auto">{children}</div>
        {/* Navigation Bar footer */}
        <div className="border-t flex items-center justify-between px-4 h-[65px] border-bordercolor">
          {MenuObj.map((v) => (
            <Link
              href={v.path}
              key={v.title}
              className="flex flex-col gap-[1px] items-center"
            >
              {active == v.path ? v.iconFill : v.icon}
              <p
                className={`${active != v.path ? "text-[gray]" : "text-primarymodecolorgray"} text-[10px]`}
              >
                {v.title}
              </p>
            </Link>
          ))}
        </div>
      </main>

      {/* Close the sidenav when clicked outside on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
