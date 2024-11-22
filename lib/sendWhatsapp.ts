// lib/api.js
export const sendWhatsappMessage = async (message: any) => {
  try {
    const response = await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=2348168208565&text=${message}&apikey=1854137`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("Whatsapp message sending failed:", error);
    throw error;
  }
};
