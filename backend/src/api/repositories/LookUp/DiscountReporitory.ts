import { Service } from "typedi";
import { Day } from "@base/api/models/Day";
import { AppDataSource } from "@base/config/db";
import { IRepository } from "@base/infrastructure/abstracts/IRepository";
import { RepositoryBase } from "@base/infrastructure/abstracts/RepositoryBase";

@Service()
export class DayRepository extends RepositoryBase<Day>  implements IRepository<Day>{

  constructor() {
    super(AppDataSource.getRepository(Day));
  }

}