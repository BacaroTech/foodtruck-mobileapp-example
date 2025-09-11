import {
  Column,
  Entity,
  OneToMany,
  Unique,
} from 'typeorm';

import {
  LookUpEntityBase,
} from '@base/infrastructure/abstracts/LookUpEntityBase';

import { Order } from './Order';
import { TruckCalendars } from './TruckCalendars';

@Entity({ name: 'sites' })
@Unique(['code'])
export class Site extends LookUpEntityBase {

  @Column()
  address: string;

  @OneToMany(() => TruckCalendars, truckCalendar => truckCalendar.truck)
  truckCalendars: TruckCalendars[];

  @OneToMany(() => Order, order => order.site)
  orders: Order[];

}
