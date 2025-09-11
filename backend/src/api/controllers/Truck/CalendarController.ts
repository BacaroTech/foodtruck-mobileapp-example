import {
  Body,
  JsonController,
  Post,
  Req,
  UnauthorizedError,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import {
  Inject,
  Service,
} from 'typedi';

import { RoleEnum } from '@base/api/models';
import { CalendarCreationDTO } from '@base/api/requests';
import { TruckDayResponseDTO } from '@base/api/responses';
import {
  TruckCalendarService,
} from '@base/api/services/Trucks/TruckCalendarService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';

@Service()
@OpenAPI({})
@UseBefore(AuthCheck)
@JsonController('/calendar')
export class CalendarController extends ControllerBase {

  @Inject()
  private truckCalendarService: TruckCalendarService;

  public constructor() {
    super();
  }

  @Post("/create")
  public async createCalendar(
    @Body() input: CalendarCreationDTO[],
    @Req() request: any
    ): Promise<TruckDayResponseDTO[]> {
    const loggedUser: any = request.loggedUser;
    if (loggedUser.role.code=== RoleEnum.ADMIN) {
      return this.truckCalendarService.createCalendar(input);
    }
    throw new UnauthorizedError();
  }
}