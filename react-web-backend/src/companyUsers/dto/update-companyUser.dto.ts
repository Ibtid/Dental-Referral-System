import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyUserDto {

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  phone: string;
}
