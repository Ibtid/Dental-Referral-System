import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

export class CreateInvoiceDto {
  @ApiProperty()
  patientId: number;

  @ApiPropertyOptional()
  clinicId?: number;

  @ApiProperty()
  investigation: Array<number>;

  @ApiProperty()
  mobileNumber: string;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  paid: number;

  @ApiProperty()
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional()
  paymentDescription?: string;

  @ApiProperty()
  deliveryTime: Date;
}
