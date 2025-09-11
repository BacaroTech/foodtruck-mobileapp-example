import { Inject, Service } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import { ControllerBase } from "@base/infrastructure/abstracts/ControllerBase";
import { JsonController, Get, Param, Post, Body } from "routing-controllers";
import { DayService } from "@base/api/services/LookUp/DayService";
import { Day } from "@base/api/models/Day";

@Service()
@OpenAPI({})
@JsonController('/days')
export class DayController extends ControllerBase {

  @Inject()
  private service: DayService;

  public constructor() {
    super();
  }
  @Get()
  async findAll(): Promise<Day[]> {
    return await this.service.findAll();
  }
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Day | null> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: Partial<Day>): Promise<Day> {
    return this.service.create(data);
  }
}