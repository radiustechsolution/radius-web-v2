// dataPlans.ts

export interface Product {
  PRODUCT_CODE: string;
  PRODUCT_ID: string;
  PRODUCT_NAME: string;
  PRODUCT_AMOUNT: number; // Assuming amounts can be either number or string
}

export interface Provider {
  ID: string;
  PRODUCT: Product[];
}

export interface DataPlans {
  [key: string]: Provider[]; // Provider name (like "MTN") mapped to an array of Providers
}

export const dataplans_object = {
  MTN: [
    {
      ID: "01",
      PRODUCT: [
        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "260",
          PRODUCT_NAME: "150 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 50,
        },

        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "49",
          PRODUCT_NAME: "250 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 72.5,
        },

        {
          PRODUCT_CODE: "40",
          PRODUCT_ID: "215",
          PRODUCT_NAME: "1 GB - 1 day (Gifting)",
          PRODUCT_AMOUNT: 220,
        },

        {
          PRODUCT_CODE: "41",
          PRODUCT_ID: "216",
          PRODUCT_NAME: "3.5 GB - 2 days (Gifting)",
          PRODUCT_AMOUNT: 525,
        },

        {
          PRODUCT_CODE: "42",
          PRODUCT_ID: "217",
          PRODUCT_NAME: "15 GB - 7 days (Gifting)",
          PRODUCT_AMOUNT: 2050,
        },

        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "214",
          PRODUCT_NAME: "500 MB - 30 days (SME)",
          PRODUCT_AMOUNT: 128.5,
        },

        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "259",
          PRODUCT_NAME: "500 MB - 30 days (SME2)",
          PRODUCT_AMOUNT: 126,
        },

        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "212",
          PRODUCT_NAME: "500 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 130,
        },

        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "7",
          PRODUCT_NAME: "1.0 GB - 30 days (SME)",
          PRODUCT_AMOUNT: 257,
        },

        {
          PRODUCT_CODE: "43",
          PRODUCT_ID: "231",
          PRODUCT_NAME: "1.0 GB - 30 days (SME2)",
          PRODUCT_AMOUNT: 252,
        },

        {
          PRODUCT_CODE: "13",
          PRODUCT_ID: "8",
          PRODUCT_NAME: "2.0 GB - 30 days (SME)",
          PRODUCT_AMOUNT: 514,
        },

        {
          PRODUCT_CODE: "16",
          PRODUCT_ID: "233",
          PRODUCT_NAME: "2.0 GB - 30 days (SME2)",
          PRODUCT_AMOUNT: 504,
        },

        {
          PRODUCT_CODE: "17",
          PRODUCT_ID: "209",
          PRODUCT_NAME: "2 GB - 30 days (COPORATE)",
          PRODUCT_AMOUNT: 520,
        },

        {
          PRODUCT_CODE: "19",
          PRODUCT_ID: "44",
          PRODUCT_NAME: "3.0 GB - 30 days (SME)",
          PRODUCT_AMOUNT: 771,
        },

        {
          PRODUCT_CODE: "20",
          PRODUCT_ID: "234",
          PRODUCT_NAME: "3.0 GB - 30 days (SME2)",
          PRODUCT_AMOUNT: 756,
        },

        {
          PRODUCT_CODE: "22",
          PRODUCT_ID: "210",
          PRODUCT_NAME: "3 GB - 30 days (COPORATE)",
          PRODUCT_AMOUNT: 780,
        },

        {
          PRODUCT_CODE: "23",
          PRODUCT_ID: "291",
          PRODUCT_NAME: "5.0 GB - 30 days (SME)",
          PRODUCT_AMOUNT: 1285,
        },

        {
          PRODUCT_CODE: "24",
          PRODUCT_ID: "235",
          PRODUCT_NAME: "5.0 GB - 30 days (SME2)",
          PRODUCT_AMOUNT: 1260,
        },

        {
          PRODUCT_CODE: "26",
          PRODUCT_ID: "211",
          PRODUCT_NAME: "5.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 1300,
        },

        {
          PRODUCT_CODE: "27",
          PRODUCT_ID: "213",
          PRODUCT_NAME: "10.0 GB - 30 days (SME)",
          PRODUCT_AMOUNT: 2570,
        },

        {
          PRODUCT_CODE: "28",
          PRODUCT_ID: "236",
          PRODUCT_NAME: "10.0 GB - 30 days (SME2)",
          PRODUCT_AMOUNT: 2520,
        },

        {
          PRODUCT_CODE: "30",
          PRODUCT_ID: "43",
          PRODUCT_NAME: "10.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 2600,
        },

        {
          PRODUCT_CODE: "31",
          PRODUCT_ID: "223",
          PRODUCT_NAME: "15.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 3900,
        },

        {
          PRODUCT_CODE: "32",
          PRODUCT_ID: "222",
          PRODUCT_NAME: "20.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 5200,
        },

        {
          PRODUCT_CODE: "33",
          PRODUCT_ID: "237",
          PRODUCT_NAME: "40.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 10320,
        },
      ],
    },
  ],
  Glo: [
    {
      ID: "02",
      PRODUCT: [
        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "225",
          PRODUCT_NAME: "200 MB - 14 days (CORPORATE)",
          PRODUCT_AMOUNT: 55,
        },

        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "203",
          PRODUCT_NAME: "500.0 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 132.5,
        },

        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "194",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 265,
        },

        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "195",
          PRODUCT_NAME: "2.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 530,
        },

        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "196",
          PRODUCT_NAME: "3.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 795,
        },

        {
          PRODUCT_CODE: "6",
          PRODUCT_ID: "197",
          PRODUCT_NAME: "5.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 1325,
        },

        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "200",
          PRODUCT_NAME: "10.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 2650,
        },
      ],
    },
  ],
  m_9mobile: [
    {
      ID: "03",
      PRODUCT: [
        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "221",
          PRODUCT_NAME: "500.0 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 80,
        },

        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "183",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 150,
        },

        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "184",
          PRODUCT_NAME: "1.5 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 227,
        },

        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "185",
          PRODUCT_NAME: "2 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 300,
        },

        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "186",
          PRODUCT_NAME: "3 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 450,
        },

        {
          PRODUCT_CODE: "6",
          PRODUCT_ID: "188",
          PRODUCT_NAME: "5 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 750,
        },

        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "189",
          PRODUCT_NAME: "10 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 1500,
        },

        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "229",
          PRODUCT_NAME: "20.0 GB - Monthly (CORPORATE)",
          PRODUCT_AMOUNT: 3000,
        },
      ],
    },
  ],
  Airtel: [
    {
      ID: "04",
      PRODUCT: [
        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "149",
          PRODUCT_NAME: "100.0 MB - 14 days (CORPORATE)",
          PRODUCT_AMOUNT: 55,
        },

        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "277",
          PRODUCT_NAME: "100 MB - Daily (SME)",
          PRODUCT_AMOUNT: 55,
        },

        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "193",
          PRODUCT_NAME: "300.0 MB - 14 days (CORPORATE)",
          PRODUCT_AMOUNT: 105,
        },

        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "278",
          PRODUCT_NAME: "300.0 MB - 2 days (SME)",
          PRODUCT_AMOUNT: 115,
        },

        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "165",
          PRODUCT_NAME: "500.0 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 136,
        },

        {
          PRODUCT_CODE: "6",
          PRODUCT_ID: "145",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 272,
        },

        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "279",
          PRODUCT_NAME: "1.0 GB - 2 days (SME)",
          PRODUCT_AMOUNT: 215,
        },

        {
          PRODUCT_CODE: "8",
          PRODUCT_ID: "293",
          PRODUCT_NAME: "1.0 GB - 7 days (SME)",
          PRODUCT_AMOUNT: 245,
        },

        {
          PRODUCT_CODE: "9",
          PRODUCT_ID: "294",
          PRODUCT_NAME: "1.5 GB - 7 days (SME)",
          PRODUCT_AMOUNT: 345,
        },

        {
          PRODUCT_CODE: "10",
          PRODUCT_ID: "296",
          PRODUCT_NAME: "2 GB - 14 days (SME)",
          PRODUCT_AMOUNT: 515,
        },

        {
          PRODUCT_CODE: "11",
          PRODUCT_ID: "146",
          PRODUCT_NAME: "2.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 515,
        },

        {
          PRODUCT_CODE: "12",
          PRODUCT_ID: "280",
          PRODUCT_NAME: "2.0 GB - 2 days (SME)",
          PRODUCT_AMOUNT: 315,
        },

        {
          PRODUCT_CODE: "13",
          PRODUCT_ID: "281",
          PRODUCT_NAME: "3.0 GB - 7 days (SME)",
          PRODUCT_AMOUNT: 515,
        },

        {
          PRODUCT_CODE: "14",
          PRODUCT_ID: "282",
          PRODUCT_NAME: "4.0 GB - Monthly (SME)",
          PRODUCT_AMOUNT: 1015,
        },

        {
          PRODUCT_CODE: "15",
          PRODUCT_ID: "147",
          PRODUCT_NAME: "5 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 1360,
        },

        {
          PRODUCT_CODE: "16",
          PRODUCT_ID: "295",
          PRODUCT_NAME: "5 GB - 14 days (CORPORATE)",
          PRODUCT_AMOUNT: 1150,
        },

        {
          PRODUCT_CODE: "17",
          PRODUCT_ID: "148",
          PRODUCT_NAME: "10 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 2720,
        },

        {
          PRODUCT_CODE: "18",
          PRODUCT_ID: "283",
          PRODUCT_NAME: "10 GB - Monthly (SME)",
          PRODUCT_AMOUNT: 2015,
        },

        {
          PRODUCT_CODE: "19",
          PRODUCT_ID: "284",
          PRODUCT_NAME: "15 GB - Monthly (SME)",
          PRODUCT_AMOUNT: 3015,
        },

        {
          PRODUCT_CODE: "20",
          PRODUCT_ID: "297",
          PRODUCT_NAME: "20 GB - 30 Days (SME)",
          PRODUCT_AMOUNT: 3500.0,
        },

        {
          PRODUCT_CODE: "21",
          PRODUCT_ID: "226",
          PRODUCT_NAME: "15.0 GB - 30 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 4080,
        },

        {
          PRODUCT_CODE: "22",
          PRODUCT_ID: "227",
          PRODUCT_NAME: "20.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 5440,
        },

        {
          PRODUCT_CODE: "23",
          PRODUCT_ID: "298",
          PRODUCT_NAME: "40 GB - 30 Days (SME)",
          PRODUCT_AMOUNT: 6000.0,
        },
      ],
    },
  ],
};

