import { Service } from 'typedi';

import { TruckCalendars } from '@base/api/models/TruckCalendars';
import { AppDataSource } from '@base/config/db';
import { IRepository } from '@base/infrastructure/abstracts/IRepository';
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';

@Service()
export class TruckCalendarRepository extends RepositoryBase<TruckCalendars> implements IRepository<TruckCalendars> {

  constructor() {
    super(AppDataSource.getRepository(TruckCalendars));
  }

  public async findAllJoined() {
    return this.repository.find({
      relations: {
        truck: true,
        site: true,
        day: true
      }
    });
  }
  public async findNowByTruckId(truckId: number) {
    const nowWeekDay = new Date().getDay();
    const today = new Date();
    return this.repository.find({
      relations: {
        truck: true,
        site: true,
        day: true
      },
      where: [
        {
          truck: {
            id: truckId
          },
          day: {
            dayOfWeek: nowWeekDay
          }
        },
        {
          truck: {
            id: truckId
          },          
          day: {
            customDay: today
          }
        },
        {
          truck: {
            id: truckId
          },          
          day: {
            holiday: today
          }
        }
      ]
    });
  }
  public async findNow() {
    const nowWeekDay = new Date().getDay();
    const today = new Date();
    return this.repository.find({
      relations: {
        truck: true,
        site: true,
        day: true
      },
      where: [
        {
          day: {
            dayOfWeek: nowWeekDay
          }
        },
        {
          day: {
            customDay: today
          }
        },
        {
          day: {
            holiday: today
          }
        }
      ]
    });
  }

  public async findWeek() {
    const nowWeekDay = new Date().getDay();
    const [startDayWeek, endDayWeek] = this.getStartEndWeek();

    return this.repository
      .createQueryBuilder("tc")
      .innerJoinAndSelect("tc.truck", "tr")
      .innerJoinAndSelect("tc.site", "si")
      .innerJoinAndSelect("tc.day", "d")
      .where("d.dayOfWeek IS NOT NULL or d.customDay >= :low AND d.customDay <= :high or d.holiday >= :low AND d.holiday <= :high")
      .setParameter("low", startDayWeek)
      .setParameter("high", endDayWeek)
      .getMany();

  }
  getWeek(date: Date) {
    const d = new Date(date);

    const dayOfWeek = d.getDay();

    // Start day of week (monday)
    const startWeek = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dayOfWeek);

    // End day of week (sunday)
    const endWeek = new Date(startWeek.getFullYear(), startWeek.getMonth(), startWeek.getDate() + 6);

    return {
      start: startWeek,
      end: endWeek,
    };
  }
  getStartEndWeek(): [Date, Date] {
    const result = this.getWeek(new Date())
    return [result.start, result.end]
  }



}
