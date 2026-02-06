export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
