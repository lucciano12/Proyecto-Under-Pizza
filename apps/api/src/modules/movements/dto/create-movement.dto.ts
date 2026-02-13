import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { MovementType } from '@rotulos/shared';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovementDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique identifier for idempotency',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }) // Identificador único para idempotencia
  clientRequestId: string; // UUID v4

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID of the product associated with the movement',
    example: '60d5f9b8c2a1a4567890abcd',
  }) // ID del producto asociado al movimiento
  productId: string; // Mongo ObjectId

  @IsEnum(MovementType)
  @ApiProperty({
    description: 'Type of movement (IN or OUT)',
    example: 'IN',
  }) // Tipo de movimiento (ENTRADA o SALIDA)
  type: MovementType;

  @IsNumber()
  @ApiProperty({
    description: 'Quantity of the movement (must be greater than 0)',
    example: 10,
  }) // Cantidad del movimiento (debe ser mayor a 0)
  @Min(1)
  quantity: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Optional notes about the movement',
    example: 'Received new stock from supplier',
  }) // Notas opcionales sobre el movimiento
  notes?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'ID of the user who performed the movement',
    example: '60d5f9b8c2a1a4567890abcd',
  }) // ID del usuario que realizó el movimiento
  performedBy?: string;
}
