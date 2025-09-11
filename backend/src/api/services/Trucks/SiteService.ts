import { Container, Service } from 'typedi';

import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { Site } from '@base/api/models/Site';
import { SiteRepository } from '@base/api/repositories/Trucks/SiteRepository';

@Service()
export class SiteService extends ServiceBase<Site> {

  constructor() {
    super(Container.get(SiteRepository));
  }

}
