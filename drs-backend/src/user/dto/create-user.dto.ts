import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string[];

  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;
}
