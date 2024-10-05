import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";

interface Types {
  username?: boolean;
}

export const ProfileDetailComp = ({ username }: Types) => {
  // Hook
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      <Avatar className=" shrink-0" size="sm" />
      <div className="flex flex-col leading-4">
        <p className="font-medium text-[13px]">
          {session?.user?.first_name} {session?.user.last_name}
        </p>
        {username && (
          <p className="text-[12px] opacity-70">{session?.user?.username}</p>
        )}
      </div>
    </div>
  );
};
