import { Event } from '../entities/event'
import { DB } from '../sqlite/db'

export async function createEvent(db: DB, event: Event): Promise<number> {
  const result = await db.runAsync(
    `insert into Event (
        RallyId,
        ActionTypeId,
        ResultTypeId,
        PlayerId,
        EventNo,
        LocationFrom,
        LocationTo,
        Quality,
        Note,
        TeamSide
     ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      event.rallyId, event.actionTypeId, 
      event.resultTypeId || null, event.playerId || null, 
      event.index, event.locationFrom || null,
      event.locationTo || null, event.quality || null,
      event.note || null, event.teamSide
    ]
  )
  return result.lastInsertRowId
}

export async function getEventById(db: DB, eventId: number): Promise<Event | null> {
  const result = await db.getFirstAsync<Event>(
    `select EventId as eventId,
            RallyId as rallyId,
            ActionTypeId as actionTypeId,
            ResultTypeId as resultTypeId,
            PlayerId as playerId,
            EventNo as index,
            LocationFrom as locationFrom,
            LocationTo as locationTo,
            Quality as quality,
            Note as note,
            TeamSide as teamSide
       from Event
      where EventId = ?`,
    [eventId]
  )
  return result ?? null
}

export async function getEventsByRally(db: DB, rallyId: number): Promise<Event[]> {
  const result = await db.getAllAsync<Event>(
    `select EventId as eventId,
            RallyId as rallyId,
            ActionTypeId as actionTypeId,
            ResultTypeId as resultTypeId,
            PlayerId as playerId,
            EventNo as index,
            LocationFrom as locationFrom,
            LocationTo as locationTo,
            Quality as quality,
            Note as note,
            TeamSide as teamSide
       from Event
      where RallyId = ?
      order by EventNo asc`,
    [rallyId]
  )
  return result
}

export async function getAllEvents(db: DB): Promise<Event[]> {
  const result = await db.getAllAsync<Event>(
    `select EventId as eventId,
            RallyId as rallyId,
            ActionTypeId as actionTypeId,
            ResultTypeId as resultTypeId,
            PlayerId as playerId,
            EventNo as index,
            LocationFrom as locationFrom,
            LocationTo as locationTo,
            Quality as quality,
            Note as note,
            TeamSide as teamSide
       from Event`
  )
  return result
}

export async function updateEvent(db: DB, event: Event): Promise<void> {
  await db.runAsync(
    `update Event
        set RallyId = coalesce(?, RallyId),
            ActionTypeId = coalesce(?, ActionTypeId),
            ResultTypeId = coalesce(?, ResultTypeId),
            PlayerId = coalesce(?, PlayerId),
            EventNo = coalesce(?, EventNo),
            LocationFrom = coalesce(?, LocationFrom),
            LocationTo = coalesce(?, LocationTo),
            Quality = coalesce(?, Quality),
            Note = coalesce(?, Note),
            TeamSide = coalesce(?, TeamSide)
      where EventId = ?`,
    [
      event.rallyId, event.actionTypeId, event.resultTypeId || null,
      event.playerId || null, event.index, event.locationFrom || null,
      event.locationTo || null, event.quality || null, event.note || null,
      event.teamSide, event.eventId
    ]
  )
}

export async function deleteEvent(db: DB, eventId: number): Promise<void> {
  await db.runAsync(
    `delete from Event
      where EventId = ?`,
    [eventId]
  )
}
