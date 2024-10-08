import Link from "next/link";
import { PiFramerLogoFill } from "react-icons/pi";
import {
  IoAddOutline,
  IoArchiveOutline,
  IoFolderOutline,
  IoHeartOutline,
  IoHelpCircleOutline,
  IoHomeOutline,
  IoLogOut,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { title } from "process";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { RxCaretDown } from "react-icons/rx";
import { ProfileDetailComp } from "../dashboard/profileComp";
import { IoSettingsOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { AsideButton } from "./AsideButton";
import { ThemeSwitch } from "../theme-switch";
import { AiOutlineAppstore } from "react-icons/ai";
import { useRouter } from "next/router";

const AsideButtonObj = [
  {
    id: 0,
    title: "Dashboard",
    icon: <AiOutlineAppstore size={22} />,
    figure: 0,
    path: siteConfig.paths.dashboard,
  },
  {
    id: 1,
    title: "Notification",
    icon: <IoNotificationsOutline size={22} />,
    figure: 1,
    path: siteConfig.paths.notification,
  },
  {
    id: 2,
    title: "Transactions",
    icon: <IoNotificationsOutline size={22} />,
    figure: 0,
    path: siteConfig.paths.transactions,
  },
  {
    id: 3,
    title: "Profile",
    icon: <IoPersonOutline size={22} />,
    figure: 0,
    path: siteConfig.paths.profile,
  },
];

interface Types {
  closeSideNav: () => void;
}

export const SideNav = ({ closeSideNav }: Types) => {
  const router = useRouter();
  const [active, setActive] = useState(router.pathname);

  return (
    <aside className="w-full md:w-64 bg-card h-full relative scrollbar-hide overflow-scroll border-r border-bordercolor">
      {/* Header */}
      <div>
        <Link
          href={siteConfig.paths.dashboard}
          className="h-[55px] md:h-[60px] flex items-center px-4 gap-2 border-b border-bordercolor"
        >
          <ProfileDetailComp />
        </Link>

        {/* Links */}
        <nav className="p-3 flex flex-col mt-3 gap-3">
          {AsideButtonObj.map((v) => (
            <div
              role="presentation"
              key={v.id}
              onClick={() => {
                setActive(v.path), router.push(v.path);
              }}
              className={`flex ${active == v.path && "bg-primary"} cursor-pointer items-center w-full ${v.figure !== 0 && "justify-between"} rounded-md px-3 py-3`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`${active == v.path && "text-white"} ${v.title == "Search" && active != v.path && "opacity-65"}`}
                >
                  {v.icon}
                </div>
                <p
                  className={`text-[15px] md:text-[13px] font-medium ${active == v.path && "text-white"} ${v.title == "Search" && active != v.path && "opacity-65"} `}
                >
                  {v.title}
                </p>
              </div>

              {v.figure !== 0 && (
                <p
                  className={`text-[13px] ${active == v.path && "text-white"} `}
                >
                  {v.figure}
                </p>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div className=" absolute bottom-0 w-full bg-card z-10">
        <div className="p-3 flex flex-col gap-3">
          {/* <div className="px-2 cursor-pointer flex items-center gap-2">
            <IoSettingsOutline size={20} />
            <p className="text-[15px]">Settings</p>
          </div> */}
          <Link
            href={siteConfig.paths.help}
            className="px-2 cursor-pointer flex items-center gap-2"
          >
            <IoHelpCircleOutline size={28} />
            <p className="text-[16px]">Help</p>
          </Link>
        </div>
        <div className="p-3 border-t border-bordercolor">
          <div className="px-2 cursor-pointer justify-between flex items-center gap-2">
            <p className="text-[15px]">Day/Night</p>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </aside>
  );
};
