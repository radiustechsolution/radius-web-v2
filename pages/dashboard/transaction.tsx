import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Spinner } from "@nextui-org/spinner"; // Use a spinner to show loading state
import ServicesPageLayout from "@/layouts/servicespages";
import { capitalizeFirstLetter } from "@/lib/functions";
import { useTheme } from "next-themes";

export default function TransactionResolve() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query; // Transaction ID from query params
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (!id || !session) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/transaction/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch transaction details");
        }

        setTransaction(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch transaction details when `id` and `session` are available
    if (id && session) {
      fetchTransactionDetails();
    }
  }, [id, session]);
  const theme = useTheme();

  return (
    <ServicesPageLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          {loading ? (
            <Spinner
              color={theme.theme === "dark" ? "white" : "primary"}
              className="text-serviceIconColor"
            /> // Show loading spinner while fetching data
          ) : (
            <div className="space-y-4">
              {error ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full flex items-center gap-4 flex-col justify-center">
                    <img
                      src="/not-found.svg"
                      className="w-[55%]"
                      alt="coming-soon"
                    />
                    <h1 className="text-[18px]">
                      Transaction could not be found
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="p-4 flex flex-col gap-4">
                  <div className="bg-card p-5 rounded-lg gap-2 flex flex-col items-center">
                    <p className="text-[15px]">{transaction.narration}</p>
                    <p className="font-bold text-[30px]">
                      ₦{transaction.amount}
                    </p>
                    <p
                      className={`text-[15px] ${transaction.status == "successful" ? "text-success" : transaction.status == "pending" ? "text-warning" : transaction.status == "failed" ? "text-danger" : "text-gray-300"}`}
                    >
                      {capitalizeFirstLetter(transaction.status)}
                    </p>
                  </div>

                  <div className="bg-card p-5 gap-4 rounded-lg flex flex-col items-center">
                    <div className="w-full flex items-center justify-between">
                      <p className="text-left w-max">Narration:</p>
                      <p className="font-medium text-right">
                        {transaction.narration}
                      </p>
                    </div>
                    {transaction.type == "debit" && (
                      <div className="w-full flex items-center justify-between">
                        <p className="text-left w-max">Beneficiary:</p>
                        <p className="font-medium text-right">
                          {transaction.beneficiary}
                        </p>
                      </div>
                    )}
                    <div className="w-full flex items-center justify-between">
                      <p className="text-left w-max">Transaction ID:</p>
                      <p className="font-medium text-right">
                        {transaction.txf}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-left w-max">Date & Time:</p>
                      <p className="font-medium text-right">
                        {new Date(
                          new Date(transaction?.created_at).setHours(
                            new Date(transaction?.created_at).getHours() - 1
                          )
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="px-4 text-[13px] text-center">
                    Thank you for using Radius always for your everyday surfing
                    needs.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </ServicesPageLayout>
  );
}
