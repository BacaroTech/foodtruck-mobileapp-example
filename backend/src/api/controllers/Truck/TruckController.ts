import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import {
  Inject,
  Service,
} from 'typedi';

import { Truck } from '@base/api/models/Truck';
import { TruckService } from '@base/api/services/Trucks/TruckService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';

@Service()
@OpenAPI({})
@JsonController('/trucks')
export class TruckController extends ControllerBase {

  @Inject()
  private service: TruckService;

  public constructor() {
    super();
  }

  @Get()
  async findAll(): Promise<Truck[]> {
    return await this.service.findAll();
  }
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Truck | null> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: Partial<Truck>): Promise<Truck> {
    return this.service.create(data);
  }
}