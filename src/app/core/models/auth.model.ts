import { UserRole } from "@app/shared/enums/user-role.enum";

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role?: UserRole
  ipAddress?: string;
  lastLogin?: string;
}

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  // user: User;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role?: UserRole;
};
