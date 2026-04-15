import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ description: 'ID do usuário' })
  id: string;

  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto> = {}) {
    Object.assign(this, partial);
  }
}
