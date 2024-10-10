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
        <MdDownloadForOffline
          role="presentation"
          onClick={handleInstallClick}
          className="animate-grow-shrink"
          size={19}
          color="black"
        />
      )}
    </>
  );
};
