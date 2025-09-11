import {
  Column,
  Entity,
  OneToMany,
  Unique,
} from 'typeorm';

import { TruckCalendars } from '@api/models/TruckCalendars';
import {
  LookUpEntityBase,
} from '@base/infrastructure/abstracts/LookUpEntityBase';

import { Order } from './Order';

@Entity({ name: 'days' })
@Unique(['code'])
export class Day extends LookUpEntityBase {

  @Column({ name: 'day_of_week'})
  dayOfWeek: number;

  @Column({ name: 'holiday'})
  holiday: Date;

  @Column({ name: 'custom_day'})
  customDay: Date;

  @OneToMany(() => TruckCalendars, truckCalendar => truckCalendar.truck)
  truckCalendars: TruckCalendars[];
  
  
  @OneToMany(() => Order, order => order.day)
  orders: Order[];
}
