import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class UpdateOrderDto {
  @ApiProperty({
    enum: OrderStatus,
    description: 'Status do pedido',
    example: OrderStatus.COMPLETED,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderStatus, { message: 'Status inválido' })
  status?: OrderStatus;
}
