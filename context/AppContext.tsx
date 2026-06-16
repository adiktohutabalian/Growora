"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "@/lib/types";

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeConversation: string | null;
  setActiveConversation: (id: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/** Transform DB user (with Prisma relations) → frontend User type */
function toFrontendUser(dbUser: any): User {
  return {
    id: dbUser.id,
    fullName: dbUser.fullName,
    username: dbUser.username,
    email: dbUser.email,
    avatar: dbUser.avatar || "/avatars/default.jpg",
    bio: dbUser.bio || "",
    location: dbUser.location || "",
    skillsTeach: (dbUser.skillsTeach || []).map((us: any) => ({
      skill: us.skill,
      level: us.level,
      description: us.description || undefined,
    })),
    skillsLearn: (dbUser.skillsLearn || []).map((ds: any) => ds.skill),
    portfolio: (dbUser.portfolio || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      type: p.type,
      url: p.url,
      thumbnail: p.thumbnail || undefined,
    })),
    availability: JSON.parse(dbUser.availability || "[]"),
    growthLevel: dbUser.growthLevel,
    completedSwaps: dbUser.completedSwaps,
    rating: dbUser.rating,
    reviewCount: dbUser.reviewCount,
    joinedDate: dbUser.createdAt,
  };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("growora_user");
    if (savedUsername) {
      fetch(`/api/users/${savedUsername}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("User not found");
        })
        .then((data) => {
          setUser(toFrontendUser(data));
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("growora_user");
          setUser(null);
          setIsAuthenticated(false);
        });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const { user: dbUser } = await res.json();
      const frontendUser = toFrontendUser(dbUser);
      setUser(frontendUser);
      setIsAuthenticated(true);
      localStorage.setItem("growora_user", frontendUser.username);
      return true;
    } catch {
      return false;
    }
  }, []);

  const register = useCallback(
    async (data: {
      fullName: string;
      username: string;
      email: string;
      password: string;
      bio?: string;
    }) => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) return false;

        const { user: dbUser } = await res.json();
        const frontendUser = toFrontendUser(dbUser);
        setUser(frontendUser);
        setIsAuthenticated(true);
        localStorage.setItem("growora_user", frontendUser.username);
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setMobileMenuOpen(false);
    setActiveConversation(null);
    localStorage.removeItem("growora_user");
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        isMobileMenuOpen,
        setMobileMenuOpen,
        activeConversation,
        setActiveConversation,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
