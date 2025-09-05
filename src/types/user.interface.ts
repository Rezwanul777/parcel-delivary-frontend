export type UserRole = 'admin' | 'sender' | 'receiver';

export interface IUser {
   _id ?: string
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked?: boolean;
  createdAt?: string ;
}