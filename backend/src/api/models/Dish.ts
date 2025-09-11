import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Unique,
} from 'typeorm';

import {
  LookUpEntityBase,
} from '@base/infrastructure/abstracts/LookUpEntityBase';

import { Category } from './Category';
import { OrdersItems } from './OrderItems';
import { Tag } from './Tag';

@Entity({ name: 'dishes' })
@Unique(['code'])
export class Dish extends LookUpEntityBase {

  @Column()
  description: string;

  @Column()
  note: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  price: number;

  @OneToMany(() => OrdersItems, ordersItem => ordersItem.dish)
  ordersItems: OrdersItems[];

  @ManyToMany(
    (type) => Category,
    (categories) => categories.dishes,
    {
      cascade: true
    }
  )
  @JoinTable({
    name: "dishes_categories",
    synchronize: false,
    joinColumn: {
      name: "dish_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "id",
    }
  })
  categories: Category[];

  @ManyToMany(
    (type) => Tag, 
    (tags)=> tags.dishes,
    {
      cascade: true
    }
  )
  @JoinTable({
    name: "dishes_tags",
    synchronize: false,
    joinColumn: {
      name: "dish_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id",
    },
  })
  tags: Tag[];
}
