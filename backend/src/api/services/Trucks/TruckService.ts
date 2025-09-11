import { Container, Service } from 'typedi';

import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { Truck } from '@base/api/models/Truck';
import { TruckRepository } from '@base/api/repositories/Trucks/TruckRepository';

@Service()
export class TruckService extends ServiceBase<Truck> {

  constructor() {
    super(Container.get(TruckRepository));
  }

}
