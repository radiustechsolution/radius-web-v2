import { siteConfig } from "@/config/site";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Types {
  page: string;
}

export const NavbarServicesPageRightComp = ({ page }: Types) => {
  return (
    <Link href={siteConfig.paths.profile} className="flex items-center gap-2">
      <Avatar className=" shrink-0" size="sm" />
      <div className="flex flex-col leading-4">
        <p className="font-medium text-[14px]">{page}</p>
      </div>
    </Link>
  );
};
