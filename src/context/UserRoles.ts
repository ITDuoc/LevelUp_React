export const ROLES = {
  CLIENTE: "cliente",
  ADMIN: "administrador",
  VENDEDOR: "vendedor",
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];
