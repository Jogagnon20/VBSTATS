export interface Note {
    noteId: number;
    setId: number;
    playerId: number | null;
    content: string;
}