import { SideNav } from "@/components/dashboard/sidenav";
import { Head } from "./head";
import { useState } from "react";
import { NavBar } from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to manage the sidenav visibility
  const [isOpen, setIsOpen] = useState(false);

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
        <NavBar openNavBar={() => setIsOpen(!isOpen)} />
        <div className="flex-1 p-2 overflow-auto">{children}</div>
        {/* Navigation Bar footer */}
        <div className="pt-3 bg-primary">
          <div className="flex items-end gap-2">
            <p className="text-white">Navigation Bottom Menu</p>
          </div>
        </div>
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
