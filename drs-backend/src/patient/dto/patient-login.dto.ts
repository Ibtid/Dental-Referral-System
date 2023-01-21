import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatientLoginDto {
  @ApiProperty()
  reportId: string;

  @ApiProperty()
  mobileNumber: string;
}
