import {
  Body,
  Get,
  JsonController,
  Param,
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
import {
  RoleEnum,
  User,
} from '@base/api/models';
import { TruckOrderDto } from '@base/api/responses/Orders/order.interface';
import { TruckOrderService } from '@base/api/services/Orders/TruckOrderService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';

@Service()
@OpenAPI({})
@UseBefore(AuthCheck)
@JsonController('/truck')
export class TruckOrderController extends ControllerBase {
    
    @Inject()
    private service: TruckOrderService;

    public constructor() {
        super();
    }



    @Get("/orders")
    async findByTruck(
        @Req() request: any,
    ): Promise<TruckOrderDto[]> {
        try {
            const loggedUser: User = request.loggedUser;

            if (loggedUser.role.code === RoleEnum.TRUCK) {
                return this.service.findAllByUserTruck(loggedUser.id);
            }

            throw new UnauthorizedError();
        } catch (err) {
            this.errorLog(err, 'findByTruck');

            throw new GenericException();
        }
    }

    @Get("/orders/:orderId")
    async findByTruckById(
        @Req() request: any,
        @Param('orderId') orderId: number
    ): Promise<TruckOrderDto | null> {
        try {
            const loggedUser: User = request.loggedUser;

            if (loggedUser.role.code === RoleEnum.TRUCK) {
                return this.service.findAllByUserTruckByOrderId(loggedUser.id, orderId);
            }

            throw new UnauthorizedError();
        } catch (err) {
            this.errorLog(err, 'findByTruckById');

            throw new GenericException();
        }
    }


    @Post("/orders/:orderId")
    async updateTruckOrder(
        @Req() request: any,
        @Param('orderId') orderId: number,
        @Body() data: TruckOrderDto
    ): Promise<TruckOrderDto | null> {
        try {
            const loggedUser: User = request.loggedUser;

            if (loggedUser.role.code === RoleEnum.TRUCK) {
                return this.service.updateTruckOrder(loggedUser.id, orderId, data);
            }
            
            throw new UnauthorizedError();

        } catch (err) {
            this.errorLog(err, 'updateTruckOrder');

            throw new GenericException();
        }
    }
}