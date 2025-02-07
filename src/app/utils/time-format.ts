// src/app/utils/time-format.ts
export function formatTime(totalSeconds: number): string {
    const hours: number = Math.floor(totalSeconds / 3600);
    const minutes: number = Math.floor((totalSeconds % 3600) / 60);
    const seconds: number = totalSeconds % 60;

    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
}

function padNumber(num: number): string {
    return num.toString().padStart(2, '0');
}