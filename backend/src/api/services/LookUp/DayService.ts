import { Container, Service } from 'typedi';

import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { Day } from '@base/api/models/Day';
import { DayRepository } from '@base/api/repositories/LookUp/DayRepository';

@Service()
export class DayService extends ServiceBase<Day> {

  constructor() {
    super(Container.get(DayRepository));
  }

}
