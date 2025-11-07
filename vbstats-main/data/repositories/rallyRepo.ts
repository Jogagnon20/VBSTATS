import { Rally } from '../entities/rally'
import { DB } from '../sqlite/db'

export async function createRally(db: DB, rally: Rally): Promise<number> {
  const result = await db.runAsync(
    `insert into Rally (
        SetId,
        StartingRotationId,
        ServingTeamId,
        WinnerTeamId,
        RallyNo
     ) values (?, ?, ?, ?, ?)`,
    [
      rally.setId, rally.startingRotationId, rally.servingTeamId,
      rally.winnerTeamId || null, rally.rallyNo
    ]
  )
  return result.lastInsertRowId
}

export async function getRallyById(db: DB, rallyId: number): Promise<Rally | null> {
  const result = await db.getFirstAsync<Rally>(
    `select RallyId as rallyId,
            SetId as setId,
            StartingRotationId as startingRotationId,
            ServingTeamId as servingTeamId,
            WinnerTeamId as winnerTeamId,
            RallyNo as rallyNo
       from Rally
      where RallyId = ?`,
    [rallyId]
  )
  return result ?? null
}

export async function getRalliesBySet(db: DB, setId: number): Promise<Rally[]> {
  const result = await db.getAllAsync<Rally>(
    `select RallyId as rallyId,
            SetId as setId,
            StartingRotationId as startingRotationId,
            ServingTeamId as servingTeamId,
            WinnerTeamId as winnerTeamId,
            RallyNo as rallyNo
       from Rally
      where SetId = ?
      order by RallyNo asc`,
    [setId]
  )
  return result
}

export async function getAllRallies(db: DB): Promise<Rally[]> {
  const result = await db.getAllAsync<Rally>(
    `select RallyId as rallyId,
            SetId as setId,
            StartingRotationId as startingRotationId,
            ServingTeamId as servingTeamId,
            WinnerTeamId as winnerTeamId,
            RallyNo as rallyNo
       from Rally`
  )
  return result
}

export async function updateRally(db: DB, rally: Rally): Promise<void> {
  await db.runAsync(
    `update Rally
        set SetId = coalesce(?, SetId),
            StartingRotationId = coalesce(?, StartingRotationId),
            ServingTeamId = coalesce(?, ServingTeamId),
            WinnerTeamId = coalesce(?, WinnerTeamId),
            RallyNo = coalesce(?, RallyNo)
      where RallyId = ?`,
    [
      rally.setId, rally.startingRotationId, rally.servingTeamId,
      rally.winnerTeamId || null, rally.rallyNo, rally.rallyId
    ]
  )
}

export async function deleteRally(db: DB, rallyId: number): Promise<void> {
  await db.runAsync(
    `delete from Rally
      where RallyId = ?`,
    [rallyId]
  )
}
