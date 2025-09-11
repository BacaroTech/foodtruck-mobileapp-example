import {
  Cron,
  CronController,
} from 'cron-decorators';
import {
  Inject,
  Service,
} from 'typedi';

import { Order } from '../models';
import { DailyCleanUpService } from '../services/Orders/DailyCleanUpService';

const every12H = '0 */12 * * *';
const at02AM = '0 2 * * *';
const everySecond = '*/15 * * * * *';
const everyMinuteSecond = '* * * * *';

@Service()
@CronController()
export class EndServiceCronJob {

  @Inject()
  private dailyCleanUpService: DailyCleanUpService;

  @Cron('Log every second', at02AM)
  public async handle(): Promise<void> {
    
    try {
      const pastOrders: Order[] = await this.dailyCleanUpService.getAllPastOrders();
      console.log(new Date().toTimeString() + '. I am cron Job and I just ran. Ci sono ' + pastOrders.length + " da cancellare");

      if (pastOrders.length > 0) {
        this.dailyCleanUpService.cleanPastOrders(pastOrders);
      }      
    } catch (error) {
      console.warn(new Date().toTimeString() + "EndServiceCronJob Error: ", error);
    }

  }
}