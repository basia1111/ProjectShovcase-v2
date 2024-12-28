"use client";

import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { getSession } from "next-auth/react";
import { User } from "@types";
import { findUser } from "@lib/user/findUser";

type UserContextType = {
  user: User | null;
  updateUser: (newUser: Partial<User>) => void;
  fetchUser: () => Promise<void>;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateUser = (newUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...newUser } : ({ ...newUser } as User)));
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const session = await getSession();
      if (session?.user?.email) {
        const currentUser = await findUser(session.user.email);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user session:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, updateUser, fetchUser, isLoading }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
