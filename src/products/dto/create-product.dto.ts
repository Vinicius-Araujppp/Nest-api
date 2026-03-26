import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Notebook Dell', description: 'Nome do produto' })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @ApiProperty({ example: 'Notebook Dell Inspiron 15', description: 'Descrição do produto' })
  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @ApiProperty({ example: 2999.99, description: 'Preço do produto' })
  @IsNumber({}, { message: 'Preço deve ser um número' })
  @Min(0.01, { message: 'Preço deve ser maior que zero' })
  @IsNotEmpty({ message: 'Preço é obrigatório' })
  price: number;

  @ApiProperty({ example: 10, description: 'Quantidade em estoque' })
  @IsInt({ message: 'Estoque deve ser um número inteiro' })
  @Min(0, { message: 'Estoque não pode ser negativo' })
  @IsNotEmpty({ message: 'Estoque é obrigatório' })
  stock: number;
}
