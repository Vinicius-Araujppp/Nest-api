import { ApiProperty } from '@nestjs/swagger';

export class OrderItemResponseDto {
  @ApiProperty({ description: 'ID do item' })
  id: string;

  @ApiProperty({ description: 'ID do produto' })
  productId: string;

  @ApiProperty({ description: 'Quantidade' })
  quantity: number;

  @ApiProperty({ description: 'Preço unitário no momento da compra' })
  price: number;

  @ApiProperty({ description: 'Nome do produto', required: false })
  product?: {
    id: string;
    name: string;
    description: string;
  };
}

export class OrderResponseDto {
  @ApiProperty({ description: 'ID do pedido' })
  id: string;

  @ApiProperty({ description: 'ID do usuário' })
  userId: string;

  @ApiProperty({ description: 'Valor total do pedido' })
  total: number;

  @ApiProperty({ description: 'Status do pedido' })
  status: string;

  @ApiProperty({ description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ type: [OrderItemResponseDto], description: 'Itens do pedido' })
  orderItems: OrderItemResponseDto[];

  @ApiProperty({ description: 'Dados do usuário', required: false })
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
