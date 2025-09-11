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

import { Order } from './Order';
import { TruckCalendars } from './TruckCalendars';
import { User } from './User';

@Entity({ name: 'trucks' })
@Unique(['code'])
export class Truck extends LookUpEntityBase {

  @Column()
  note: string;

  @OneToMany(() => TruckCalendars, truckCalendar => truckCalendar.truck)
  truckCalendars: TruckCalendars[];

  @OneToMany(() => Order, order => order.truck)
  orders: Order[];

  @Column()
  phone: string;

  @ManyToMany(() => User, user => user.trucks)
  @JoinTable({
    name: "users_trucks",
    joinColumn: {
      name: "truck_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users: User[];
  
}
