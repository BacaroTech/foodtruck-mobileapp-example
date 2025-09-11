export const timeConverter = (time?: string) => {

    if (!time) {
        return '';
    }
    try {
        const timeDate = new Date(time);
        const hours = timeDate.getHours();
        const minutes = timeDate.getMinutes();
        const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
        const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        return `${hoursStr}:${minStr}`;

    } catch (error) {
        console.error('Error time ui converter', time);
    }
    return '';

}