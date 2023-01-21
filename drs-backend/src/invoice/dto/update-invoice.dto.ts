import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvoiceDto {
  @ApiProperty()
  amount: number;
}
