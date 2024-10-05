import { siteConfig } from "@/config/site";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Types {
  username?: boolean;
}

export const ProfileDetailWelcomeNavComp = ({ username }: Types) => {
  // Hook
  const { data: session } = useSession();

  return (
    <Link href={siteConfig.paths.profile} className="flex items-center gap-2">
      <Avatar className=" shrink-0" size="sm" />
      <div className="flex flex-col leading-4">
        <p className="font-medium text-[14px]">
          Hi, {session?.user?.username?.toUpperCase()}
        </p>
      </div>
    </Link>
  );
};
