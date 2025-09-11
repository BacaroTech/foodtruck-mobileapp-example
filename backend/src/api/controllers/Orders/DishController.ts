import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import {
  Inject,
  Service,
} from 'typedi';

import { Dish } from '@base/api/models/Dish';
import { DishDTO } from '@base/api/responses/Orders/order.interface';
import { DishService } from '@base/api/services/Orders/DishService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';

@Service()
@OpenAPI({})
@JsonController('/dishes')
export class DishController extends ControllerBase {

  @Inject()
  private service: DishService;

  public constructor() {
    super();
  }

  @Get()
  async findAll(): Promise<DishDTO[]> {
    return await this.service.findAllDTO();
  }
  
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<DishDTO | null> {
    return await this.service.findByIdFull(id);
  }

  // @Get('/category/:idCategory')
  // async findAllByIdCategory(@Param('idCategory') idCategory: number): Promise<DishDTO[]> {
  //   return await this.service.findAllByIdCategory(idCategory);
  // }

  @Get('/category/:codeCategory')
  async findAllByCodeCategory(@Param('codeCategory') code: string): Promise<DishDTO[]> {
    return await this.service.findAllByCodeCategory(code);
  }

  @Post()
  async create(@Body() data: Partial<Dish>): Promise<DishDTO> {
    return this.service.create(data);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
     @Body() data: DishDTO
     ): Promise<DishDTO | null> {
    try {
      const dish = this.service.update(id, data);
      return dish;
    } catch(e) {
      console.error(e);
      return null;
    }
  }
}