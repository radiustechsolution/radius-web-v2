import { Avatar } from "@nextui-org/react";
import { ThemeSwitch } from "../theme-switch";
import { CgMenuRight } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbMenu } from "react-icons/tb";

type Types = {
  openNavBar: () => void;
};

export const NavBar = ({ openNavBar }: Types) => {
  return (
    <div className="flex h-[55px] md:h-[60px] bg-card shadow-sm items-center px-3 border-bordercolor justify-between">
      <div className="flex gap-3 items-center">
        <TbMenu
          role="presentation"
          onClick={openNavBar}
          size={23}
          className="flex md:hidden outline-none"
        />
        <p className="font-medium text-[18px]">Chat</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[32px] w-[32px] relative border border-bordercolor shrink-0 flex items-center justify-center rounded-full bg-background">
          <IoNotificationsOutline />
          <div className="absolute top-[6px] w-[6px] right-[8px] h-[6px] rounded-full bg-danger"></div>
        </div>
        <div className="h-[32px] shrink-0 w-[32px] border border-bordercolor flex items-center justify-center rounded-full bg-background">
          <Avatar className="h-[32px] w-[32px] shrink-0" />
        </div>
      </div>
    </div>
  );
};
