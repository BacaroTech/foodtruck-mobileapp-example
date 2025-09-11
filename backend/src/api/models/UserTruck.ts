import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';

@Entity({ name: 'users_trucks' })
export class UserTruck extends EntityBase {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({name: "truck_id"})
  public truckId: number;

  @Column({name: "user_id"})
  public userId: number;

  // @ManyToOne(() => User, user => user.trucks)
  // user: User;

  // @ManyToOne(() => Truck, truck => truck.users)
  // truck: Truck;
}
