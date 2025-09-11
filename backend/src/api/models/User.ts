import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EntityBase } from '@base/infrastructure/abstracts/EntityBase';
import { HashService } from '@base/infrastructure/services/hash/HashService';

import { Order } from './Order';
import { Role } from './Role';
import { Truck } from './Truck';

@Entity({ name: 'users' })
export class User extends EntityBase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "telephone" })
  telephone: string;

  @Column({ name: "password" })
  @Exclude()
  password: string;

  @Column({ name: "role_id" })
  roleId: number;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: "uuid" })
  uuid: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) this.password = await new HashService().make(this.password);
  }

  @BeforeInsert()
  async setDefaultRole() {
    const roleId = this.roleId ? this.roleId : 1;

    this.roleId = roleId;
  }

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @ManyToMany(
    (type) => Truck,
    (trucks) => trucks.users
  )
  @JoinTable({
    name: "users_trucks",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "truck_id",
      referencedColumnName: "id"
    }
  })
  trucks: Truck[]

}
