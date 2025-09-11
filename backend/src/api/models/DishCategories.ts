import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

import { Category } from './Category';
import { Dish } from './Dish';

@Entity({ name: 'dishes_categories' })
export class DishCategory extends EntityBase {

  @PrimaryGeneratedColumn({ name: "id"})
  id: number;

  @Column({ name: "category_id" })
  public categoriaId: number;

  @Column({ name: "dish_id" })
  public dishId: number;

  @ManyToOne(() => Category, category => category.dishes)
  @JoinColumn({
    name: "category_id",
  })
  category: Category;

  @ManyToOne(() => Dish, dish => dish.categories)
  @JoinColumn({
    name: "dish_id",
  })
  dish: Dish;
}
