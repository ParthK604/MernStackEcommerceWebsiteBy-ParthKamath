import { createContext, useContext, useEffect, useState } from "react";
const API = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API}/api/auth/me`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checkAuth, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
