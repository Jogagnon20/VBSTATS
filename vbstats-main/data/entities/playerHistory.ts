export interface playerHistory {
    playerId: number;
    teamId: number;
    fromDate: string;
    toDate: string | null;
    number: number | null;
    position: string | null;
}