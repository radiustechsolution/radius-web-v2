import { Spinner } from "@nextui-org/spinner";
// import { Avatar } from "@nextui-org/avatar";
import DashboardLayout from "@/layouts/dashboard";
import { ComingSoonComp, NotFound } from "@/components/coming-soon";
import ServicesPageLayout from "@/layouts/servicespages";
import DefaultLayout from "@/layouts/default";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { siteConfig } from "@/config/site";

const PageNotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  if (1 == 1) {
    return <div></div>;
  }

  return (
    <DefaultLayout>
      <section className="w-full relative max-w-[580px] flex flex-col h-full">
        {/* Dashboard asrea */}
        <div className="flex-1 z-10 flex flex-col gap-0 overflow-auto scrollbar-hide">
          <NotFound />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default PageNotFound;
