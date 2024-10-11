import { useRouter } from "next/router";
import { NotFound } from "@/components/coming-soon";
import DefaultLayout from "@/layouts/default";
import { useEffect } from "react";

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
