import { Note } from '../entities/note'
import { DB } from '../sqlite/db'

export async function createNote(db: DB, note: Note): Promise<number> {
  const result = await db.runAsync(
    `insert into Note (
        SetId,
        PlayerId,
        Content
     ) values (?, ?, ?)`,
    [note.setId, note.playerId || null, note.content]
  )
  return result.lastInsertRowId
}

export async function getNoteById(db: DB, noteId: number): Promise<Note | null> {
  const result = await db.getFirstAsync<Note>(
    `select NoteId as noteId,
            SetId as setId,
            PlayerId as playerId,
            Content as content
       from Note
      where NoteId = ?`,
    [noteId]
  )
  return result ?? null
}

export async function getNotesBySet(db: DB, setId: number): Promise<Note[]> {
  const result = await db.getAllAsync<Note>(
    `select NoteId as noteId,
            SetId as setId,
            PlayerId as playerId,
            Content as content
       from Note
      where SetId = ?
      order by NoteId asc`,
    [setId]
  )
  return result
}

export async function getAllNotes(db: DB): Promise<Note[]> {
  const result = await db.getAllAsync<Note>(
    `select NoteId as noteId,
            SetId as setId,
            PlayerId as playerId,
            Content as content
       from Note`
  )
  return result
}

export async function updateNote(db: DB, note: Note): Promise<void> {
  await db.runAsync(
    `update Note
        set SetId = coalesce(?, SetId),
            PlayerId = coalesce(?, PlayerId),
            Content = coalesce(?, Content)
      where NoteId = ?`,
    [note.setId, note.playerId || null, note.content, note.noteId]
  )
}

export async function deleteNote(db: DB, noteId: number): Promise<void> {
  await db.runAsync(
    `delete from Note
      where NoteId = ?`,
    [noteId]
  )
}
