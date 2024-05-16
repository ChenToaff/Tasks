import React, { createContext, useState } from "react";
import IPerson from "@interfaces/IPerson";

export interface UserContextType {
  user: IPerson | null;
  setUser: React.Dispatch<React.SetStateAction<IPerson | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IPerson | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
