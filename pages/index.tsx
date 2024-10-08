import DefaultLayout from "@/layouts/default";
import { subtitle } from "@/components/primitives";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="relative w-full gap-10 px-4 flex flex-col items-center justify-center h-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing_bg1.jpg" // Add the path to your image here
            layout="fill"
            quality={50}
            objectFit="cover"
            alt="Background"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Head */}
        <div className="relative z-10 text-left flex flex-col items-center">
          <h1
            className={`tracking-tight inline font-semibold text-[30px] sm:text-3xl lg:text-4xl text-white`}
          >
            Enjoy Cheapest Data Sales on Radius.
          </h1>
          <p
            className={`${subtitle()} max-w-[90%] text-[15px] sm:text-md text-gray-300`}
          >
            Spend less, save more when you use Radius for your everyday surfing
            needs. 😎
          </p>
        </div>

        {/* Bottom */}
        <div className="relative z-10 w-full">
          <Link href={siteConfig.paths.signin}>
            <button className="h-[50px] w-full text-[14px] font-semibold text-white rounded-lg bg-primary">
              Let&apos;s start
            </button>
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
