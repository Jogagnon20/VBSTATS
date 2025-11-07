import { Rotation } from '../entities/rotation'
import { DB } from '../sqlite/db'

export async function createRotation(db: DB, rotation: Rotation): Promise<number> {
  const result = await db.runAsync(
    `insert into Rotation (
        SetId,
        RotationNo,
        P1, P2, P3, P4, P5, P6
     ) values (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      rotation.setId, rotation.rotationNo,
      rotation.p1, rotation.p2, rotation.p3,
      rotation.p4, rotation.p5, rotation.p6
    ]
  )
  return result.lastInsertRowId
}

export async function getRotationById(db: DB, rotationId: number): Promise<Rotation | null> {
  const result = await db.getFirstAsync<Rotation>(
    `select RotationId as rotationId,
            SetId as setId,
            RotationNo as rotationNo,
            P1 as p1,
            P2 as p2,
            P3 as p3,
            P4 as p4,
            P5 as p5,
            P6 as p6
       from Rotation
      where RotationId = ?`,
    [rotationId]
  )
  return result ?? null
}

export async function getRotationsBySet(db: DB, setId: number): Promise<Rotation[]> {
  const result = await db.getAllAsync<Rotation>(
    `select RotationId as rotationId,
            SetId as setId,
            RotationNo as rotationNo,
            P1 as p1,
            P2 as p2,
            P3 as p3,
            P4 as p4,
            P5 as p5,
            P6 as p6
       from Rotation
      where SetId = ?
      order by RotationNo asc`,
    [setId]
  )
  return result
}

export async function getAllRotations(db: DB): Promise<Rotation[]> {
  const result = await db.getAllAsync<Rotation>(
    `select RotationId as rotationId,
            SetId as setId,
            RotationNo as rotationNo,
            P1 as p1,
            P2 as p2,
            P3 as p3,
            P4 as p4,
            P5 as p5,
            P6 as p6
       from Rotation`
  )
  return result
}

export async function updateRotation(db: DB, rotation: Rotation): Promise<void> {
  await db.runAsync(
    `update Rotation
        set SetId = coalesce(?, SetId),
            RotationNo = coalesce(?, RotationNo),
            P1 = coalesce(?, P1),
            P2 = coalesce(?, P2),
            P3 = coalesce(?, P3),
            P4 = coalesce(?, P4),
            P5 = coalesce(?, P5),
            P6 = coalesce(?, P6)
      where RotationId = ?`,
    [
      rotation.setId, rotation.rotationNo,
      rotation.p1, rotation.p2, rotation.p3,
      rotation.p4, rotation.p5, rotation.p6,
      rotation.rotationId
    ]
  )
}

export async function deleteRotation(db: DB, rotationId: number): Promise<void> {
  await db.runAsync(
    `delete from Rotation
      where RotationId = ?`,
    [rotationId]
  )
}
