import { Inject, Service } from "typedi";
import { OpenAPI } from "routing-controllers-openapi";
import { ControllerBase } from "@base/infrastructure/abstracts/ControllerBase";
import { JsonController, Get, Param, Post, Body } from "routing-controllers";
import { TagService } from "@base/api/services/LookUp/TagService";
import { Tag } from "@base/api/models";

@Service()
@OpenAPI({})
@JsonController('/tags')
export class TagController extends ControllerBase {

  @Inject()
  private service: TagService;

  public constructor() {
    super();
  }
  @Get()
  async findAll(): Promise<Tag[]> {
    return await this.service.findAll();
  }
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Tag | null> {
    return await this.service.findById(id);
  }

  @Post()
  async create(@Body() data: Partial<Tag>): Promise<Tag> {
    return this.service.create(data);
  }
}