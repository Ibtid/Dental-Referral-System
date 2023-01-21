import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvestigationDto {
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
  bonus: number;

  @ApiProperty()
  isDeleted: boolean;
}
