export interface Task {
    id: number;
    name: string;
    duration: number;
    elapsed: number;
    isRunning: boolean;
    isCompleted: boolean;
}
