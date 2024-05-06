export type Tag = 'Rojo' | 'Azul' | 'Verde' | 'Amarillo'
export type Status = 'Cancelled' | 'Hidden' | 'Accepted' | 'Seen' | 'Resolved'
export interface Post {
  id: number | null
  title: string
  description: string
  images: string[]
  tags: Tag[]
  created_at: Date
  status: Status
  user_id: number
}

// export type NonSensitivePost = Pick<Post, 'title' | 'description' | 'images' | 'tags' |
// 'status' > <-- Es lo mismo que lo de abajo pero cogiendo los campos que quieras!!
export type NonSensitivePost = Omit<Post, 'id' | 'user_id' | 'created_at'>
