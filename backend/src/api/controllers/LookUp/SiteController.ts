import { OpenAPI } from "routing-controllers-openapi";
import { JsonController, Get, Param, Post, Body } from "routing-controllers";
import { ControllerBase } from "@base/infrastructure/abstracts/ControllerBase";
import { Inject, Service } from "typedi";
import { Site } from "@base/api/models/Site";
import { SiteService } from "@base/api/services/Trucks/SiteService";

@Service()
@OpenAPI({})
@JsonController('/sites')
export class SiteController extends ControllerBase {

  @Inject()
  private service: SiteService;

  public constructor() {
    super();
  }

  @Get()
  async findAll(): Promise<Site[]> {
    return await this.service.findAll();
  }
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Site | null> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: Partial<Site>): Promise<Site> {
    return this.service.create(data);
  }
}