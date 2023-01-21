import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DBService } from '../database.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, DBService],
  exports: [UserService],
})
export class UserModule {}
