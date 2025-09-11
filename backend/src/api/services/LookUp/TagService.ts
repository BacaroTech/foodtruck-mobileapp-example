import { Container, Service } from 'typedi';

import { ServiceBase } from '@base/infrastructure/abstracts/ServiceBase';
import { Tag } from '@base/api/models';
import { TagRepository } from '@base/api/repositories/LookUp/TagRepository';

@Service()
export class TagService extends ServiceBase<Tag> {

  constructor() {
    super(Container.get(TagRepository));
  }

}
