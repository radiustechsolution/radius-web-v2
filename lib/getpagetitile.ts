import { useRouter } from "next/router";

const GetPageTitle = () => {
  const router = useRouter();
  const { pathname } = router;

  // Define route mappings
  const routeMappings: any = {
    "/dashboard/airtime": "Airtime",
    "/dashboard/data": "Data Bundle",
    "/dashboard/cable": "Cable",
    "/dashboard/power": "Power",
    "/dashboard/loan": "Loan",
    "/dashboard/bonus": "Bonus",
    "/dashboard/save": "Save",
    "/dashboard/netflix": "Netflix",
  };

  // Return the corresponding title or a default value if the route is not mapped
  return routeMappings[pathname] || "Dashboard";
};

export default GetPageTitle;
