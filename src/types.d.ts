export type Tag = "Red" | "Blue" | "Green" | "Yellow";
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
  user_id: number;
}
export interface User {
  id: string | null;
  username: string;
  password: string;
  email: string;
  created_at: Date;
}
