import DefaultLayout from "@/layouts/default";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <DefaultLayout>
      <section className="w-full h-[100vh] flex items-center justify-center text-center bg-background">
        <div className="max-w-lg p-4">
          <h1 className="text-3xl font-bold mb-4">You Are Offline</h1>
          <p className="text-lg mb-4">
            Oops! It seems you&apos;ve lost your internet connection. Please
            check your network and try again.
          </p>
          <Link href="/" passHref>
            Go back to Home
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
