import { ResultType } from '../entities/resultType'
import { DB } from '../sqlite/db'

export async function createResultType(db: DB, resultType: ResultType): Promise<number> {
  const result = await db.runAsync(
    `insert into ResultType (Code, Label, DeltaPoints)
     values (?, ?, ?)`,
    [resultType.code, resultType.label, resultType.deltaPoints]
  )
  return result.lastInsertRowId
}

export async function getResultTypeById(db: DB, id: number): Promise<ResultType | null> {
  const result = await db.getFirstAsync<ResultType>(
    `select ResultTypeId as resultTypeId,
            Code as code,
            Label as label,
            DeltaPoints as deltaPoints
       from ResultType
      where ResultTypeId = ?`,
    [id]
  )
  return result ?? null
}

export async function getAllResultTypes(db: DB): Promise<ResultType[]> {
  const result = await db.getAllAsync<ResultType>(
    `select ResultTypeId as resultTypeId,
            Code as code,
            Label as label,
            DeltaPoints as deltaPoints
       from ResultType`
  )
  return result
}

export async function updateResultType(db: DB, resultType: ResultType): Promise<void> {
  await db.runAsync(
    `update ResultType
        set Code = coalesce(?, Code),
            Label = coalesce(?, Label),
            DeltaPoints = coalesce(?, DeltaPoints)
      where ResultTypeId = ?`,
    [resultType.code, resultType.label, resultType.deltaPoints, resultType.resultTypeId]
  )
}

export async function deleteResultType(db: DB, id: number): Promise<void> {
  await db.runAsync(
    `delete from ResultType
      where ResultTypeId = ?`,
    [id]
  )
}
