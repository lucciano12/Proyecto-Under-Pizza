import { MovementType } from '../constants';

export interface IProduct {
  _id?: string; // MongoDB ID
  qrId: string; // UUID
  name: string;
  category: string;
  issuedAt?: string | Date; // Date string or Date object
  expiresAt?: string | Date;
  initialQuantity: number;
  description?: string;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  // Calculated fields
  currentStock?: number;
}

export interface IMovement {
  _id?: string;
  clientRequestId: string; // UUID for idempotency
  productId: string; // ObjectId string or IProduct
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
