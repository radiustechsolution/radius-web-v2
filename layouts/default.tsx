import { Navbar } from "@/components/navbar";
import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white flex flex-col h-svh">
      <Head />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto flex items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
