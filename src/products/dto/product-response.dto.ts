import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ description: 'ID do produto' })
  id: string;

  @ApiProperty({ description: 'Nome do produto' })
  name: string;

  @ApiProperty({ description: 'Descrição do produto' })
  description: string;

  @ApiProperty({ description: 'Preço do produto' })
  price: number;

  @ApiProperty({ description: 'Quantidade em estoque' })
  stock: number;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;
}
