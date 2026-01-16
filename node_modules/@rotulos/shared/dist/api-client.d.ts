import { IProduct, IMovement, ICategory } from './types';
export declare class RotulosApiClient {
    private client;
    constructor(baseURL?: string);
    getProducts(): Promise<IProduct[]>;
    getProductByQr(qrId: string): Promise<IProduct>;
    createProduct(data: Partial<IProduct>): Promise<IProduct>;
    getProductStock(id: string): Promise<{
        stock: number;
    }>;
    createMovement(data: Partial<IMovement>): Promise<IMovement>;
    getMovements(productId: string): Promise<IMovement[]>;
    getCategories(): Promise<ICategory[]>;
    createCategory(data: Partial<ICategory>): Promise<ICategory>;
}
