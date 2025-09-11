import { Inject, Service } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import { ControllerBase } from "@base/infrastructure/abstracts/ControllerBase";
import { JsonController, Get, Param, Post, Body } from "routing-controllers";
import { ExtraService } from "@base/api/services/LookUp/ExtraService";
import { Extra } from "@base/api/models/Extra";

@Service()
@OpenAPI({})
@JsonController('/extra')
export class ExtraController extends ControllerBase {

  @Inject()
  private service: ExtraService;

  public constructor() {
    super();
  }
  @Get()
  async findAll(): Promise<Extra[]> {
    return await this.service.findAll();
  }
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Extra | null> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: Partial<Extra>): Promise<Extra> {
    return this.service.create(data);
  }
}