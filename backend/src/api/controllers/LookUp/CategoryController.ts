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

import { Category } from '@base/api/models/Category';
import { CategoryDTO } from '@base/api/responses/LookUp/lookup.interface';
import { CategoryService } from '@base/api/services/LookUp/CategoryService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';

@Service()
@OpenAPI({})
@JsonController('/categories')
export class CategoryController extends ControllerBase {

  @Inject()
  private service: CategoryService;

  public constructor() {
    super();
  }
  @Get()
  async findAll(): Promise<CategoryDTO[]> {
    return await this.service.findAllDto();
  }

  @Get("/menu")
  async findAllCategoryMenu(): Promise<CategoryDTO[]> {
    return await this.service.findAllDishCategory();
  }
  
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Category | null> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: Partial<Category>): Promise<Category> {
    return this.service.create(data);
  }
}