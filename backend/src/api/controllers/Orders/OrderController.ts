import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
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
import { RoleEnum } from '@base/api/models/enums/user.enums';
import { User } from '@base/api/models/User';
import { OrderRequest } from '@base/api/requests/Dishes/OrderRequest';
import { OrderDto } from '@base/api/responses/Orders/order.interface';
import { OrderService } from '@base/api/services/Orders/OrderService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { AuthCheck } from '@base/infrastructure/middlewares/Auth/AuthCheck';

@Service()
@OpenAPI({})
@UseBefore(AuthCheck)
@JsonController('/orders')
export class OrderController extends ControllerBase {

    @Inject()
    private service: OrderService;

    public constructor() {
        super();
    }

    @Get()
    async findAll(
        @Req() request: any
    ): Promise<OrderDto[]> {
        try {
            const loggedUser: User = request.loggedUser;

            if (loggedUser.role.code === RoleEnum.ADMIN) {
                return this.service.findAllFull();
            }

            throw new UnauthorizedError();
        } catch (err) {
            this.errorLog(err, 'findAll');

            throw new GenericException();
        }
    }

    @Get("/cart")
    async findCartByUserId(
        @Req() request: any
    ): Promise<OrderDto[]> {
        try {
            const loggedUser: User = request.loggedUser;
            return this.service.findAllDto(loggedUser.id);
        } catch (err) {
            this.errorLog(err, 'findCartByUserId');

            throw new GenericException();
        }
    }

    @Get("/lastCart")
    async findLastCartByUserId(
        @Req() request: any
    ): Promise<OrderDto | null> {
        try {
            const loggedUser: User = request.loggedUser;
            return this.service.findLastCart(loggedUser.id);
        } catch (err) {
            this.errorLog(err, 'findLastCartByUserId');

            throw new GenericException();
        }
    }

    @Get("/lastReject")
    async findLastRejectByUserId(
        @Req() request: any
    ): Promise<OrderDto | null> {
        try {
            const loggedUser: User = request.loggedUser;
            const lastReject = await this.service.findLastReject(loggedUser.id);
            return lastReject;
        } catch (err) {
            this.errorLog(err, 'findLastRejectByUserId');

            throw new GenericException();
        }
    }

    @Get("/cart/:id")
    async findCartByIdAndUserId(
        @Req() request: any,
        @Param('id') id: number
    ): Promise<OrderDto | null> {
        try {
            const loggedUser: User = request.loggedUser;
            return this.service.findByIdByUserIdFull(id, loggedUser.id);
        } catch (err) {
            this.errorLog(err, 'findCartByIdAndUserId');

            throw new GenericException();
        }
    }

    @Post("/cart")
    async createOrderCart(
        @Req() request: any,
        @Body() data: OrderRequest): Promise<OrderDto | null> {
        try {
            const loggedUser: User = request.loggedUser;

            return this.service.createCartDto(data, loggedUser.id);
        } catch (err) {
            this.errorLog(err, 'createOrderCart');

            throw new GenericException();
        }
    }


    @Put("/cart/:id")
    async updateOrderCart(
        @Req() request: any,
        @Param('id') id: number,
        @Body() data: OrderRequest): Promise<OrderDto | null> {
        try {
            const loggedUser: User = request.loggedUser;
            return this.service.updateCartDto(id, data, loggedUser.id);
        } catch (err) {
            this.errorLog(err, 'updateOrderCart');

            throw new GenericException();
        }
    }

    @Post("/send/:id")
    async sendOrder(
        @Req() request: any,
        @Param('id') id: number,
        @Body() data: OrderRequest): Promise<OrderDto | null> {
        const loggedUser: User = request.loggedUser;
        try {
            const order: OrderDto | null = await this.service.sendOrder(id, data, loggedUser.id);
            return order;
        } catch (error) {
            this.errorLog(error, 'sendOrder');

            throw new GenericException();
        }
    }

    @Post("/send/:id/trade")
    async tradeOrder(
        @Req() request: any,
        @Param('id') id: number,
        @Body() data: OrderDto): Promise<OrderDto | null> {
        try {
            const loggedUser: User = request.loggedUser;
            if (data != null) {
                const order: OrderDto | null = await this.service.sendTradeOrder(id, data, loggedUser.id);
                return order;
            } else {
                this.errorLog("Object not found", 'tradeOrder');

                throw new GenericException();
            }

        } catch (error) {
            this.errorLog(error, 'tradeOrder');

            throw new GenericException();
        }
    }
}