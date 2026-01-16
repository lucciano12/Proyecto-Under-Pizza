import { MovementType } from '@rotulos/shared';
export declare class CreateMovementDto {
    clientRequestId: string;
    productId: string;
    type: MovementType;
    quantity: number;
    notes?: string;
    performedBy?: string;
}
