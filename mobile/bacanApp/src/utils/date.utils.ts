import { CustomerUI } from 'src/config';
import { TruckDayDTO } from 'src/models';

function createDefault(defaultHour: number, defaultMin: number): Date {

    const currentDate = new Date();
    currentDate.setUTCHours(defaultHour, defaultMin, 0, 0);

    return currentDate;
}

function createDate(timeString: string, defaultHour: number, defaultMin: number): Date {

    try {
        const currentDate = new Date();
        const split = timeString.split(':');

        currentDate.setUTCHours(parseInt(split[0], 10), parseInt(split[1], 10), 0, 0);

        return currentDate;

    } catch (error) {
        console.warn('error', error);
        return createDefault(defaultHour, defaultMin);
    }

}

function createMin(place?: TruckDayDTO | null): Date {
    if (place && place.startAt) {

        return createDate(place.startAt, CustomerUI.defaultHourStart, CustomerUI.defaultMinuteStart);
    } else {
        return createDefault(CustomerUI.defaultHourStart, CustomerUI.defaultMinuteStart);
    }
}

function createMax(place?: TruckDayDTO | null): Date {
    if (place && place.endAt) {

        return createDate(place.endAt, CustomerUI.defaultHourStart, CustomerUI.defaultMinuteStart);
    } else {
        return createDefault(CustomerUI.defaultHourStart, CustomerUI.defaultMinuteStart);
    }
}

function printTime(date?: Date): string {
    if (!date) {
        return '';
    }
    const hours = date.getHours();
    const hoursStr = hours >= 10 ? hours : '0' + hours;

    const minutes = date.getMinutes();
    const minutesStr = minutes >= 10 ? minutes : '0' + minutes;

    return `${hoursStr}:${minutesStr}`;

}

function dateToMinutes(date?: Date): number {
    if (!date) {
        return 0;
    }

    return date.getMinutes() + date.getHours() * 60;
}
export { createMax, createMin, dateToMinutes, printTime };
