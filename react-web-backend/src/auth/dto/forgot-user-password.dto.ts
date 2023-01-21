import { ApiProperty } from '@nestjs/swagger';

export class ForgotUserPasswordDto {
  @ApiProperty()
  email: string;
}
