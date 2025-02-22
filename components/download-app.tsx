import Link from "next/link";
import { useEffect, useState } from "react";
import { HiDownload } from "react-icons/hi";

export const DownloadAppButton = () => {
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
    <Link
      href="https://drive.google.com/drive/folders/1bWreKYcOEeWom_JfvgwZsB9WVDIKYz6B?usp=sharing"
      className="flex items-center"
      target="_blank"
      rel="noopener noreferrer"
      download
    >
      <div className="z-40 absolute bottom-7">
        <button className="tracking-widest uppercase flex items-center gap-1 px-4 text-[11px] py-[10px] font-semibold rounded-md bg-black text-white animate-grow-shrink">
          Install
          <HiDownload size={16} color="white" />
        </button>
      </div>
    </Link>
  );
};