const dataPlans: DataPlans = {
  MTN: [
    {
      ID: "01",
      PRODUCT: [
        // {
        //   PRODUCT_CODE: "1",
        //   PRODUCT_ID: "260",
        //   PRODUCT_NAME: "150 MB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 50 ,
        // },

        // {
        //   PRODUCT_CODE: "1",
        //   PRODUCT_ID: "49",
        //   PRODUCT_NAME: "250 MB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 72.5 ,
        // },

        // {
        //   PRODUCT_CODE: "5",
        //   PRODUCT_ID: "214",
        //   PRODUCT_NAME: "500 MB - 30 days (SME)",
        //   PRODUCT_AMOUNT: 325,
        // },

        // {
        //   PRODUCT_CODE: "6",
        //   PRODUCT_ID: "259",
        //   PRODUCT_NAME: "500 MB - 30 days (SME2)",
        //   PRODUCT_AMOUNT: 126 ,
        // },

        // {
        //   PRODUCT_CODE: "5",
        //   PRODUCT_ID: "212",
        //   PRODUCT_NAME: "500 MB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 130 ,
        // },

        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "215",
          PRODUCT_NAME: "1 GB - 1 day (Gifting)",
          PRODUCT_AMOUNT: 350,
        },

        // {
        //   PRODUCT_CODE: "7",
        //   PRODUCT_ID: "7",
        //   PRODUCT_NAME: "1.0 GB - 30 days (SME)",
        //   PRODUCT_AMOUNT: 650,
        // },

        // {
        //   PRODUCT_CODE: "8",
        //   PRODUCT_ID: "231",
        //   PRODUCT_NAME: "1.0 GB - 30 days (SME2)",
        //   PRODUCT_AMOUNT: 278 ,
        // },

        {
          PRODUCT_CODE: "110",
          PRODUCT_ID: "305",
          PRODUCT_NAME: "1.5 GB - 1 day (GIFTING)",
          PRODUCT_AMOUNT: 400,
        },

        // {
        //   PRODUCT_CODE: "9",
        //   PRODUCT_ID: "8",
        //   PRODUCT_NAME: "2.0 GB - 30 days (SME)",
        //   PRODUCT_AMOUNT: 1300,
        // },

        // {
        //   PRODUCT_CODE: "11",
        //   PRODUCT_ID: "44",
        //   PRODUCT_NAME: "3.0 GB - 30 days (SME)",
        //   PRODUCT_AMOUNT: 1950,
        // },

        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "216",
          PRODUCT_NAME: "3.2 GB - 2 days (Gifting)",
          PRODUCT_AMOUNT: 1000,
        },

        // {
        //   PRODUCT_CODE: "10",
        //   PRODUCT_ID: "233",
        //   PRODUCT_NAME: "2.0 GB - 30 days (SME2)",
        //   PRODUCT_AMOUNT: 556,
        // },

        // {
        //   PRODUCT_CODE: "8",
        //   PRODUCT_ID: "208",
        //   PRODUCT_NAME: "1 GB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 282.0 ,
        // },

        // {
        //   PRODUCT_CODE: "9",
        //   PRODUCT_ID: "209",
        //   PRODUCT_NAME: "2 GB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 564.0,
        // },

        // {
        //   PRODUCT_CODE: "12",
        //   PRODUCT_ID: "234",
        //   PRODUCT_NAME: "3.0 GB - 30 days (SME2)",
        //   PRODUCT_AMOUNT: 834,
        // },

        // {
        //   PRODUCT_CODE: "11",
        //   PRODUCT_ID: "210",
        //   PRODUCT_NAME: "3 GB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 846.0,
        // },

        // {
        //   PRODUCT_CODE: "13",
        //   PRODUCT_ID: "291",
        //   PRODUCT_NAME: "5.0 GB - 30 days (SME)",
        //   PRODUCT_AMOUNT: 3250,
        // },

        // {
        //   PRODUCT_CODE: "14",
        //   PRODUCT_ID: "235",
        //   PRODUCT_NAME: "5.0 GB - 30 days (SME2)",
        //   PRODUCT_AMOUNT: 1390,
        // },

        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "217",
          PRODUCT_NAME: "5 GB - 7 days (Gifting)",
          PRODUCT_AMOUNT: 1500,
        },

        {
          PRODUCT_CODE: "18",
          PRODUCT_ID: "309",
          PRODUCT_NAME: "7 GB - 7 days (GIFTING)",
          PRODUCT_AMOUNT: 3000,
        },

        // {
        //   PRODUCT_CODE: "13",
        //   PRODUCT_ID: "211",
        //   PRODUCT_NAME: "5.0 GB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 1410.0,
        // },

        // {
        //   PRODUCT_CODE: "15",
        //   PRODUCT_ID: "213",
        //   PRODUCT_NAME: "10.0 GB - 30 days (SME)",
        //   PRODUCT_AMOUNT: 6500,
        // },

        {
          PRODUCT_CODE: "16",
          PRODUCT_ID: "306",
          PRODUCT_NAME: "75 GB - 30 days (GIFTING)",
          PRODUCT_AMOUNT: 20000,
        },

        {
          PRODUCT_CODE: "17",
          PRODUCT_ID: "307",
          PRODUCT_NAME: "200 GB - 60 days (GIFTING)",
          PRODUCT_AMOUNT: 49600,
        },

        // {
        //   PRODUCT_CODE: "16",
        //   PRODUCT_ID: "236",
        //   PRODUCT_NAME: "10.0 GB - 30 days (SME2)",
        //   PRODUCT_AMOUNT: 2780,
        // },

        // {
        //   PRODUCT_CODE: "15",
        //   PRODUCT_ID: "43",
        //   PRODUCT_NAME: "10.0 GB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 3520.0,
        // },

        // {
        //   PRODUCT_CODE: "31",
        //   PRODUCT_ID: "223",
        //   PRODUCT_NAME: "15.0 GB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 3900,
        // },

        // {
        //   PRODUCT_CODE: "32",
        //   PRODUCT_ID: "222",
        //   PRODUCT_NAME: "20.0 GB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 5200,
        // },

        // {
        //   PRODUCT_CODE: "33",
        //   PRODUCT_ID: "237",
        //   PRODUCT_NAME: "40.0 GB - 30 days (CORPORATE)",
        //   PRODUCT_AMOUNT: 10320,
        // },
      ],
    },
  ],
  Glo: [
    {
      ID: "02",
      PRODUCT: [
        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "225",
          PRODUCT_NAME: "200 MB - 14 days (CORPORATE)",
          PRODUCT_AMOUNT: 84.0,
        },

        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "203",
          PRODUCT_NAME: "500.0 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 210,
        },

        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "194",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 420,
        },

        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "286",
          PRODUCT_NAME: "750 MB - 1 day (SME)",
          PRODUCT_AMOUNT: 187.0,
        },

        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "195",
          PRODUCT_NAME: "2.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 840,
        },

        {
          PRODUCT_CODE: "6",
          PRODUCT_ID: "288",
          PRODUCT_NAME: "1.5 GB - 2 days (SME)",
          PRODUCT_AMOUNT: 280.0,
        },

        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "196",
          PRODUCT_NAME: "3.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 1260,
        },
        {
          PRODUCT_CODE: "8",
          PRODUCT_ID: "289",
          PRODUCT_NAME: "2.5 GB - 2 days (SME)",
          PRODUCT_AMOUNT: 468.0,
        },

        {
          PRODUCT_CODE: "9",
          PRODUCT_ID: "197",
          PRODUCT_NAME: "5.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 2100,
        },

        {
          PRODUCT_CODE: "10",
          PRODUCT_ID: "200",
          PRODUCT_NAME: "10.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 4200,
        },

        {
          PRODUCT_CODE: "11",
          PRODUCT_ID: "290",
          PRODUCT_NAME: "10.0 GB - 7 days (SME)",
          PRODUCT_AMOUNT: 1875,
        },
      ],
    },
  ],
  m_9mobile: [
    {
      ID: "03",
      PRODUCT: [
        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "221",
          PRODUCT_NAME: "500.0 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 80,
        },

        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "183",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 150,
        },

        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "184",
          PRODUCT_NAME: "1.5 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 227,
        },

        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "185",
          PRODUCT_NAME: "2 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 300,
        },

        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "186",
          PRODUCT_NAME: "3 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 450,
        },

        {
          PRODUCT_CODE: "6",
          PRODUCT_ID: "188",
          PRODUCT_NAME: "5 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 750,
        },

        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "189",
          PRODUCT_NAME: "10 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 1500,
        },

        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "229",
          PRODUCT_NAME: "20.0 GB - Monthly (CORPORATE)",
          PRODUCT_AMOUNT: 3000,
        },
      ],
    },
  ],
  Airtel: [
    {
      ID: "04",
      PRODUCT: [
        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "310",
          PRODUCT_NAME: "150 MB - 1 day (AWOOF)",
          PRODUCT_AMOUNT: 58,
        },

        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "308",
          PRODUCT_NAME: "100.0 MB - days days (CORPORATE)",
          PRODUCT_AMOUNT: 60,
        },

        // {
        //   PRODUCT_CODE: "2",
        //   PRODUCT_ID: "277",
        //   PRODUCT_NAME: "100 MB - Daily (SME)",
        //   PRODUCT_AMOUNT: 55 ,
        // },

        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "311",
          PRODUCT_NAME: "300 MB - 2 days (AWOOF)",
          PRODUCT_AMOUNT: 115,
        },

        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "193",
          PRODUCT_NAME: "300.0 MB - 14 days (CORPORATE)",
          PRODUCT_AMOUNT: 180,
        },

        // {
        //   PRODUCT_CODE: "4",
        //   PRODUCT_ID: "278",
        //   PRODUCT_NAME: "300.0 MB - 2 days (SME)",
        //   PRODUCT_AMOUNT: 115 ,
        // },

        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "165",
          PRODUCT_NAME: "500.0 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 295,
        },

        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "312",
          PRODUCT_NAME: "600 MB - 1 day (AWOOF)",
          PRODUCT_AMOUNT: 245,
        },

        // {
        //   PRODUCT_CODE: "7",
        //   PRODUCT_ID: "279",
        //   PRODUCT_NAME: "1.0 GB - 2 days (SME)",
        //   PRODUCT_AMOUNT: 215 ,
        // },

        // {
        //   PRODUCT_CODE: "6",
        //   PRODUCT_ID: "299",
        //   PRODUCT_NAME: "75MB - 7 days (SME)",
        //   PRODUCT_AMOUNT: 25 ,
        // },

        // {
        //   PRODUCT_CODE: "7",
        //   PRODUCT_ID: "300",
        //   PRODUCT_NAME: "250MB - 14 days (SME)",
        //   PRODUCT_AMOUNT: 60 ,
        // },

        // {
        //   PRODUCT_CODE: "8",
        //   PRODUCT_ID: "301",
        //   PRODUCT_NAME: "500MB - 7 days (SME)",
        //   PRODUCT_AMOUNT: 122.5 ,
        // },

        {
          PRODUCT_CODE: "9",
          PRODUCT_ID: "145",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 590,
        },

        // {
        //   PRODUCT_CODE: "10",
        //   PRODUCT_ID: "302",
        //   PRODUCT_NAME: "1.0 GB - 2 days (SME)",
        //   PRODUCT_AMOUNT: 215 ,
        // },

        // {
        //   PRODUCT_CODE: "11",
        //   PRODUCT_ID: "293",
        //   PRODUCT_NAME: "1.0 GB - 7 days (SME)",
        //   PRODUCT_AMOUNT: 245 ,
        // },

        // {
        //   PRODUCT_CODE: "12",
        //   PRODUCT_ID: "294",
        //   PRODUCT_NAME: "1.5 GB - 7 days (SME)",
        //   PRODUCT_AMOUNT: 345,
        // },

        // {
        //   PRODUCT_CODE: "11",
        //   PRODUCT_ID: "296",
        //   PRODUCT_NAME: "2 GB - 14 days (SME)",
        //   PRODUCT_AMOUNT: 515,
        // },

        {
          PRODUCT_CODE: "13",
          PRODUCT_ID: "314",
          PRODUCT_NAME: "2.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 1180,
        },

        {
          PRODUCT_CODE: "14",
          PRODUCT_ID: "313",
          PRODUCT_NAME: "3GB - 7 days (AWOOF)",
          PRODUCT_AMOUNT: 1045,
        },

        // {
        //   PRODUCT_CODE: "14",
        //   PRODUCT_ID: "280",
        //   PRODUCT_NAME: "2.0 GB - 2 days (SME)",
        //   PRODUCT_AMOUNT: 315 ,
        // },

        // {
        //   PRODUCT_CODE: "15",
        //   PRODUCT_ID: "281",
        //   PRODUCT_NAME: "3.0 GB - 7 days (SME)",
        //   PRODUCT_AMOUNT: 515,
        // },

        // {
        //   PRODUCT_CODE: "16",
        //   PRODUCT_ID: "282",
        //   PRODUCT_NAME: "4.0 GB - Monthly (SME)",
        //   PRODUCT_AMOUNT: 1015,
        // },

        {
          PRODUCT_CODE: "17",
          PRODUCT_ID: "147",
          PRODUCT_NAME: "5 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 2950,
        },

        // {
        //   PRODUCT_CODE: "18",
        //   PRODUCT_ID: "295",
        //   PRODUCT_NAME: "5 GB - 14 days (SME)",
        //   PRODUCT_AMOUNT: 1150,
        // },

        // {
        //   PRODUCT_CODE: "21",
        //   PRODUCT_ID: "304",
        //   PRODUCT_NAME: "7 GB - 7 days (SME)",
        //   PRODUCT_AMOUNT: 2050.0,
        // },

        {
          PRODUCT_CODE: "21",
          PRODUCT_ID: "304",
          PRODUCT_NAME: "7GB - 7 days (AWOOF)",
          PRODUCT_AMOUNT: 2045,
        },

        {
          PRODUCT_CODE: "19",
          PRODUCT_ID: "148",
          PRODUCT_NAME: "10 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 5900,
        },

        {
          PRODUCT_CODE: "20",
          PRODUCT_ID: "283",
          PRODUCT_NAME: "10 GB - 30 Days (AWOOF)",
          PRODUCT_AMOUNT: 3045,
        },

        // {
        //   PRODUCT_CODE: "21",
        //   PRODUCT_ID: "284",
        //   PRODUCT_NAME: "15 GB - Monthly (SME)",
        //   PRODUCT_AMOUNT: 3015,
        // },

        // {
        //   PRODUCT_CODE: "22",
        //   PRODUCT_ID: "297",
        //   PRODUCT_NAME: "20 GB - 30 Days (SME)",
        //   PRODUCT_AMOUNT: 3500.0,
        // },

        {
          PRODUCT_CODE: "23",
          PRODUCT_ID: "226",
          PRODUCT_NAME: "15.0 GB - 30 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 8850,
        },

        {
          PRODUCT_CODE: "24",
          PRODUCT_ID: "227",
          PRODUCT_NAME: "20.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 11800,
        },

        // {
        //   PRODUCT_CODE: "25",
        //   PRODUCT_ID: "298",
        //   PRODUCT_NAME: "40 GB - 30 Days (SME)",
        //   PRODUCT_AMOUNT: 6000.0,
        // },
      ],
    },
  ],
};

// ssss

export default dataPlans;
