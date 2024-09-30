import { useState, useEffect } from "react";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

interface AuthState {
  token: string;
  role: string;
  userName: string;
  email: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState | null>(() => {
    const storedAuthState = localStorage.getItem("authState");
    return storedAuthState ? JSON.parse(storedAuthState) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser({ email, password });
      console.log(data);
      setAuthState(data);
      localStorage.setItem("authState", JSON.stringify(data));
      setLoading(false);
      navigate("/home");
    } catch (err: unknown) {
      setError(err as string);
    }
  };

  const logout = () => {
    setAuthState(null);
    localStorage.removeItem("authState");
    navigate("/login");
  };

  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  return { authState, login, logout, loading, error };
};
