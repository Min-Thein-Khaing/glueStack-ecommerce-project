//second to min-second 
export const FormatSecond = (seconds: number): string => {
    const minutes = String(Math.floor(seconds / 60));
    const secondsRem = String(seconds % 60).padStart(2, '0');

    return `${minutes}:${secondsRem}`
}