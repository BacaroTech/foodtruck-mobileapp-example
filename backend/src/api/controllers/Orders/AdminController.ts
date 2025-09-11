import {
  Delete,
  Get,
  JsonController,
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
import {
  RoleEnum,
  User,
} from '@base/api/models';
import { OrderDto } from '@base/api/responses';
import { OrderService } from '@base/api/services/Orders/OrderService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';

@Service()
@OpenAPI({})
@UseBefore(AuthCheck)
@JsonController('/admin')
export class AdminController extends ControllerBase {

    @Inject()
    private service: OrderService;

    @Get("/orders")
    async findAll(@Req() request: any): Promise<OrderDto[]> {
        try {
            const loggedUser: User = request.loggedUser;

            if (loggedUser.role.code === RoleEnum.ADMIN) {
                return this.service.findAllFull();
            }

            throw new UnauthorizedError();
        } catch (err) {
            this.errorLog(err, 'findByTruckById');

            throw new GenericException();
        }
    }

    @Delete("/delete-all-orders")
    async deleteAll(@Req() request: any): Promise<string> {
        try {
            const loggedUser: User = request.loggedUser;

            if (loggedUser.role.code === RoleEnum.ADMIN) {
                await this.service.deleteAll();
                return "ok";
            }

            throw new UnauthorizedError();
        } catch (err) {
            this.errorLog(err, 'findByTruckById');

            throw new GenericException();
        }
    }
}
