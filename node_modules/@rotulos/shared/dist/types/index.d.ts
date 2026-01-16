import { MovementType } from '../constants';
export interface IProduct {
    _id?: string;
    qrId: string;
    name: string;
    category: string;
    issuedAt?: string | Date;
    expiresAt?: string | Date;
    initialQuantity: number;
    description?: string;
    isActive: boolean;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    currentStock?: number;
}
export interface IMovement {
    _id?: string;
    clientRequestId: string;
    productId: string;
    type: MovementType;
    quantity: number;
    notes?: string;
    performedBy?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
export interface ICategory {
    _id?: string;
    name: string;
    description?: string;
}
export interface ProductStockResponse extends IProduct {
    currentStock: number;
}
