import {
  Body,
  JsonController,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import {
  Inject,
  Service,
} from 'typedi';

import { RegisterRequest } from '@api/requests/Auth/RegisterRequest';
import { RegisterService } from '@api/services/Auth/RegisterService';
import { AuthResponseDTO } from '@base/api/responses/Auth/auth.interface';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';

@Service()
@OpenAPI({
  tags: ['Auth'],
})
@JsonController('/register')
export class RegisterController extends ControllerBase {

  @Inject()
  private registerService: RegisterService;

  public constructor() {
    super();
  }

  @Post()
  public async register(@Body() user: RegisterRequest): Promise<AuthResponseDTO> {
      const obj = await this.registerService.register(user);
      return obj as AuthResponseDTO;      

  }
}