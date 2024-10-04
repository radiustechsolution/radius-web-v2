import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <p>Dashboard</p>
      <p>{session?.user?.balance}</p>
    </div>
  );
};

export default DashboardPage;
