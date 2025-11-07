import { Player } from '../entities/player'
import { DB } from '../sqlite/db'

export async function createPlayer(db: DB, player: Player): Promise<number> {
  const result = await db.runAsync(
    `insert into Player (Name, Number, Position)
     values (?, ?, ?)`,
    [player.name, player.number || null, player.position || null]
  )
  return result.lastInsertRowId
}

export async function getPlayerById(db: DB, playerId: number): Promise<Player | null> {
  const result = await db.getFirstAsync<Player>(
    `select PlayerId as playerId,
            Name as name,
            Number as number,
            Position as position
       from Player
      where PlayerId = ?`,
    [playerId]
  )
  return result ?? null
}

export async function getAllPlayers(db: DB): Promise<Player[]> {
  const result = await db.getAllAsync<Player>(
    `select PlayerId as playerId,
            Name as name,
            Number as number,
            Position as position
       from Player`
  )
  return result
}

export async function updatePlayer(db: DB, player: Player): Promise<void> {
  await db.runAsync(
    `update Player
        set Name = coalesce(?, Name),
            Number = coalesce(?, Number),
            Position = coalesce(?, Position)
      where PlayerId = ?`,
    [player.name, player.number || null, player.position || null, player.playerId]
  )
}

export async function deletePlayer(db: DB, playerId: number): Promise<void> {
  await db.runAsync(
    `delete from Player
      where PlayerId = ?`,
    [playerId]
  )
}
