import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { MovementsService } from '../movements/movements.service';
export declare class ProductsService {
    private productModel;
    private movementsService;
    constructor(productModel: Model<ProductDocument>, movementsService: MovementsService);
    private parseDdMmYyyy;
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByQr(qrId: string): Promise<any>;
    getStock(id: string): Promise<number>;
    private calculateStock;
}
