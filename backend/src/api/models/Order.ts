// orders.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

import { Day } from './Day';
import { OrdersItems } from './OrderItems';
import { Site } from './Site';
import { StateOrder } from './StateOrder';
import { Truck } from './Truck';
import { User } from './User';

@Entity({ name: 'orders' })
export class Order extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  modify_at?: Date;

  @UpdateDateColumn()
  delated_at?: Date;

  @Column({name: "ticket_code"})
  ticketCode: string;
  
  @Column({name: "pick_up_time_request" })
  pickUpTimeRequest?: Date;

  @Column({name: "pick_up_time_accepted"})
  pickUpTimeAccepted?: Date;
  
  @Column({name: "total"})
  total?: number;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @ManyToOne(() => Truck, truck => truck.orders)
  @JoinColumn({
    name: "truck_id",
  })
  truck: Truck;

  @ManyToOne(() => StateOrder, stateOrder => stateOrder.orders)
  @JoinColumn({
    name: "state_order_id",
  })
  stateOrder: StateOrder;

  @ManyToOne(() => Site, site => site.orders)
  @JoinColumn({
    name: "site_id",
  })
  site: Site;

  @ManyToOne(() => Day, day => day.orders)
  @JoinColumn({
    name: "day_id",
  })
  day: Day;

  @OneToMany(
    () => OrdersItems,
    ordersItem => ordersItem.order,
    {
      cascade: ['insert', 'update']
    }
  )
  ordersItems: OrdersItems[];
  
}
