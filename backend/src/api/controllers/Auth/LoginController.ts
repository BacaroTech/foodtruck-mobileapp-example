import {
  Body,
  Get,
  JsonController,
  Post,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import {
  Inject,
  Service,
} from 'typedi';

import { LoginRequest } from '@base/api/requests/Auth/LoginRequest';
import { AuthResponseDTO } from '@base/api/responses/Auth/auth.interface';
import { LoginService } from '@base/api/services/Auth/LoginService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';

@Service()
@OpenAPI({
  tags: ['Auth'],
})
@JsonController('/login')
export class LoginController extends ControllerBase {
  
  @Inject()
  private loginService: LoginService;

  public constructor() {
    super();
  }

  @Post()
  public async login(@Body() user: LoginRequest): Promise<AuthResponseDTO> {
    const obj = await this.loginService.login(user);
    return obj as AuthResponseDTO;
  }

  @Get()
  public async getTest() {
    return "hello";
  }

}