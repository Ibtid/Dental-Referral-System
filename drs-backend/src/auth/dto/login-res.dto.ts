import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResDto {
  @ApiResponseProperty()
  access_token: string;
}
