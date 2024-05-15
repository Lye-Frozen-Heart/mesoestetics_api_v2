export type Tag = "Rojo" | "Azul" | "Verde" | "Amarillo";
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

// export type NonSensitivePost = Pick<Post, 'title' | 'description' | 'images' | 'tags' |
// 'status' > <-- Es lo mismo que lo de abajo pero cogiendo los campos que quieras!!
export type NonSensitivePost = Omit<Post, "id" | "user_id" | "created_at">;
export type NonSensitiveUser = Omit<Post, "id" | "password" | "created_at">;
