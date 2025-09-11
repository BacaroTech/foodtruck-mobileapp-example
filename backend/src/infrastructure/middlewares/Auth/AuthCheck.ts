import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import {
  Inject,
  Service,
} from 'typedi';

import { ClaimUser } from '@base/api/responses/Auth/ClaimUser';
import { UserService } from '@base/api/services/Auth/UserService';
import { authConfig } from '@base/config/auth';
import { MexLogger } from '@base/utils/logger';

@Service()
export class AuthCheck implements ExpressMiddlewareInterface {

  @Inject()
  userService: UserService;

  use(request: any, response: Response, next?: (err?: any) => any): any {

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      MexLogger.warn("AuthHeader undefined")
      return response.status(401).send({ status: 403, message: 'Unauthorized!' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, authConfig.providers.jwt.secret, (err: any, user: any) => {
      if (err) {
        MexLogger.warn("Verify AuthHeader error", err)
        return response.status(403).send({ status: 403, message: 'Forbidden!' });
      }

      const uuid = (user as ClaimUser).tu;

      this.userService.findByUuid(uuid)
        .then((userStored) => {
          if (userStored) {
            request.loggedUser = userStored;
            if (next)
              next();
          } else {
            MexLogger.warn("Verify User not found", err)
            response.status(403).send({ status: 403, message: 'Forbidden!' });

          }

        })
        .catch((err) => {
          MexLogger.error("Error log", err);
          response.status(403).send({ status: 403, message: 'Forbidden!' });
        })

      // const userStored = this.userService.findByUuid(uuid)
      // if (userStored) {
      //   request.loggedUser = user;
      //   if (next)
      //     next();
      // } else {
      //   return response.status(403).send({ status: 403, message: 'Forbidden!' });
      // }
    });
  }
}
