import { createContext, useEffect, useState } from "react";
import API from "../api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await API.get("/users/getsession");
        if (data.length > 0) {
          setUser(data[0]);
        }
      } catch (error) {
        console.error("Error loading session:", error);
      }
    };
    fetchSession();
  }, []);

  // 🔑 login = sirf state set karega
  const login = (sessionData) => {
    setUser(sessionData);
  };

  // 🚪 logout
  const logout = async () => {
    try {
      const { data } = await API.get("/users/getsession");
      if (data.length > 0) {
        await API.post(`/users/logout/${data[0].id}`);
      }
      setUser(null);
    } catch (error) {
      console.error("Logout session error:", error);
    }
  };

  // const [user, setUser] = useState();

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     try {
  //       const { data } = await Api.get("/session");
  //       if (data.length > 0) {
  //         setUser(data[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error loading session:", error);
  //     }
  //   };
  //   fetchSession();
  // }, []);

  // const login = async (userData) => {
  //   try {
  //     const { data: existingSession } = await Api.get("/session");

  //     if (existingSession.length > 0) {
  //       await Api.delete(`/session/${existingSession[0].id}`);
  //     }

  //     const { data: newSession } = await Api.post("/session", {
  //       name: userData.name,
  //       email: userData.email,
  //     });

  //     setUser(newSession); // 🔥 IMPORTANT
  //   } catch (error) {
  //     console.error("Login session error:", error);
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     const { data: existingSession } = await Api.get("/session");
  //     if (existingSession.length > 0) {
  //       await Api.delete(`/session/${existingSession[0].id}`);
  //     }
  //     setUser(null);
  //   } catch (error) {
  //     console.error("Logout session error:", error);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
