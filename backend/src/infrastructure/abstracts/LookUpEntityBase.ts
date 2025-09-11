import { Column } from 'typeorm';
import { EntityBase } from './EntityBase';

export abstract class LookUpEntityBase extends EntityBase {
  @Column()
  code: string;

  @Column()
  name: string;
}
