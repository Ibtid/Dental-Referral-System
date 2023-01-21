import { ApiProperty } from '@nestjs/swagger';

export class ClinicLoginDto {
  @ApiProperty()
  mobile: string;
}
