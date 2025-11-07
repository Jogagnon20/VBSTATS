import { Match } from '../entities/match'
import { DB } from '../sqlite/db'

export async function createMatch(db: DB, match: Match): Promise<number> {
  const result = await db.runAsync(
    `insert into Match (MyTeamId, OtherTeamId, Date, Location)
     values (?, ?, ?, ?)`,
    [match.myTeamId, match.otherTeamId, match.date, match.location || null]
  )
  return result.lastInsertRowId
}

export async function getMatchById(db: DB, matchId: number): Promise<Match | null> {
  const result = await db.getFirstAsync<Match>(
    `select MatchId as matchId,
            MyTeamId as myTeamId,
            OtherTeamId as otherTeamId,
            Date as date,
            Location as location
       from Match
      where MatchId = ?`,
    [matchId]
  )
  return result ?? null
}

export async function getAllMatches(db: DB): Promise<Match[]> {
  const result = await db.getAllAsync<Match>(
    `select MatchId as matchId,
            MyTeamId as myTeamId,
            OtherTeamId as otherTeamId,
            Date as date,
            Location as location
       from Match`
  )
  return result
}

export async function getMatchesByTeam(db: DB, teamId: number): Promise<Match[]> {
  const result = await db.getAllAsync<Match>(
    `select MatchId as matchId,
            MyTeamId as myTeamId,
            OtherTeamId as otherTeamId,
            Date as date,
            Location as location
       from Match
      where MyTeamId = ?
         or OtherTeamId = ?
      order by Date desc`,
    [teamId, teamId]
  )
  return result
}

export async function updateMatch(db: DB, match: Match): Promise<void> {
  await db.runAsync(
    `update Match
        set MyTeamId = coalesce(?, MyTeamId),
            OtherTeamId = coalesce(?, OtherTeamId),
            Date = coalesce(?, Date),
            Location = coalesce(?, Location)
      where MatchId = ?`,
    [
      match.myTeamId,
      match.otherTeamId,
      match.date,
      match.location || null,
      match.matchId
    ]
  )
}

export async function deleteMatch(db: DB, matchId: number): Promise<void> {
  await db.runAsync(
    `delete from Match
      where MatchId = ?`,
    [matchId]
  )
}
