import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

import { Extra } from './Extra';
import { OrdersItems } from './OrderItems';

@Entity({ name: 'extras_order_items' })
export class ExtraOrderItems extends EntityBase {

  @PrimaryGeneratedColumn({ name: "id"})
  id: number;

  @Column({ name: "order_item_id" })
  public orderItemId: number;

  @Column({ name: "extra_id" })
  public extraId: number;

  @ManyToOne(() => OrdersItems, orderItems => orderItems.extras)
  @JoinColumn({
    name: "order_item_id",
  })
  orderItem: OrdersItems;

  @ManyToOne(() => Extra, extra => extra.orderItems)
  @JoinColumn({
    name: "extra_id",
  })
  extra: Extra;
}
