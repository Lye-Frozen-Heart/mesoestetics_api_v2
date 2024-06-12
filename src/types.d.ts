export type Tag = "Red" | "Blue" | "Green" | "Yellow";
export type Role = "Admin" | "Regular";
export enum RoleEnum {
  Admin = "Admin",
  Regular = "Regular",
}
export type Status =
  | "Cancelled"
  | "Hidden"
  | "Accepted"
  | "Seen"
  | "Resolved"
  | "OnAir";
export enum StatusEnum {
  "Cancelled",
  "Hidden",
  "Accepted",
  "Seen",
  "Resolved",
  "OnAir",
}
export interface Post {
  id: string | null;
  title: string;
  description: string;
  images: string[];
  tags: Tag[];
  created_at: Date;
  status: Status;
  likes: Number;
  user: string;
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
  description: string;
  points_needed: number;
  type: string;
  created_at: Date;
}
