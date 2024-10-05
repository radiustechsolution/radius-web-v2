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
    transactions: "/dashboard/transactions",
    profile: "/dashboard/profile",
    help: "/dashboard/help",
    bonus: "/dashboard/bonus",
  },
};
