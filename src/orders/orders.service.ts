import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const { items } = createOrderDto;

    // Busca todos os produtos do pedido
    const productIds = items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('Um ou mais produtos não foram encontrados');
    }

    // Valida estoque e calcula total
    let total = 0;
    const orderItemsData: Array<{ productId: string; quantity: number; price: number }> = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new NotFoundException(`Produto ${item.productId} não encontrado`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto ${product.name}. Disponível: ${product.stock}`,
        );
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    try {
      // Cria o pedido e atualiza o estoque em uma transação
      const order = await this.prisma.$transaction(async (prisma) => {
        // Cria o pedido com os itens
        const newOrder = await prisma.order.create({
          data: {
            userId,
            total,
            orderItems: {
              create: orderItemsData,
            },
          },
          include: {
            orderItems: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                  },
                },
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

        // Atualiza o estoque dos produtos
        for (const item of items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }

        return newOrder;
      });

      return order;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar pedido');
    }
  }

  async findAll(userId?: string): Promise<OrderResponseDto[]> {
    const where = userId ? { userId } : {};

    return this.prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId?: string): Promise<OrderResponseDto> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    // Se userId foi fornecido, verifica se o pedido pertence ao usuário
    if (userId && order.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para ver este pedido');
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, userId?: string): Promise<OrderResponseDto> {
    // Verifica se o pedido existe e se o usuário tem permissão
    await this.findOne(id, userId);

    try {
      const order = await this.prisma.order.update({
        where: { id },
        data: updateOrderDto,
        include: {
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return order;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar pedido');
    }
  }

  async remove(id: string, userId?: string): Promise<void> {
    // Verifica se o pedido existe e se o usuário tem permissão
    await this.findOne(id, userId);

    try {
      await this.prisma.order.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar pedido');
    }
  }
}
