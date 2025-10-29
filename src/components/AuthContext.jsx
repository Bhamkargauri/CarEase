import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/session");
        if (data.length > 0) {
          setUser(data[0]);
        }
      } catch (error) {
        console.error("Error loading session:", error);
      }
    };
    fetchSession();
  }, []);

  const login = async (userData) => {
    try {
      // object
      // console.log("User Data = ", userData);
      const { data: existingSession } = await axios.get(
        "http://localhost:3001/session"
      );

      // array of object
      // console.log("Existing Session = ", existingSession);

      if (existingSession.length > 0) {
        await axios.delete(
          `http://localhost:3001/session/${existingSession[0].id}`
        );
      }

      await axios.post("http://localhost:3001/session", userData);
      setUser(userData);
    } catch (error) {
      console.error("Login session error:", error);
    }
  };

  const logout = async () => {
    try {
      const { data: existingSession } = await axios.get(
        "http://localhost:3001/session"
      );
      if (existingSession.length > 0) {
        await axios.delete(
          `http://localhost:3001/session/${existingSession[0].id}`
        );
      }
      setUser(null);
    } catch (error) {
      console.error("Logout session error:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
