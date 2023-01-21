import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  speciality: string;

  @ApiProperty()
  organization?: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  contactNumber: string;

  @ApiProperty()
  email?: string;
}
