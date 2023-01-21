import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class CreateClinicDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  mobile: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  longitude: string;

  @ApiPropertyOptional()
  latitude: string;

  @ApiProperty()
  status: Status;
}
