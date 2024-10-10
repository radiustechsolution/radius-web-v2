import DefaultLayout from "@/layouts/default";
import { Landingsubtitle, subtitle } from "@/components/primitives";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Image from "next/legacy/image";
import { BsFillRSquareFill } from "react-icons/bs";
import { Button } from "@nextui-org/button";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="w-full h-[100svh] bg-background relative">
        {/* Hero Page */}
        <div className="relative h-[100svh] flex text-center items-center flex-col justify-center">
          <Image
            src={"/ai.jpg"}
            layout="fill"
            objectFit="cover"
            alt="Hero Background"
            quality={45}
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-65 z-0"></div>

          {/* Content */}
          <div className="relative max-w-[95%] lg:max-w-[55%] flex items-center flex-col z-10">
            <h1 className="text-[34px] md:text-[60px] leading-[45px] md:leading-[70px] font-extrabold text-white drop-shadow-lg">
              Enjoy Cheap Data Sales on Radius.
            </h1>
            <p className={`${Landingsubtitle()} max-w-[80%] text-white `}>
              Spend less, save more when you use Radius for your everyday
              surfing needs.
            </p>

            <Link href={siteConfig.paths.signin} className="w-full mt-3">
              <Button
                className="bg-white text-black w-[85%] font-semibold"
                size="lg"
              >
                Proceed
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
