import { CronJob } from 'cron';
import * as fs from 'node:fs';
import * as path from 'node:path';

export const deleteExpiredFiles = new CronJob(
  '*/1440 * * * *',
  () => {
    fs.readdir('./files/exports', async (error, files) => {
      if (error) throw error;
      for (const file of files) {
        //const { birthtime } = fs.statSync(`./Exports/${file}`);
        const { birthtime } = fs.statSync(
          path.resolve(`./files/exports/${file}`),
        );

        const today = new Date();
        const diffSecond = Math.abs(
          (today.getTime() - birthtime.getTime()) / 1000,
        );

        const diffDays = Math.floor(diffSecond / (60 * 60 * 24));

        if (diffDays >= 60) {
          // fs.unlink(path.join('./Exports', file), (error) => {
          //   if (error) throw error;
          // });
          fs.unlink(
            path.join(path.resolve('./files/exports'), file),
            (error_) => {
              if (error_) {
                console.log(error_);
                throw error_;
              }
            },
          );
        }
      }
    });
  },
  undefined,
  true,
  'America/Los_Angeles',
);
