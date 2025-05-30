// /pages/api/identity.ts
import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const adminUser = await prisma.user.findUnique({
      where: {
        id: 232, // Specify the admin ID or adjust based on your logic
      },
    });

    const clientID = adminUser?.password;

    if (!clientID) {
      // Handle missing ClientID error
      res.status(400).json({ error: "Missing ClientID" });
      return;
    }

    const response = await fetch("https://api.safehavenmfb.com/identity/v2", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminUser.pin} `,
        ClientID: clientID, // Safely use clientID here
      },
      body: JSON.stringify({
        type: "NIN", // National Identification Number
        async: true, // Boolean flag for asynchronous operation
        number: "89761065476", // NIN number, adjust accordingly
        debitAccountNumber: "0118558637", // Account number to debit
        provider: "creditRegistry", // Provider name
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      // Handle errors from the response
      res.status(response.status).json({ error: data });
      return;
    }

    console.log(data);

    // Send back the response data
    res.status(200).json(data);
  } catch (error) {
    console.error("Error making identity API call:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// {
//   "eventData": {
//     "product": {
//       "reference": "VA-3-1737552130536",
//       "type": "RESERVED_ACCOUNT"
//     },
//     "transactionReference": "MNFY|80|20250122142412|591092",
//     "paymentReference": "MNFY|80|20250122142412|591092",
//     "paidOn": "2025-01-22 14:24:12.119",
//     "paymentDescription": "Olu",
//     "metaData": {},
//     "paymentSourceInformation": [
//       {
//         "bankCode": "011",
//         "amountPaid": 10,
//         "accountName": "OLUDOWOLE OLUMIDE JOHN",
//         "sessionId": "000016250122142407000029230629",
//         "accountNumber": "3137741361"
//       }
//     ],
//     "destinationAccountInformation": {
//       "bankCode": "50515",
//       "bankName": "Moniepoint Microfinance Bank",
//       "accountNumber": "6935853367"
//     },
//     "amountPaid": 10,
//     "totalPayable": 10,
//     "cardDetails": {},
//     "paymentMethod": "ACCOUNT_TRANSFER",
//     "currency": "NGN",
//     "settlementAmount": "9.84",
//     "paymentStatus": "PAID",
//     "customer": {
//       "name": "Olumide Mide",
//       "email": "radiustechsolution@gmail.com"
//     }
//   },

// }
