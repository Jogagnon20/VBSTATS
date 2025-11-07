export interface Event {
    eventId: number;
    rallyId: number;
    actionTypeId: number;
    resultTypeId: number | null;
    playerId: number | null;
    index: number;
    locationFrom: number | null; // ex: 1, 2, ..., 6
    locationTo: number | null;   // ex: 1, 2, ..., 6
    quality: number | null; // 0 to 3
    note: string | null;
    teamSide: 'HOME' | 'AWAY';

}