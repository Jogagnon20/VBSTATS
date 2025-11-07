import { playerHistory } from '../entities/playerHistory';
import { DB } from '../sqlite/db';

export async function createPlayerHistory(db: DB, history: playerHistory): Promise<string> {
 const result= await db.runAsync(
    `insert into PlayerHistory (
        PlayerId,
        TeamId,
        FromDate,
        ToDate,
        Number,
        Position
     ) values (?, ?, ?, ?, ?, ?)`,
    [
      history.playerId, history.teamId, history.fromDate,
      history.toDate || null, history.number || null, history.position || null
    ]
  )
  
  const date=await db.getFirstAsync<string>(
    `select FromDate from PlayerHistory
    where PlayerId = ? and TeamId = ? and FromDate = ?
`, [history.playerId, history.teamId, history.fromDate]);
   if (date) {
    return date;
  } else {
    throw new Error("Échec de l'insertion dans PlayerHistory");
  }
}

export async function getPlayerHistory(db: DB, playerId: number, teamId: number, fromDate: string): Promise<playerHistory | null> {
  const result = await db.getFirstAsync<playerHistory>(
    `select PlayerId as playerId,
            TeamId as teamId,
            FromDate as fromDate,
            ToDate as toDate,
            Number as number,
            Position as position
       from PlayerHistory
      where PlayerId = ?
        and TeamId = ?
        and FromDate = ?`,
    [playerId, teamId, fromDate]
  )
  return result ?? null
}

export async function getAllPlayerHistories(db: DB): Promise<playerHistory[]> {
  const result = await db.getAllAsync<playerHistory>(
    `select PlayerId as playerId,
            TeamId as teamId,
            FromDate as fromDate,
            ToDate as toDate,
            Number as number,
            Position as position
       from PlayerHistory`
  )
  return result
}

export async function getHistoryByPlayer(db: DB, playerId: number): Promise<playerHistory[]> {
  const result = await db.getAllAsync<playerHistory>(
    `select PlayerId as playerId,
            TeamId as teamId,
            FromDate as fromDate,
            ToDate as toDate,
            Number as number,
            Position as position
       from PlayerHistory
      where PlayerId = ?
      order by FromDate desc`,
    [playerId]
  )
  return result
}

export async function getHistoryByTeam(db: DB, teamId: number): Promise<playerHistory[]> {
  const result = await db.getAllAsync<playerHistory>(
    `select PlayerId as playerId,
            TeamId as teamId,
            FromDate as fromDate,
            ToDate as toDate,
            Number as number,
            Position as position
       from PlayerHistory
      where TeamId = ?
      order by FromDate desc`,
    [teamId]
  )
  return result
}

export async function updatePlayerHistory(db: DB, history: playerHistory): Promise<void> {
  await db.runAsync(
    `update PlayerHistory
        set ToDate = coalesce(?, ToDate),
            Number = coalesce(?, Number),
            Position = coalesce(?, Position)
      where PlayerId = ?
        and TeamId = ?
        and FromDate = ?`,
    [
      history.toDate || null, history.number || null, history.position || null,
      history.playerId, history.teamId, history.fromDate
    ]
  )
}

export async function deletePlayerHistory(db: DB, playerId: number, teamId: number, fromDate: string): Promise<void> {
  await db.runAsync(
    `delete from PlayerHistory
      where PlayerId = ?
        and TeamId = ?
        and FromDate = ?`,
    [playerId, teamId, fromDate]
  )
}
