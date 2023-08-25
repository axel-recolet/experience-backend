import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  access_token: string;
}
