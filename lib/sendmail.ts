// lib/api.js
export const sendEmail = async (mail_to: any, message: any, subject: any) => {
  try {
    // const response = await fetch(
    //   `https://nulgen.aortadev.website/v1/sendemail?mail_to=${mail_to}&message=${message}&subject=${subject}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );

    // const data = await response.json();

    // if (!response.ok) {
    //   throw new Error(data.message || "Something went wrong");
    // }

    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};
