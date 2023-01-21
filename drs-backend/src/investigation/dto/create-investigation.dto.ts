import { ApiProperty } from '@nestjs/swagger';

export class CreateInvestigationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  referenceValue: string;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  comission: number;
}
