import {
  Body,
  Get,
  JsonController,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import {
  Inject,
  Service,
} from 'typedi';

import {
  CalendarCreationDTO,
} from '@base/api/requests/Calendar/calendar.interface';
import {
  TruckDayResponseDTO,
} from '@base/api/responses/Trucks/truck.interface';
import {
  TruckCalendarService,
} from '@base/api/services/Trucks/TruckCalendarService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';

@Service()
@OpenAPI({})
@JsonController('/where')
export class WhereController extends ControllerBase {

  @Inject()
  private truckCalendarService: TruckCalendarService;

  public constructor() {
    super();
  }

  @Get("/now")
  public async getWhereNow(): Promise<TruckDayResponseDTO[]> {
    return this.truckCalendarService.findNow();
  }

  @Get("/week")
  public async getWhereWeek(): Promise<TruckDayResponseDTO[]> {
    return this.truckCalendarService.findWeek();
  }

  //TODO add security
  @Post("/create-calendar")
  public async createCalendar(@Body() input: CalendarCreationDTO[]): Promise<TruckDayResponseDTO[]> {
    return this.truckCalendarService.createCalendar(input);

  }
}