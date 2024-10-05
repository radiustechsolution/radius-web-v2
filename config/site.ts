export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Radius - Utility and Bills Payment Made Easy and Affordable ",
  shortName: "Radius",
  description: "Utility and Bills Payment Made Easy and Affordable",
  siteColors: {
    primary: "#0E14A2",
    cardLightColor: "#ffffff",
    cardDarkColor: "#171717",
    bgLightColor: "#F3F3F3",
    bgDarkColor: "#212121",
  },
  paths: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    dashboard: "/dashboard",
    databundle: "/dashboard/data",
    airtime: "/dashboard/airtime",
    cable: "/dashboard/cable",
    power: "/dashboard/power",
    transactions: "/dashboard/transactions",
    profile: "/dashboard/profile",
    savings: "/dashboard/savings",
    netflix: "/dashboard/netflix",
    loan: "/dashboard/loan",
    help: "/dashboard/help",
    bonus: "/dashboard/bonus",
  },
};
