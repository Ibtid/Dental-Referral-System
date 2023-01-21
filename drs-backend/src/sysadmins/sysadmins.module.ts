import { Module } from '@nestjs/common';
import { SysadminsService } from './sysadmins.service';
import { SysadminsController } from './sysadmins.controller';

@Module({
  controllers: [SysadminsController],
  providers: [SysadminsService],
})
export class SysadminsModule {}
