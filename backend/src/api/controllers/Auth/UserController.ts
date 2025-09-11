import {
  Body,
  Get,
  JsonController,
  NotFoundError,
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

import {
  GenericException,
} from '@base/api/exceptions/Application/GenericException';
import { RoleEnum } from '@base/api/models';
import { User } from '@base/api/models/User';
import {
  UserByAdminPWRequest,
  UserPWRequest,
} from '@base/api/requests/Auth';
import {
  PasswordChangeResponse,
  RoleResponseDTO,
  TruckUserDTO,
  UserDTO,
} from '@base/api/responses/Auth/user-response.interface';
import { UserService } from '@base/api/services/Auth/UserService';
import {
  TruckCalendarService,
} from '@base/api/services/Trucks/TruckCalendarService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';

@Service()
@OpenAPI({
  tags: ['Auth'],
})
@UseBefore(AuthCheck)
@JsonController('/user')
export class UserController extends ControllerBase {

  @Inject()
  private userService: UserService;

  @Inject()
  private truckCalendarService: TruckCalendarService;

  public constructor() {
    super();
  }

  @Get("/myrole")
  public async myRole(@Req() request: any): Promise<RoleResponseDTO> {
    try {
      const loggedUser: User = request.loggedUser;
      const role = await this.userService.getMyRole(loggedUser.uuid);
      if (role) {
        return {
          roleCode: role
        }
      } else {
        throw new NotFoundError();
      }
    } catch (err) {
      this.errorLog(err, 'myRole');

      throw new GenericException();
    }
  }
  @Get("/me")
  public async me(@Req() request: any): Promise<UserDTO> {
    try {
      const loggedUser: User = request.loggedUser;
      const user = await this.userService.findByUuid(loggedUser.uuid);
      if (user) {
        return {
          email: user.email,
          name: user.name,
          phone: user.telephone
        }
      }
      throw new NotFoundError();

    } catch (err) {
      this.errorLog(err, 'me');

      throw new GenericException();
    }
  }

  @Get("/truck/me")
  public async truckMe(@Req() request: any): Promise<TruckUserDTO> {
    try {
      const loggedUser: User = request.loggedUser;
      if (loggedUser.role.code === RoleEnum.TRUCK) {
        const user = await this.userService.findByUuid(loggedUser.uuid);
        if (user) {
          const truckDay = await this.truckCalendarService.findByUser(user);

          return {
            email: user.email,
            name: user.name,
            phone: user.telephone,
            truckDay: truckDay
          }
        }
        throw new NotFoundError();
      }

      throw new UnauthorizedError();

    } catch (err) {
      this.errorLog(err, 'me');

      throw new GenericException();
    }
  }

  @Post("/changepassword")
  public async pw(
    @Req() request: any,
    @Body() userRequest: UserPWRequest): Promise<PasswordChangeResponse> {
    try {
      const loggedUser: User = request.loggedUser;

      await this.userService.changePw(loggedUser, userRequest);
      return {
        message: "OK",
      }
    } catch (err) {

      throw new GenericException();
    }
  }

  @Post("/unregister")
  public async unregister(
    @Req() request: any,
  ) {
    
    try {
      const loggedUser: User = request.loggedUser;

      await this.userService.unregister(loggedUser);
      return {
        message: "OK",
      }
    } catch (err) {

      throw new GenericException();
    }
  }


  @Post("/admin/resetpassword")
  public async resetPassword(
    @Req() request: any,
    @Body() userRequest: UserByAdminPWRequest): Promise<PasswordChangeResponse> {
    try {
      const loggedUser: any = request.loggedUser;
      if (loggedUser.role.code === RoleEnum.ADMIN) {
        await this.userService.resetPw(userRequest);
      }
      return {
        message: "OK",
      }
    } catch (err) {

      throw new GenericException();
    }
  }
}