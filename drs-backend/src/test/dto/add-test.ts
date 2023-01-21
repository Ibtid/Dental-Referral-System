import { ApiProperty } from '@nestjs/swagger';

export class AddTestDataDto {
  @ApiProperty()
  investigationAmount: number;
}
