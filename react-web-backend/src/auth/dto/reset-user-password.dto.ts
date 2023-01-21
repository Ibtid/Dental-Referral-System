import { ApiProperty } from '@nestjs/swagger';

export class ResetUserPasswordDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  newPassword: string;

  @ApiProperty()
  confirmPassword: string;
}
