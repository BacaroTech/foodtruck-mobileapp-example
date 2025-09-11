import { Container, Service } from 'typedi';

import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { Extra } from '@base/api/models/Extra';
import { ExtraRepository } from '@base/api/repositories/LookUp/ExtraRepository';

@Service()
export class ExtraService extends ServiceBase<Extra> {

  constructor() {
    super(Container.get(ExtraRepository));
  }

}
