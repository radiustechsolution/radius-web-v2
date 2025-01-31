// context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // for cookies if needed
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

// Define the type for the user object
interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  // Add other properties as needed
}

// Define the context value type
interface UserContextType {
  user: User | null;
  updateUser: (newData: Partial<User>) => void;
  logout: () => void;
}

// Create UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// UserProvider component to wrap the app
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data from the server or localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Fetch user data from the server if not found locally
          const response = await axios.get(
            "https://appapi.radiustech.com.ng/api/user",
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                Accept: "application/json",
              },
            }
          ); // Replace with your user endpoint
          setUser(response.data);

          // Save to localStorage for persistence
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to update user data globally and locally
  const updateUser = (newData: Partial<User>) => {
    const updatedUser: any = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Function to clear user data on logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    Cookies.remove("token"); // Remove authentication cookies if needed
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
