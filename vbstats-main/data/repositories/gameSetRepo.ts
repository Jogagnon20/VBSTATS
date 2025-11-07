import { GameSet } from '../entities/gameSet'
import { DB } from '../sqlite/db'

export async function createGameSet(db: DB, set: GameSet): Promise<number> {
  const result = await db.runAsync(
    `insert into GameSet (MatchId, SetIndex, ScoreHome, ScoreAway, IsClosed)
     values (?, ?, ?, ?, ?)`,
    [set.matchId, set.index, set.scoreHome, set.scoreAway, set.isClosed ? 1 : 0]
  )
  return result.lastInsertRowId
}

export async function getGameSetById(db: DB, setId: number): Promise<GameSet | null> {
  const result = await db.getFirstAsync<GameSet>(
    `select SetId as setId,
            MatchId as matchId,
            SetIndex as index,
            ScoreHome as scoreHome,
            ScoreAway as scoreAway,
            IsClosed as isClosed
       from GameSet
      where SetId = ?`,
    [setId]
  )
  if (!result) return null
  return { ...result, isClosed: !!result.isClosed }
}

export async function getAllGameSets(db: DB): Promise<GameSet[]> {
  const rows = await db.getAllAsync<GameSet>(
    `select SetId as setId,
            MatchId as matchId,
            SetIndex as index,
            ScoreHome as scoreHome,
            ScoreAway as scoreAway,
            IsClosed as isClosed
       from GameSet`
  )
  return rows.map(row => ({ ...row, isClosed: !!row.isClosed }))
}

export async function getSetsByMatch(db: DB, matchId: number): Promise<GameSet[]> {
  const rows = await db.getAllAsync<GameSet>(
    `select SetId as setId,
            MatchId as matchId,
            SetIndex as index,
            ScoreHome as scoreHome,
            ScoreAway as scoreAway,
            IsClosed as isClosed
       from GameSet
      where MatchId = ?
      order by SetIndex asc`,
    [matchId]
  )
  return rows.map(row => ({ ...row, isClosed: !!row.isClosed }))
}

export async function updateGameSet(db: DB, set: GameSet): Promise<void> {
  await db.runAsync(
    `update GameSet
        set MatchId = coalesce(?, MatchId),
            SetIndex = coalesce(?, SetIndex),
            ScoreHome = coalesce(?, ScoreHome),
            ScoreAway = coalesce(?, ScoreAway),
            IsClosed = coalesce(?, IsClosed)
      where SetId = ?`,
    [
      set.matchId, set.index, set.scoreHome,
      set.scoreAway, set.isClosed ? 1 : 0, set.setId
    ]
  )
}

export async function deleteGameSet(db: DB, setId: number): Promise<void> {
  await db.runAsync(
    `delete from GameSet
      where SetId = ?`,
    [setId]
  )
}
