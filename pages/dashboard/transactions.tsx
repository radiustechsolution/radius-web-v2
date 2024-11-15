import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import DashboardLayout from "@/layouts/dashboard";
import { useSession } from "next-auth/react";
import { formatCurrency } from "@/lib/functions";
import { useRouter } from "next/router";
import { siteConfig } from "@/config/site";

const HistoryPage = () => {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const res = await fetch(`/api/transactions?userId=${session?.user.id}`);
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.email) {
      fetchTransactionHistory();
    }
  }, [session?.user.email]);

  return (
    <DashboardLayout>
      <section className="w-full max-w-[580px] flex flex-col h-full">
        {/* Dashboard area */}
        <div className="flex-1 flex flex-col gap-0 overflow-auto scrollbar-hide">
          {loading ? (
            <Spinner /> // Show loading spinner while fetching data
          ) : (
            <div className="space-y-4">
              {transactions?.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full flex items-center gap-4 flex-col justify-center">
                    <img
                      src="/not-found.svg"
                      className="w-[55%]"
                      alt="coming-soon"
                    />
                    <h1 className="text-[18px]">No transaction was found</h1>
                  </div>
                </div>
              ) : (
                transactions?.map((transaction) => (
                  <div
                    onClick={() =>
                      router.push(
                        `${siteConfig.paths.resolve_transaction}?id=${transaction?.id}`
                      )
                    }
                    role="presentation"
                    key={transaction?.txf}
                    className="px-3 cursor-pointer rounded-md py-2 flex bg-card items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-full ${transaction?.type == "credit" ? "bg-blue-100" : "bg-gray-100"} shrink-0 border ${transaction?.type == "credit" ? "border-blue-300" : "border-gray-300"}`}
                      >
                        <p
                          className={`text-[14px] ${transaction?.type == "credit" ? "text-primary" : "text-gray-900"} font-medium`}
                        >
                          {" "}
                          {transaction?.type == "credit" ? "CR" : "DB"}{" "}
                        </p>
                      </div>
                      <div>
                        <p className="text-[14px] font-medium">
                          {transaction?.trans_type == "wallet_funding"
                            ? "Wallet Funding"
                            : transaction?.trans_type.toUpperCase()}{" "}
                          {transaction?.merchant != "" &&
                            transaction?.merchant != null &&
                            "(" + transaction?.merchant + ")"}
                        </p>
                        <p className="text-[12px] opacity-70">
                          {new Date(
                            new Date(transaction?.created_at).setHours(
                              new Date(transaction?.created_at).getHours() - 1
                            )
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <p className="text-[14px] font-medium">
                        N{formatCurrency(transaction?.amount)}
                      </p>
                      <p
                        className={`text-[13px] ${transaction?.status == "successful" ? "text-green-700" : transaction?.status == "pending" ? "text-warning" : transaction?.status == "failed" ? "text-danger" : ""} `}
                      >
                        {transaction?.status}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default HistoryPage;
