import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    try {
      const product = await this.prisma.product.create({
        data: createProductDto,
      });

      return product;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar produto');
    }
  }

  async findAll(): Promise<ProductResponseDto[]> {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    // Verifica se o produto existe
    await this.findOne(id);

    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });

      return product;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar produto');
    }
  }

  async remove(id: string): Promise<void> {
    // Verifica se o produto existe
    await this.findOne(id);

    try {
      await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar produto');
    }
  }

  async updateStock(id: string, quantity: number): Promise<ProductResponseDto> {
    const product = await this.findOne(id);

    const newStock = product.stock + quantity;

    if (newStock < 0) {
      throw new BadRequestException('Estoque insuficiente');
    }

    return this.update(id, { stock: newStock });
  }
}
