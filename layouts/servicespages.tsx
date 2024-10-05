import { SideNav } from "@/components/dashboard/sidenav";
import { Head } from "./head";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { NavBarServicesPage } from "@/components/dashboard/navservices";

export default function ServicesPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hooks
  const { data: session } = useSession();

  // State to manage the sidenav visibility
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState<string>(router.pathname);

  if (!session) {
    return <div></div>;
  }

  return (
    <div className="relative flex h-svh">
      <Head />
      {/* SideNav*/}
      <aside
        className={`absolute z-20 top-0 h-full transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 w-[85%] md:w-64`}
      >
        <SideNav closeSideNav={() => setIsOpen(false)} />
      </aside>

      <main className="flex-1 flex flex-col">
        {/* Main Navbar */}
        <NavBarServicesPage openNavBar={() => setIsOpen(!isOpen)} />
        <div className="flex-1 p-2 overflow-auto">{children}</div>
      </main>

      {/* Close the sidenav when clicked outside on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
