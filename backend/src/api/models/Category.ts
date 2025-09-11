import {
  Column,
  Entity,
  OneToMany,
  Unique,
} from 'typeorm';

import {
  LookUpEntityBase,
} from '@base/infrastructure/abstracts/LookUpEntityBase';

import { Dish } from './Dish';

@Entity({ name: 'categories' })
@Unique(['code'])
export class Category extends LookUpEntityBase {

  @Column({ name: "isenable" })
  isenable: boolean;

  @Column({ name: "type" })
  type: string;

  @Column({ name: "order" })
  order: number;

  @OneToMany(
    () => Dish, 
    dish => dish.categories
  )
  dishes: Dish[]
}
