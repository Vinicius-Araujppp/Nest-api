import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'ID do produto' })
  @IsNotEmpty({ message: 'ID do produto é obrigatório' })
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantidade' })
  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    type: [OrderItemDto],
    description: 'Lista de itens do pedido',
    example: [
      { productId: '507f1f77bcf86cd799439011', quantity: 2 },
      { productId: '507f1f77bcf86cd799439012', quantity: 1 },
    ],
  })
  @IsArray({ message: 'Items deve ser um array' })
  @ArrayMinSize(1, { message: 'Pedido deve ter pelo menos um item' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
