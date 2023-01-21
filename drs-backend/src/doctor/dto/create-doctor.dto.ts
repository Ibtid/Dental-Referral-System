import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
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
