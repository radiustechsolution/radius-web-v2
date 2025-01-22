// /components/YourComponent.tsx
import React, { useEffect, useState } from "react";

const YourComponent: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      const response = await fetch("/api/safeheaventoken");
      const data = await response.json();
      if (response.ok) {
        setToken(data.access_token);
      } else {
        console.error("Error fetching token:", data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchToken(); // Fetch the token when the component mounts
  }, []);

  return (
    <div>
      <h1>OAuth Token</h1>
      {token ? <p>Token: {token}</p> : <p>Loading...</p>}
    </div>
  );
};

export default YourComponent;
