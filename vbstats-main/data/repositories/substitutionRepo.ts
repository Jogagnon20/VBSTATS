import { Substitution } from '../entities/substitution'
import { DB } from '../sqlite/db'

export async function createSubstitution(db: DB, sub: Substitution): Promise<number> {
  const result = await db.runAsync(
    `insert into Substitution (
        SetId,
        PlayerInId,
        PlayerOutId,
        PositionSlot
     ) values (?, ?, ?, ?)`,
    [sub.setId, sub.playerInId, sub.playerOutId, sub.positionSlot]
  )
  return result.lastInsertRowId
}

export async function getSubstitutionById(db: DB, subId: number): Promise<Substitution | null> {
  const result = await db.getFirstAsync<Substitution>(
    `select SubstitutionId as subId,
            SetId as setId,
            PlayerInId as playerInId,
            PlayerOutId as playerOutId,
            PositionSlot as positionSlot
       from Substitution
      where SubstitutionId = ?`,
    [subId]
  )
  return result ?? null
}

export async function getSubstitutionsBySet(db: DB, setId: number): Promise<Substitution[]> {
  const result = await db.getAllAsync<Substitution>(
    `select SubstitutionId as subId,
            SetId as setId,
            PlayerInId as playerInId,
            PlayerOutId as playerOutId,
            PositionSlot as positionSlot
       from Substitution
      where SetId = ?
      order by SubstitutionId asc`,
    [setId]
  )
  return result
}

export async function getAllSubstitutions(db: DB): Promise<Substitution[]> {
  const result = await db.getAllAsync<Substitution>(
    `select SubstitutionId as subId,
            SetId as setId,
            PlayerInId as playerInId,
            PlayerOutId as playerOutId,
            PositionSlot as positionSlot
       from Substitution`
  )
  return result
}

export async function updateSubstitution(db: DB, sub: Substitution): Promise<void> {
  await db.runAsync(
    `update Substitution
        set SetId = coalesce(?, SetId),
            PlayerInId = coalesce(?, PlayerInId),
            PlayerOutId = coalesce(?, PlayerOutId),
            PositionSlot = coalesce(?, PositionSlot)
      where SubstitutionId = ?`,
    [sub.setId, sub.playerInId, sub.playerOutId, sub.positionSlot, sub.subId]
  )
}

export async function deleteSubstitution(db: DB, subId: number): Promise<void> {
  await db.runAsync(
    `delete from Substitution
      where SubstitutionId = ?`,
    [subId]
  )
}
