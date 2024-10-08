import { title } from "./primitives";

export const ComingSoonComp = () => {
  return (
    <div className=" mt-[100px] flex items-center justify-center">
      <div className="w-full flex items-center gap-4 flex-col justify-center">
        <img src="/coming-soon.svg" className="w-[65%]" alt="coming-soon" />
        <h1
          className={`${title({ size: "sm" })} w-[70%] text-[26px] text-center`}
        >
          Coming Soon
        </h1>
      </div>
    </div>
  );
};

export const NotFound = () => {
  return (
    <div className=" mt-[100px] flex items-center justify-center">
      <div className="w-full flex items-center gap-0 flex-col justify-center">
        <img src="/404.svg" className="w-[65%]" alt="coming-soon" />
        <h1
          className={`${title({ size: "sm" })} w-[70%] text-[26px] text-center`}
        >
          Sorry! This page could not be found.
        </h1>
      </div>
    </div>
  );
};

export const OfflineComp = () => {
  return (
    <div className=" mt-[100px] flex items-center justify-center">
      <div className="w-full flex items-center gap-4 flex-col justify-center">
        <img
          src="/no_connection.svg"
          className="w-[65%]"
          alt="connection_lost"
        />
        <h1
          className={`${title({ size: "sm" })} w-[70%] text-[26px] text-center`}
        >
          Connection Lost!
        </h1>
      </div>
    </div>
  );
};
