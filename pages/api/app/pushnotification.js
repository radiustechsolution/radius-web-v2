const fetch = require("node-fetch");

const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "New Message!",
    body: "This is a test push notification",
    data: { extraData: "Some extra data" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

// Call this function with a valid Expo push token
sendPushNotification("ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]");
