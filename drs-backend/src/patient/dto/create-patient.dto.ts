import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  contactNumber: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  age: number;
}
