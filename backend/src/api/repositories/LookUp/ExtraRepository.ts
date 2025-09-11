import { Service } from "typedi";
import { Extra } from "@base/api/models/Extra";
import { AppDataSource } from "@base/config/db";
import { IRepository } from "@base/infrastructure/abstracts/IRepository";
import { RepositoryBase } from "@base/infrastructure/abstracts/RepositoryBase";

@Service()
export class ExtraRepository extends RepositoryBase<Extra>  implements IRepository<Extra>{

  constructor() {
    super(AppDataSource.getRepository(Extra));
  }

}