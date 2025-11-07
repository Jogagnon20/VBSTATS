export interface ActionType {
    actionTypeId: number;
    code: string; //ex: 'SERVE', 'ATTACK', 'BLOCK', `RECEPTION`, 'DEFENSE'
    label: string;
}