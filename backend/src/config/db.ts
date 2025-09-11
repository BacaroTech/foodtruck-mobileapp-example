import { DataSource } from 'typeorm';

import {
  Category,
  Day,
  Discounts,
  Dish,
  DishCategory,
  DishTag,
  Extra,
  ExtraOrderItems,
  Order,
  OrdersItems,
  Site,
  StateOrder,
  Tag,
  Truck,
  TruckCalendars,
  User,
  UserTruck,
} from '@base/api/models';
import { Role } from '@base/api/models/Role';
import { env } from '@base/utils/env';
import { MexLogger } from '@base/utils/logger';

const dbConfig = {
  type: 'postgres',
  dbHost: env('TYPEORM_HOST'),
  dbPort: env('TYPEORM_PORT'),
  dbDatabase: env('TYPEORM_DATABASE'),
  dbUsername: env('TYPEORM_USERNAME'),
  dbPassword: env('TYPEORM_PASSWORD'),
  dbEntities: env('TYPEORM_ENTITIES'),
  dbSchema: env('TYPEORM_SCHEMA'),
  allowLogging: false,
};
MexLogger.debug(dbConfig)
export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.dbHost,
    port: +dbConfig.dbPort,
    schema: dbConfig.dbSchema,
    username: dbConfig.dbUsername,
    password: dbConfig.dbPassword,
    database: dbConfig.dbDatabase,
    synchronize: false,
    logging: dbConfig.allowLogging,
    entities: [
      Day,
      Category,
      Discounts,
      Dish,
      DishCategory,
      DishTag,
      Extra,
      ExtraOrderItems,
      Order,
      OrdersItems,
      Site,
      StateOrder,
      Tag,
      Truck,
      User,
      TruckCalendars,
      UserTruck,
      Role
    ],
    // subscribers: [],
    // migrations: [],
})
// Container.set(DataSource, AppDataSource)