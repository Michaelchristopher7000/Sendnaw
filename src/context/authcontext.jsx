import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const login = (userData, sessionToken) => {
    setUser(userData);
    setToken(sessionToken);
    localStorage.setItem("token", sessionToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // Single function to fetch user data from token
  const fetchUser = useCallback(async (authToken) => {
    try {
      const res = await fetch(
        "https://sendnawbackend.onrender.com/api/auth/get_user.php",
        {
          headers: { Authorization: `Bearer ${authToken}` },
        },
      );
      if (!res.ok) return null;
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("JSON parse error:", text);
        return null;
      }
      if (data && data.status === "success" && data.data) {
        return data.data;
      }
      return null;
    } catch (err) {
      console.error("Fetch user failed:", err);
      return null;
    }
  }, []);

  const loadUser = useCallback(
    async (authToken) => {
      const userData = await fetchUser(authToken);
      if (userData) {
        setUser(userData);
      } else {
        logout();
      }
      setLoading(false);
    },
    [fetchUser],
  );

  const refreshUser = useCallback(async () => {
    if (!token) return;
    const userData = await fetchUser(token);
    if (userData) {
      setUser(userData);
    } else {
      logout();
    }
  }, [token, fetchUser]);

  useEffect(() => {
    if (token) {
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, [token, loadUser]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
