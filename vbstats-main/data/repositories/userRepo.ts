import { User } from '../entities/user'
import { DB } from '../sqlite/db'

export async function createUser(db: DB, user: User): Promise<number> {
  const result = await db.runAsync(
    `insert into User (Name, PhotoURI) values (?, ?)`,
    [user.name, user.photoUri || null]
  )
  return result.lastInsertRowId
}

export async function getUserById(db: DB, userId: number): Promise<User | null> {
  const result = await db.getFirstAsync<User>(
    `select UserId as userId, Name as name, PhotoURI as photoUri
       from User
      where UserId = ?`,
    [userId]
  )
  return result ?? null
}

export async function getAllUsers(db: DB): Promise<User[]> {
  const rows = await db.getAllAsync<User>(
    `select UserId as userId, Name as name, PhotoURI as photoUri from User`
  )
  return rows
}

export async function updateUser(db: DB, id: number, user: User) {
  await db.runAsync(
    `update User
        set Name = coalesce(?, Name),
            PhotoURI = coalesce(?, PhotoURI)
      where UserId = ?`,
    [user.name, user.photoUri, id]
  )
}

export async function deleteUser(db: DB, id: number) {
  await db.runAsync(
    `delete from User where UserId = ?`,
    [id]
  )
}
