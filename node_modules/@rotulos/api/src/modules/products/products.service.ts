import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { MovementsService } from '../movements/movements.service';
import { MovementType } from '@rotulos/shared'; // Use shared enum

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private movementsService: MovementsService,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel({
      ...createProductDto,
      qrId: uuidv4(), // Generate UUID
    });
    return product.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findByQr(qrId: string): Promise<any> {
    const product = await this.productModel.findOne({ qrId }).exec();
    if (!product) {
      throw new NotFoundException(`Product with QR ${qrId} not found`);
    }

    // Calculate stock
    const stock = await this.calculateStock(product._id.toString(), product.initialQuantity);

    return {
      ...product.toObject(),
      currentStock: stock,
    };
  }

  async getStock(id: string): Promise<number> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return this.calculateStock(id, product.initialQuantity);
  }

  private async calculateStock(productId: string, initialQuantity: number): Promise<number> {
    const movements = await this.movementsService.findByProduct(productId);

    const stock = movements.reduce((acc, mov) => {
      if (mov.type === MovementType.IN) {
        return acc + mov.quantity;
      } else if (mov.type === MovementType.OUT) {
        return acc - mov.quantity;
      }
      return acc;
    }, initialQuantity);

    return stock;
  }
}
