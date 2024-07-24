export type Role = "Admin" | "Regular";
export enum RoleEnum {
  Admin = "Admin",
  Regular = "Regular",
}
export type Status =
  | "Cancelled"
  | "Plan"
  | "Do"
  | "Check"
  | "Act";
export enum StatusEnum {
  "Cancelled",
  "Plan",
  "Do",
  "Check",
  "Act",
}
export interface Post {
  id: string | null;
  title: string;
  problem_description: string;
  solution_description: string;
  images: string[];
  tags: string[];
  created_at: Date;
  status: Status;
  likes: string[];
  user: string;
  rooms: string[];
}
export interface User {
  id: string | null;
  username: string;
  password: string;
  email: string;
  created_at: Date;
  points: number;
  liked_posts: string[];
  role: Role;
}
export interface Reward {
  id: string | null;
  reward_title: string;
  image: string;
  description: string;
  points_needed: number;
  type: string;
  created_at: Date;
}
