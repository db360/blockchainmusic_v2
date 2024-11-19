export const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export const calculateProgress = (currentTime: number, duration: number): number => {
    return (currentTime / duration) * 100;
}