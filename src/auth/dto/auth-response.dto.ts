import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'Token JWT de acesso' })
  access_token: string;

  @ApiProperty({ description: 'Dados do usuário' })
  user: {
    id: string;
    email: string;
    name: string;
  };
}
