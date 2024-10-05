import { Avatar, Link } from "@nextui-org/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { ProfileDetailComp } from "./profileComp";
import { VscMenu } from "react-icons/vsc";
import { ProfileDetailWelcomeNavComp } from "./profile-nav";
import { NavbarServicesPageRightComp } from "./navbarservicespageright";
import { IoChevronBackOutline } from "react-icons/io5";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/router";
import GetPageTitle from "@/lib/getpagetitile";
type Types = {
  openNavBar: () => void;
};

export const NavBarServicesPage = ({ openNavBar }: Types) => {
  const pageTitle = GetPageTitle();
  const router = useRouter();

  // const page
  return (
    <div className="flex h-[55px] border-b border-bordercolor md:h-[60px] shadow-sm items-center px-3 justify-between">
      <div className="flex gap-3 items-center">
        <div
          className="flex items-center gap-1"
          role="presentation"
          onClick={() => router.back()}
        >
          <IoChevronBackOutline size={23} />
          <p className="font-medium text-[16px]">{pageTitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <VscMenu
          role="presentation"
          onClick={openNavBar}
          size={23}
          className="flex md:hidden outline-none"
        />
      </div>
    </div>
  );
};
