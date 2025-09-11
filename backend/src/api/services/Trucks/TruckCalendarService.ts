import { NotFoundError } from 'routing-controllers';
import {
  Container,
  Service,
} from 'typedi';

import {
  InvalidRequestException,
} from '@base/api/exceptions/Application/InvalidRequest';
import { mapTruckCalendarToTruckDay } from '@base/api/mappers/truck.mapper';
import { User } from '@base/api/models';
import { TruckCalendars } from '@base/api/models/TruckCalendars';
import { DayRepository } from '@base/api/repositories/LookUp/DayRepository';
import { SiteRepository } from '@base/api/repositories/Trucks/SiteRepository';
import {
  TruckCalendarRepository,
} from '@base/api/repositories/Trucks/TruckCalendarRepository';
import { TruckRepository } from '@base/api/repositories/Trucks/TruckRepository';
import {
  UserTruckRepository,
} from '@base/api/repositories/Trucks/UserTruckRepository';
import {
  CalendarCreationDTO,
} from '@base/api/requests/Calendar/calendar.interface';
import {
  TruckDayResponseDTO,
} from '@base/api/responses/Trucks/truck.interface';

@Service()
export class TruckCalendarService {


    truckRepository: TruckRepository;
    siteRepository: SiteRepository;
    dayRepository: DayRepository;

    truckCalendarRespository: TruckCalendarRepository;
    userTruckRepository: UserTruckRepository;

    constructor() {
        this.truckRepository = Container.get(TruckRepository);
        this.dayRepository = Container.get(DayRepository);
        this.siteRepository = Container.get(SiteRepository);
        this.truckCalendarRespository = Container.get(TruckCalendarRepository);
        this.userTruckRepository = Container.get(UserTruckRepository);

    }

    public async findAll(): Promise<TruckDayResponseDTO[]> {

        const truckCalendars: TruckCalendars[] = await this.truckCalendarRespository.findAllJoined();

        return truckCalendars.map(mapTruckCalendarToTruckDay);
    }
    public async findNow(): Promise<TruckDayResponseDTO[]> {

        const truckCalendars: TruckCalendars[] = await this.truckCalendarRespository.findNow();

        return truckCalendars.map(mapTruckCalendarToTruckDay);
    }
    public async findWeek(): Promise<TruckDayResponseDTO[]> {

        const truckCalendars: TruckCalendars[] = await this.truckCalendarRespository.findWeek();

        return truckCalendars.map(mapTruckCalendarToTruckDay);
    }
    public async findByUser(loggedUser: User): Promise<TruckDayResponseDTO> {
        const truckUsers = await this.userTruckRepository.findByUserId(loggedUser.id);
        if (!truckUsers || truckUsers.length === 0) {
            throw new InvalidRequestException("Richiesta non valida.");
        }
        //get first
        // TODO
        const truckUser = truckUsers[0];
        const truckId = truckUser.truckId;
        const truckCalendars: TruckCalendars[] = await this.truckCalendarRespository.findNowByTruckId(truckId);
        const result = truckCalendars.map(mapTruckCalendarToTruckDay);
        if (result.length > 0) {
            return result[0];
        }
        throw new NotFoundError("");
    }
    public async createCalendar(input: CalendarCreationDTO[]): Promise<TruckDayResponseDTO[]> {

        for (const calendarInput of input) {
            try {
                const day = await this.dayRepository.findByCode(calendarInput.day_code);
                const truck = await this.truckRepository.findByCode(calendarInput.truck_code);
                const site = await this.siteRepository.findByCode(calendarInput.site_code);
                if (day && truck && site) {
                    const trucksCalendar: object = {
                        day,
                        truck,
                        site,
                        start_at: "19:00",
                        end_at: "21:00"
                    }
                    await this.truckCalendarRespository.create(trucksCalendar);
                }

            } catch (error) {
                console.error("Error for createCalendar item", error);
            }
        }

        return this.findAll();
    }

}
