import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { UserRole } from "./UserRoles";

export interface User {
  nombre: string;
  correo: string;
  rol: UserRole;
}

interface UserContextType {
  user: User | null;
  login: (usuario: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (usuario: User) => {
    setUser(usuario);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de UserProvider");
  return context;
};
