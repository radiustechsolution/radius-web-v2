import { signOut, useSession } from "next-auth/react";
import DashboardLayout from "@/layouts/dashboard";
import { Spinner } from "@nextui-org/spinner";
import { Avatar, Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";

const ProfilePage = () => {
  const { data: session } = useSession();

  const {
    first_name,
    last_name,
    email,
    phone_number,
    username,
    user_data,
  }: any = session?.user || {};

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: siteConfig.paths.signin });
  };

  return (
    <DashboardLayout>
      <section className="w-full max-w-[580px] mx-auto flex flex-col h-full p-3">
        {/* Dashboard Header */}
        <div className="mb-6">
          <p className="text-2xl font-semibold text-primarymodecolorgray">
            Profile
          </p>
          <p className="text-sm opacity-80">
            View and update your profile information.
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-card p-4 rounded-xl space-y-6">
          {/* Profile Image and Name */}
          <div className="flex items-center space-x-2">
            <div className="rounded-full overflow-hidden bg-card">
              <Avatar className="shrink-0" />
            </div>
            <div className="leading-5">
              <p className="text-[16px] font-semibold">
                {first_name} {last_name}
              </p>
              <p className="text-sm opacity-70">@{username}</p>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-1">
            <div className="flex justify-between items-center opacity-80">
              <p className="text-sm">Email</p>
              <p className="font-medium opacity-90 text-[14px]">{email}</p>
            </div>
            <div className="flex justify-between items-center opacity-80">
              <p className="text-sm">Phone Number</p>
              <p className="font-medium opacity-90 text-[14px]">
                {phone_number}
              </p>
            </div>
            <div className="flex justify-between items-center opacity-80">
              <p className="text-sm">Username</p>
              <p className="font-medium opacity-90 text-[14px]">{username}</p>
            </div>
            <div className="flex justify-between items-center opacity-80">
              <p className="text-sm">Promo Code</p>
              <p className="font-medium opacity-90 text-[14px]">
                {session?.user.username}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center leading-4 mt-7 text-[12px]">
          <span className="opacity-50">Reach out to</span>{" "}
          <span className="opacity-70">
            <Link
              className="text-[12px] underline underline-offset-2"
              href={`tel:08141314105`}
            >
              08141314105
            </Link>
          </span>{" "}
          <span className=" opacity-50">
            should you have issues or need a Software Development service.
          </span>
        </p>

        {/* Update Button */}
        <div
          role="presentation"
          onClick={handleLogout}
          className="mt-6 flex justify-center"
        >
          <button className="px-7 py-2 bg-primary text-white rounded-full text-[14px] hover:bg-blue-700 transition-all">
            Logout
          </button>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default ProfilePage;
