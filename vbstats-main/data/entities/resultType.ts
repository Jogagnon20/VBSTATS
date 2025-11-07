export interface ResultType {
    resultTypeId: number;
    code: string; // 'ACE', 'ERROR', 'IN_PLAY', 'KILL', 'BLOCK_POINT'
    label: string;
    deltaPoints: -1 | 0 | 1; // +1, 0, -1
}