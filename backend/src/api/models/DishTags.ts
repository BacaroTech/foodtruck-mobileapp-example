import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Dish } from './Dish';
import { Tag } from './Tag';
import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';


@Entity({ name: 'dishes_tags' })
export class DishTag extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({name: "dish_id"})
  public dishId: number;

  @Column({name: "tag_id"})
  public tagId: number;

  @ManyToOne(() => Dish, dish => dish.tags)
  dish: Dish;

  @ManyToOne(() => Tag, tag => tag.dishes)
  tag: Tag;
}
