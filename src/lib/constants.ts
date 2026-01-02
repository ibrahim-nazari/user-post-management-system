export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const ITEMS_PER_PAGE = 10;

export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;
