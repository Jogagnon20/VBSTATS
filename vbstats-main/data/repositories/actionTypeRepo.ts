import { ActionType } from '../entities/actionType'
import { DB } from '../sqlite/db'

export async function createActionType(db: DB, actionType: ActionType): Promise<number> {
  const result = await db.runAsync(
    `insert into ActionType (Code, Label)
     values (?, ?)`,
    [actionType.code, actionType.label]
  )
  return result.lastInsertRowId
}

export async function getActionTypeById(db: DB, id: number): Promise<ActionType | null> {
  const result = await db.getFirstAsync<ActionType>(
    `select ActionTypeId as actionTypeId,
            Code as code,
            Label as label
       from ActionType
      where ActionTypeId = ?`,
    [id]
  )
  return result ?? null
}

export async function getAllActionTypes(db: DB): Promise<ActionType[]> {
  const result = await db.getAllAsync<ActionType>(
    `select ActionTypeId as actionTypeId,
            Code as code,
            Label as label
       from ActionType`
  )
  return result
}

export async function updateActionType(db: DB, actionType: ActionType): Promise<void> {
  await db.runAsync(
    `update ActionType
        set Code = coalesce(?, Code),
            Label = coalesce(?, Label)
      where ActionTypeId = ?`,
    [actionType.code, actionType.label, actionType.actionTypeId]
  )
}

export async function deleteActionType(db: DB, id: number): Promise<void> {
  await db.runAsync(
    `delete from ActionType
      where ActionTypeId = ?`,
    [id]
  )
}
