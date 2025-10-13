import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppUser } from "@/lib/api/auth";
import { loadUserFromStorage, persistUser } from "@/lib/api/auth";

interface AuthContextValue {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<AppUser | null>(null);

  useEffect(() => {
    const stored = loadUserFromStorage();
    if (stored) {
      setUserState(stored);
    }
  }, []);

  const setUser = useCallback((authUser: AppUser | null) => {
    setUserState(authUser);
    persistUser(authUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [user, setUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
