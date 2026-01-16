import { Model } from 'mongoose';
import { Movement, MovementDocument } from './schemas/movement.schema';
import { ProductDocument } from '../products/schemas/product.schema';
import { CreateMovementDto } from './dto/create-movement.dto';
export declare class MovementsService {
    private movementModel;
    private productModel;
    constructor(movementModel: Model<MovementDocument>, productModel: Model<ProductDocument>);
    create(createMovementDto: CreateMovementDto): Promise<Movement>;
    findByProduct(productId: string): Promise<Movement[]>;
}
