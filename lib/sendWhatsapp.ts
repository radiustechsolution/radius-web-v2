// lib/api.js
export const sendWhatsappMessage = async (message: any) => {
  try {
    const response = await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=2348168208565&text=${message}&apikey=1854137`,
      {
        method: "GET",
      }
    );

    // const data = await response.json();

    if (!response.ok) {
      console.log(response);
      return console.log("Error sending whatsapp message");
    }

    return;
  } catch (error) {
    console.error("Whatsapp message sending failed:", error);
    throw error;
  }
};
