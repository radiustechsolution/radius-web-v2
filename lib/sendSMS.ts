// lib/api.js

interface Types {
  message: string;
  to: string;
}

export const sendSMS = async (message: string, to: string) => {
  try {
    const response = await fetch(`https://api.sendchamp.com/api/v1/sms/send`, {
      method: "POST",
      body: JSON.stringify({
        to: to,
        message: message,
        sender_name: "Radius",
        route: "dnd",
      }),
      headers: {
        Authorization:
          "Bearer sendchamp_live_$2a$10$mgrjJ4BXYDb8dQlNA/ymoO.dghT3RfVwTdOO79ab8RnGSyhAwEXYi",
        Accept: "application/json",
        ContentType: "application/json",
      },
    });

    if (!response.ok) {
      console.log(response);
      return console.log("Error sending sms");
    }

    return;
  } catch (error) {
    console.error("SMS message sending failed:", error);
    throw error;
  }
};
