import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Register the service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
      });
    }
  }, []);

  function useNetwork() {
    const [isOnline, setNetwork] = useState(true); // Default to true

    useEffect(() => {
      if (typeof window !== "undefined") {
        setNetwork(window.navigator.onLine);

        window.addEventListener("offline", () =>
          setNetwork(window.navigator.onLine)
        );
        window.addEventListener("online", () =>
          setNetwork(window.navigator.onLine)
        );

        return () => {
          window.removeEventListener("offline", () =>
            setNetwork(window.navigator.onLine)
          );
          window.removeEventListener("online", () =>
            setNetwork(window.navigator.onLine)
          );
        };
      }
    }, []);

    return isOnline;
  }

  const isOnline = useNetwork();

  useEffect(() => {
    if (!isOnline) {
      console.log("You're offline. Some features may not be available.");
      toast.warning("You're offline. Some features may not be available.");
      router.push("/offline");
    } else {
      console.log("You're back online.");
      // toast.success("You're back online!");
    }
  }, [isOnline]);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider defaultTheme="light">
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
        <ToastContainer />
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
