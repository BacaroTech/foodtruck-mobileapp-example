import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  Unique,
} from 'typeorm';

import {
  LookUpEntityBase,
} from '@base/infrastructure/abstracts/LookUpEntityBase';

import { OrdersItems } from './OrderItems';

@Entity({ name: 'extras' })
@Unique(['code'])
export class Extra extends LookUpEntityBase {

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  price: number;

  @ManyToMany(
    (type) => OrdersItems,
    (orderItems) => orderItems.extras,
    {
      cascade: true
    }
  )
  @JoinTable({
    name: "extras_order_items",
    synchronize: false,
    joinColumn: {
      name: "extra_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "order_item_id",
      referencedColumnName: "id",
    }
  })
  orderItems: OrdersItems[];
}
