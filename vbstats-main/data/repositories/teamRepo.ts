import { Player } from '../entities/player';
import { Team } from '../entities/team';
import { DB } from '../sqlite/db';

export async function getTeamsByUserId(db: DB,userId: number): Promise<Team[]> {
     const result = await db.getAllAsync<Team>(
    `select TeamId as teamId, 
            Name as name, 
            Season as season, 
            OwnerId as ownerId 
       from Team where OwnerId=?`, [userId]
  );
  return result;
}

export async function createTeam(db: DB, team: Team): Promise<number> {
  const result = await db.runAsync(
    `insert into Team (Name, Season, OwnerId) 
    values (?, ?, ?)`,
    [team.name, team.season || null, team.ownerId || null]
  )
  return result.lastInsertRowId;
}

export async function getTeamById(db: DB, teamId: number): Promise<Team | null> {
  const result = await db.getFirstAsync<Team>(
    `select TeamId as teamId, 
            Name as name, 
            Season as season, 
            OwnerId as ownerId 
       from Team 
      where TeamId = ?`,
    [teamId]
  );
  return result ?? null;
}

export async function getPlayersTeam(db: DB, teamId: number): Promise<Player[]> {
  const result = await db.getAllAsync<Player>(
    `select p.PlayerId as playerId,
            p.Name as name,
            p.Number as number,
            p.Position as position
       from Player p
       join PlayerHistory ph on p.PlayerId = ph.PlayerId
      where ph.TeamId = ?`,
    [teamId]
  );
  return result;
}

export async function getAllTeams(db: DB): Promise<Team[]> {
  const result = await db.getAllAsync<Team>(
    `select TeamId as teamId, 
            Name as name, 
            Season as season, 
            OwnerId as ownerId 
       from Team`
  );
  return result;
}

export async function updateTeam(db: DB, team: Team): Promise<void> {
  await db.runAsync(
    `update Team 
        set Name = coalesce(?, Name), 
            Season = coalesce(?, Season),
            OwnerId = coalesce(?, OwnerId)
      where TeamId = ?`,
    [team.name, team.season || null, team.ownerId || null, team.teamId]
  );
}

export async function deleteTeam(db: DB, teamId: number): Promise<void> {
  await db.runAsync(
    `delete from Team 
      where TeamId = ?`,
    [teamId]
  );
}