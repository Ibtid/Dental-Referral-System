import { ApiProperty } from '@nestjs/swagger';
export class UpdateRoleDto {
  @ApiProperty()
  role: string;
}
