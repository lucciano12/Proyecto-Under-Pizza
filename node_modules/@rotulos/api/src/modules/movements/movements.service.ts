import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movement, MovementDocument } from './schemas/movement.schema'; // Correct relative import
import { Product, ProductDocument } from '../products/schemas/product.schema'; // Correct relative import
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class MovementsService {
  constructor(
    @InjectModel(Movement.name) private movementModel: Model<MovementDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async create(createMovementDto: CreateMovementDto): Promise<Movement> {
    const { clientRequestId, productId } = createMovementDto;

    // Idempotency Check
    const existing = await this.movementModel.findOne({ clientRequestId });
    if (existing) {
      return existing;
    }

    // Validate Product
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const createdMovement = new this.movementModel(createMovementDto);
    return createdMovement.save();
  }

  async findByProduct(productId: string): Promise<Movement[]> {
    return this.movementModel.find({ productId: new Types.ObjectId(productId) } as any).sort({ createdAt: -1 }).exec();
  }
}
