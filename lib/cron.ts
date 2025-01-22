// /lib/cron.ts
import cron from "node-cron";

// Function to refresh the token (your existing refresh logic)
async function refreshToken() {
  try {
    const response = await fetch("https://api.safehavenmfb.com/oauth2/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_assertion_type:
          "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_id: process.env.HavenOAuthClientID,
        client_assertion: process.env.HavenClientAAssertion,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Token refreshed successfully:", data.access_token);
      // Save the token somewhere (e.g., a database or in-memory store)
    } else {
      console.error("Error refreshing token:", data.error);
    }
  } catch (error) {
    console.error("Error during token refresh:", error);
  }
}

// Schedule token refresh to run every 15 minutes (for example)
cron.schedule("* * * * *", () => {
  console.log("Running a token refresh job every 1 minute");
  refreshToken();
});
