import { useEffect, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { MdDownloadForOffline } from "react-icons/md";

export const DownloadAppButton2 = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the default prompt from showing immediately
      e.preventDefault();
      // Save the event for later use
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        // Reset the deferred prompt variable
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      {deferredPrompt && (
        <button
          className="tracking-widest uppercase flex items-center gap-1 px-3 text-[10px] py-[7px] font-semibold rounded-md bg-black text-white animate-grow-shrink"
          onClick={handleInstallClick}
        >
          Install
          <HiDownload size={15} color="white" />
        </button>
      )}
    </>
  );
};

{
  /* <div className="h-[25px] animate-grow-shrink2 flex items-center justify-center    rounded-full bg-black w-[25px]">
  <HiDownload
    role="presentation"
    onClick={handleInstallClick}
    size={17}
    color="white"
  />
</div>; */
}
