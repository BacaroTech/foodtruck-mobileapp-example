import {
  Get,
  JsonController,
} from 'routing-controllers';
import { Service } from 'typedi';

import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';

@Service()
@OpenAPI({})
@JsonController('/version')
export class VersionController extends ControllerBase {

  @Get()
  public async getTest() {
    return "0.0.1";
  }
}