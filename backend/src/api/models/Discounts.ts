import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { LookUpEntityBase } from '@base/infrastructure/abstracts/LookUpEntityBase';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'discounts' })
@Unique(['code'])
export class Discounts extends LookUpEntityBase {

  @Column()
  value: number;

  @Column()
  percentage: number;
}
