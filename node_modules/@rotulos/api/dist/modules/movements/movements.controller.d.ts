import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
export declare class MovementsController {
    private readonly movementsService;
    constructor(movementsService: MovementsService);
    create(createMovementDto: CreateMovementDto): Promise<import("./schemas/movement.schema").Movement>;
    findByProduct(productId: string): Promise<import("./schemas/movement.schema").Movement[]>;
}
