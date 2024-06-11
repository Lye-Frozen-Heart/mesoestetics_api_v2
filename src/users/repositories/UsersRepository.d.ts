import { User } from "../../types";

export interface UsersRepository {
  getAllUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User | null>;
  addUser: (User: User) => Promise<User | null>;
  updateUser: (id: string, user: User) => Promise<User | null>;
  removeUser: (id: string) => Promise<string | null>;
}
