import { IsString, IsNotEmpty, IsNumber, Min, IsEnum, IsOptional } from 'class-validator';
import { MovementType } from '@rotulos/shared';

export class CreateMovementDto {
  @IsString()
  @IsNotEmpty()
  clientRequestId: string; // UUID v4

  @IsString()
  @IsNotEmpty()
  productId: string; // Mongo ObjectId

  @IsEnum(MovementType)
  type: MovementType;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  performedBy?: string;
}
