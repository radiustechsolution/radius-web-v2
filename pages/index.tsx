import DefaultLayout from "@/layouts/default";
import { subtitle } from "@/components/primitives";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="w-full gap-10 max-w-[1300px] px-4 flex flex-col items-center justify-center h-full">
        {/* Head */}
        <div className="text-center flex flex-col items-center">
          <h1
            className={`tracking-tight inline font-semibold text-[26px] sm:text-3xl lg:text-4xl text-[#161616]`}
          >
            How would you like to use Radius Data?
          </h1>
          <p
            className={`${subtitle()} max-w-[90%] text-[15px] sm:text-md text-gray-500`}
          >
            Anyone is cool. We&apos;re here to serve you with the best 😎
          </p>
        </div>

        {/* Bottom */}
        <div className="">
          <Link href={siteConfig.paths.signin}>
            <button className="h-[43px] px-6 text-[14px] font-semibold text-white rounded-full bg-primary">
              Let&apos;s start
            </button>
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
