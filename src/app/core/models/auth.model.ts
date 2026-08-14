import { UserRole } from "@app/shared/enums/user-role.enum";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  ipAddress?: string;
  lastLogin?: string;
  createdAt?: string;
  phone?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
}

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};
