import { ApiProperty } from '@nestjs/swagger';

export class ClinicPaymentDto {
  @ApiProperty()
  clinicId: number;

  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  meansOfpayment: string;

  @ApiProperty()
  description: string;
}
