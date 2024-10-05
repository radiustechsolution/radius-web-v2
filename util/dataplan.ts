// dataPlans.ts

export interface Product {
  PRODUCT_CODE: string;
  PRODUCT_ID: string;
  PRODUCT_NAME: string;
  PRODUCT_AMOUNT: number | string; // Assuming amounts can be either number or string
}

export interface Provider {
  ID: string;
  PRODUCT: Product[];
}

export interface DataPlans {
  [key: string]: Provider[]; // Provider name (like "MTN") mapped to an array of Providers
}

const dataPlans: DataPlans = {
  MTN: [
    {
      ID: "01",
      PRODUCT: [
        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "260",
          PRODUCT_NAME: "150 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 80,
        }, // 50 + 30
        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "49",
          PRODUCT_NAME: "250 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 92.5,
        }, // 72.5 + 20
        {
          PRODUCT_CODE: "40",
          PRODUCT_ID: "215",
          PRODUCT_NAME: "1 GB - 1 day (Gifting)",
          PRODUCT_AMOUNT: 230,
        }, // 220 + 10
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
          PRODUCT_AMOUNT: 143.5,
        }, // 128.5 + 15
        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "259",
          PRODUCT_NAME: "500 MB - 30 days (SME2)",
          PRODUCT_AMOUNT: 141,
        }, // 126 + 15
        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "212",
          PRODUCT_NAME: "500 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 143,
        }, // 130 + 13
        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "7",
          PRODUCT_NAME: "1.0 GB - 30 days (SME)",
          PRODUCT_AMOUNT: 262,
        }, // 257 + 5
        {
          PRODUCT_CODE: "43",
          PRODUCT_ID: "231",
          PRODUCT_NAME: "1.0 GB - 30 days (SME2)",
          PRODUCT_AMOUNT: 259,
        }, // 252 + 7
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
          PRODUCT_NAME: "2 GB - 30 days (CORPORATE)",
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
          PRODUCT_NAME: "3 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 780,
        },
        {
          PRODUCT_CODE: "23",
          PRODUCT_ID: "11",
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
          PRODUCT_AMOUNT: 80,
        }, // 55 + 25
        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "203",
          PRODUCT_NAME: "500.0 MB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 145.5,
        }, // 132.5 + 13
        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "194",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 270,
        }, // 265 + 5
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
          PRODUCT_AMOUNT: 110,
        }, // 80 + 30
        {
          PRODUCT_CODE: "1",
          PRODUCT_ID: "183",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 180,
        }, // 150 + 30
        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "184",
          PRODUCT_NAME: "1.5 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 257,
        }, // 227 + 30
        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "185",
          PRODUCT_NAME: "2 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 350,
        }, // 300 + 50
        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "186",
          PRODUCT_NAME: "3 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 480,
        }, // 450 + 30
        {
          PRODUCT_CODE: "6",
          PRODUCT_ID: "188",
          PRODUCT_NAME: "5 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 800,
        }, // 750 + 50
        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "189",
          PRODUCT_NAME: "10 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 1550,
        }, // 1500 + 50
        {
          PRODUCT_CODE: "7",
          PRODUCT_ID: "229",
          PRODUCT_NAME: "20.0 GB - Monthly (CORPORATE)",
          PRODUCT_AMOUNT: 3050,
        }, // 3000 + 50
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
          PRODUCT_AMOUNT: 80,
        }, // 55 + 25
        {
          PRODUCT_CODE: "10",
          PRODUCT_ID: "277",
          PRODUCT_NAME: "100 MB - Daily (SME)",
          PRODUCT_AMOUNT: 80,
        }, // 55 + 25
        {
          PRODUCT_CODE: "2",
          PRODUCT_ID: "193",
          PRODUCT_NAME: "300.0 MB - 14 days (CORPORATE)",
          PRODUCT_AMOUNT: 120,
        }, // 105 + 15
        {
          PRODUCT_CODE: "11",
          PRODUCT_ID: "278",
          PRODUCT_NAME: "300.0 MB - 2 days (SME)",
          PRODUCT_AMOUNT: 120,
        }, // 105 + 15
        {
          PRODUCT_CODE: "3",
          PRODUCT_ID: "200",
          PRODUCT_NAME: "1.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 250,
        }, // 250
        {
          PRODUCT_CODE: "12",
          PRODUCT_ID: "279",
          PRODUCT_NAME: "1.0 GB - 1 day (SME)",
          PRODUCT_AMOUNT: 250,
        },
        {
          PRODUCT_CODE: "4",
          PRODUCT_ID: "201",
          PRODUCT_NAME: "3.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 450,
        }, // 450
        {
          PRODUCT_CODE: "5",
          PRODUCT_ID: "202",
          PRODUCT_NAME: "5.0 GB - 30 days (CORPORATE)",
          PRODUCT_AMOUNT: 800,
        }, // 800
      ],
    },
  ],
};

export default dataPlans;
