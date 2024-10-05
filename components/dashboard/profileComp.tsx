import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export const ProfileDetailComp = () => {
  // Hook
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2">
      <Avatar
        className=" shrink-0"
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        size="md"
      />
      <div className="flex flex-col leading-4">
        <p className="font-medium text-[13px]">
          {session?.user?.first_name} {session?.user.last_name}
        </p>
        <p className="text-[12px] opacity-70">{session?.user?.username}</p>
      </div>
    </div>
  );
};
