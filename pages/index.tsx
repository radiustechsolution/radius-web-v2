import DefaultLayout from "@/layouts/default";
import { subtitle } from "@/components/primitives";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { BsFillRSquareFill } from "react-icons/bs";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="relative w-full gap-10 px-4 flex flex-col items-center justify-end h-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/fam4.jpg" // Add the path to your image here
            layout="fill"
            priority
            className=" object-cover"
            quality={40}
            objectFit="cover"
            alt="Background"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-65"></div>
        </div>

        <div className="flex py-5 absolute top-[0px] right-[10px] items-center gap-2">
          <BsFillRSquareFill color={"white"} size={35} />
        </div>

        <div className="flex mb-[100px] flex-col gap-[20px]">
          {/* Head */}
          <div className="relative z-10 text-left flex flex-col items-center">
            <h1
              className={`inline font-extrabold text-[34px] sm:text-3xl lg:text-4xl text-white`}
            >
              Enjoy Cheap Data with Daily Bonus on Radius.
            </h1>
            <p
              className={`${subtitle()} max-w-[90%] leading-6 text-[13px] sm:text-md text-white opacity-90`}
            >
              Spend less, save more when you use Radius for your everyday
              surfing needs.
            </p>
          </div>

          {/* Bottom */}
          <div className="relative z-10 w-full">
            <Link
              className=" outline-none border-none"
              href={siteConfig.paths.signup}
            >
              <button className="h-[50px] uppercase w-full text-[14px] font-semibold text-white rounded-lg bg-black">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
