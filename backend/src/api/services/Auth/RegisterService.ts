import {
  Inject,
  Service,
} from 'typedi';

import { UserRepository } from '@api/repositories/Users/UserRepository';
import { AlreadyExistError } from '@base/api/exceptions/Auth/AlreadyExistError';
import { RegisterRequest } from '@base/api/requests/Auth/RegisterRequest';
import { ClaimUser } from '@base/api/responses/Auth/ClaimUser';
import {
  EventDispatcher,
  EventDispatcherInterface,
} from '@base/decorators/EventDispatcher';
import { AuthService } from '@base/infrastructure/services/auth/AuthService';
import { MexLogger } from '@base/utils/logger';

@Service()
export class RegisterService {

  @Inject()
  private userRepository: UserRepository;

  @Inject()
  private authService: AuthService;

  constructor(
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async register(data: RegisterRequest) {
    try {
      const userAlreadyRegistered = await this.userRepository.findOneByEmail(data.email);
      if (userAlreadyRegistered) {
        throw new AlreadyExistError(`Utente già registrato`);
      }
      await this.userRepository.createUser(data);
      const userCreated = await this.userRepository.findOneByEmail(data.email);
      if (!userCreated) {
        throw new AlreadyExistError(`Utente già registrato`);
      }
      // try {
      //   this.eventDispatcher.dispatch('onUserRegister', userCreated);

      // } catch (error) {
      //   MexLogger.error("Send email error", error)
      // }
      const claimUser: ClaimUser = {
        tu: userCreated.uuid,
        r: ''
      }
      return this.authService.sign(
        claimUser,
        { user: claimUser },
      );
    } catch (error) {
      MexLogger.error("register Error: ", error)
      throw error;
    }
  }
}
