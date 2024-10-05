import { Avatar } from "@nextui-org/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { ProfileDetailComp } from "./profileComp";
import { VscMenu } from "react-icons/vsc";
import { ProfileDetailWelcomeNavComp } from "./profile-nav";
type Types = {
  openNavBar: () => void;
};

export const NavBar = ({ openNavBar }: Types) => {
  return (
    <div className="flex h-[55px] border-b border-bordercolor md:h-[60px] shadow-sm items-center px-3 justify-between">
      <div className="flex gap-3 items-center">
        <ProfileDetailWelcomeNavComp />
        {/* <p className="font-medium text-[18px]">Chat</p> */}
      </div>
      <div className="flex items-center gap-3">
        <div className="h-[32px] w-[32px] relative shrink-0 flex items-center justify-center rounded-full bg-background">
          <IoNotificationsOutline size={19} />
          <div className="absolute top-[6px] w-[6px] right-[8px] h-[6px] rounded-full bg-danger"></div>
        </div>
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
