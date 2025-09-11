import { LookUpEntityBase } from '@base/infrastructure/abstracts/LookUpEntityBase';
import { Entity, OneToMany, Unique } from 'typeorm';
import { Dish } from './Dish';

@Entity({ name: 'tags' })
@Unique(['code'])
export class Tag extends LookUpEntityBase {

  @OneToMany(
    () => Dish,
    dish => dish.tags
  )
  dishes: Dish[]
}
