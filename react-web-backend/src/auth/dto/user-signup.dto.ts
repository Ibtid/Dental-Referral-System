import { ApiProperty } from '@nestjs/swagger';

export class UserSignupDto {

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;

  @ApiProperty()
  phone: string;
}
