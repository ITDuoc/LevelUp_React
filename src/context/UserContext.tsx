import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Interfaces
export interface UserData {
  idUsuario: number;
  correo: string;
  rol: string;
}

export interface UserContextType {
  user: UserData | null;
  setUser: (u: UserData | null) => void;
  token: string | null;
  login: (token: string, idUsuario: number, correo: string, rol?: string) => void;
  logout: () => void;
}

// Contexto
export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de un UserProvider");
  return ctx;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // LOGIN
  const login = (
    tokenValue: string,
    idUsuario: number,
    correo: string,
    rol: string = "cliente"
  ) => {
    const userData = { idUsuario, correo, rol };

    setUser(userData);
    setToken(tokenValue);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
  };

  // LOGOUT GLOBAL
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    
    window.location.replace("/");
  };

  // Rehidratar sesion
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Sincronizar logout entre pestañas
  useEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue === null) {
        setUser(null);
        setToken(null);
        window.location.replace("/");
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  
  useEffect(() => {
    if (!user) return;
    if (!user.correo) return;
    if (user.idUsuario && user.idUsuario !== 0) return;

    async function fetchUsuarioPorCorreo() {
      try {
        const res = await fetch(
          `http://localhost:8082/usuario/correo/${user!.correo}`
        );

        if (!res.ok) throw new Error("No se encontró usuario por correo");

        const data = await res.json();

        setUser(prev =>
          prev
            ? {
                ...prev,
                idUsuario: data.idUsuario,
                rol: data.roles?.[0]?.nomRol ?? prev.rol,
              }
            : prev
        );
      } catch (err) {
        console.error("Error obteniendo usuario por correo:", err);
      }
    }

    fetchUsuarioPorCorreo();
  }, [user?.correo]);

  return (
    <UserContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
