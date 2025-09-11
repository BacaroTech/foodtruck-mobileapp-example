import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export abstract class EntityBase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
