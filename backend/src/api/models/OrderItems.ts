import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

import { Dish } from './Dish';
import { Extra } from './Extra';
import { Order } from './Order';

@Entity({ name: 'orders_items' })
export class OrdersItems extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Order,
    order => order.ordersItems
  )
  @JoinColumn({
    name: "order_id",
  })
  order: Order;

  @ManyToOne(
    () => Dish,
    dish => dish.ordersItems
  )
  @JoinColumn({
    name: "dish_id",
  })
  dish: Dish;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: false, default: 1 })
  quantity: number;

  @OneToMany(
    () => Extra, 
    extra => extra.orderItems
  )
  extras: Extra[];
}
