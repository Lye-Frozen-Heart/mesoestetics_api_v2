import { User } from "../../types";

export interface UsersRepository {
  getAllUsers: () => Promise<User[]>;
  login: (userContent: User) => Promise<Object | null>;
  register: (userContent: User) => Promise<User | null>;
  updateUser: (id: string, user: User) => Promise<User | null>;
  removeUser: (id: string) => Promise<string | null>;
  getUser: (id: string) => Promise<User | null>;
}
