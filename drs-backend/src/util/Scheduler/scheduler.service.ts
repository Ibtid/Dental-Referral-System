import { Injectable } from '@nestjs/common';
import * as schedule from 'node-schedule';
// export function scheduler(cb) {
//     console.log('welcome to schedule');
//     let today = new Date();
//     today.setMinutes(today.getMinutes() + 1);
//     schedule.scheduleJob(today,() => {
//         console.log(`The world is going to end today. ${new Date().getMinutes()} + ${today}`);
//         cb();
//     });
// };

@Injectable()
export class Scheduler {
  async start(callback: any) {
    const today = new Date();
    today.setMinutes(today.getMinutes() + 1);
    console.log(`This Scheduler will burst on ${today}`);
    schedule.scheduleJob(today, async () => {
      console.log('Boom...');
      await callback();
    });
  }
}
