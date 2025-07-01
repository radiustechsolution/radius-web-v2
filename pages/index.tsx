import DefaultLayout from "@/layouts/default";
import { Landingsubtitle, subtitle } from "@/components/primitives";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Image from "next/legacy/image";
import { BsFillRSquareFill } from "react-icons/bs";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";
import { HiDownload } from "react-icons/hi";
import { DownloadAppButton } from "@/components/download-app";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const GoNext = () => {
    setIsLoading(true);
    router.push(siteConfig.paths.signin);
  };

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

            <Button
              className="bg-white text-black w-[85%] mt-3 font-semibold"
              size="lg"
              isLoading={isLoading}
              onClick={GoNext}
              radius="md"
            >
              Proceed
            </Button>
          </div>

          <div className="hidden px-10 text-center md:flex flex-col justify-center items-center w-full absolute bottom-10">
            <ul className="flex items-center md:gap-4 opacity-75 cursor-pointer text-[14px]">
              <Link href={"/contact-us"} className="">
                Contact Us
              </Link>
              <Link href="/term-conditions">Terms and Condition</Link>
              <Link href="/term-conditions">Privary and Policy</Link>
              <Link
                href="https://drive.google.com/drive/folders/1bWreKYcOEeWom_JfvgwZsB9WVDIKYz6B?usp=sharing"
                className="flex items-center"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Download
              </Link>
            </ul>
          </div>

          <div className="text-left  px-3 md:text-center md:hidden flex-col justify-center items-start md:items-center w-full absolute bottom-10">
            <div className="flex flex-col md:flex-row md:items-center md:gap-4 opacity-75 cursor-pointer text-[14px] w-full">
              <ul className="flex items-center gap-8 justify-between w-full">
                <Link href={"/contact-us"} className="">
                  Contact Us
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1bWreKYcOEeWom_JfvgwZsB9WVDIKYz6B?usp=sharing"
                  className="flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download
                </Link>
              </ul>
              <ul className="flex items-center gap-8 justify-between w-full text-left">
                <Link href="/term-conditions">Privary and Policy</Link>
                <Link href="/term-conditions">Terms and Condition</Link>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
