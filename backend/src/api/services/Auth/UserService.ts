import {
  Inject,
  Service,
} from 'typedi';

import {
  InvalidRequestException,
} from '@base/api/exceptions/Application/InvalidRequest';
import {
  UserNotFoundException,
} from '@base/api/exceptions/Users/UserNotFoundException';
import { User } from '@base/api/models';
import { UserRepository } from '@base/api/repositories/Users/UserRepository';
import {
  UserByAdminPWRequest,
  UserPWRequest,
} from '@base/api/requests/Auth';

@Service()
export class UserService {
  @Inject()
  private userRepository: UserRepository;

  public async findByUuid(uuid: string) {
    if (!uuid) {
      throw new InvalidRequestException();
    }
    const user = await this.userRepository.findOneByUuid(uuid);
    if (user) {
      return user;
    }

    throw new UserNotFoundException();
  }

  public async getMyRole(uuid: string) {
    if (!uuid) {
      throw new InvalidRequestException();
    }
    const user = await this.userRepository.findOneByUuidJoinRole(uuid);
    if (user) {
      return user.role.code;
    } else {

      throw new UserNotFoundException();

    }
  }

  public async changePw(user: User, userRequest: UserPWRequest) {

    if (!user) {
      throw new UserNotFoundException();
    }
    if (!userRequest) {
      throw new InvalidRequestException();
    }
    const newPassword = userRequest.newPassword;
    if (!newPassword || newPassword === '') {
      throw new InvalidRequestException();
    }

    this.userRepository.update(user.id, {
      password: newPassword
    })

    console.info("Password updated");
    return;
  }

  public async unregister(user: User) {
    if (!user) {
      throw new InvalidRequestException();
    }
    const email = user.email;
    console.warn("Eliminazione utente " + email );

    if (user.role.code === 'TRUCK' || user.role.code === 'ADMIN') {
      console.warn("hai provato a eliminare qualcosa che non dovevi")
      throw new InvalidRequestException();
    }
    
    this.userRepository.delete(user.id);
    console.warn("Utente eliminato " + email );

    return;
  }

  public async resetPw(userRequest: UserByAdminPWRequest) {
    if (!userRequest || !userRequest.uuid || userRequest.uuid === "" || !userRequest.newPassword || userRequest.newPassword === "") {
      throw new InvalidRequestException();
    }
    const user = await this.userRepository.findOneByUuid(userRequest.uuid);

    if (!user) {
      throw new UserNotFoundException();
    }

    this.userRepository.update(user.id, {
      password: userRequest.newPassword
    })


    console.info("Password updated: User:" + userRequest.uuid);
    return;

  }
}