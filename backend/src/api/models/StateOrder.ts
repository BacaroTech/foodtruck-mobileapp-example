import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

import { Order } from './Order';

@Entity({ name: 'state_orders' })
@Unique(['code'])
export class StateOrder extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Order, orders => orders.stateOrder)
  orders: Order[]

}
