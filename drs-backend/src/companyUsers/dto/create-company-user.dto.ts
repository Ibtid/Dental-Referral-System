import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyUserDto {
  @ApiProperty()
  userId: number;
}
