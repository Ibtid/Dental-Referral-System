import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserPasswordDto {
  @ApiProperty()
  oldPassword: string;

  @ApiProperty()
  newPassword: string;

  @ApiProperty()
  confirmPassword: string;
}
