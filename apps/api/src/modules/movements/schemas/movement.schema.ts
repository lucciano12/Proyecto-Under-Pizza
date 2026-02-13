import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
// We might want to import MovementType from shared, but referencing relative path in monorepo for backend can be tricky if not built. 
// Using hardcoded enum or duplicating is safer for strictly decoupled build, but workspaces allow symlinks.
// Let's try to use the shared package strictly via import if configured.
// For now, I'll redefine or just use string with enum validation to be safe, but I installed @rotulos/shared so I should use it.
import { MovementType } from '@rotulos/shared';
import { ApiProperty } from '@nestjs/swagger';

export type MovementDocument = HydratedDocument<Movement>;

@Schema({ timestamps: true })
export class Movement {
  @Prop({ required: true, unique: true })
  @ApiProperty
  ({
    description: 'Unique identifier for idempotency',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }) // Identificador único para idempotencia
  clientRequestId: string; // Idempotency key

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  @ApiProperty({
    description: 'ID of the product associated with the movement',
    example: '60d5f9b8c2a1a4567890abcd',
  }) // ID del producto asociado al movimiento
  productId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: MovementType })
  @ApiProperty({
    description: 'Type of movement (IN or OUT)',
    example: 'IN',
  }) // Tipo de movimiento (ENTRADA o SALIDA)
  type: MovementType;

  @Prop({ required: true, min: 1 })
  @ApiProperty({
    description: 'Quantity of the movement (must be greater than 0)',
    example: 10,
  }) // Cantidad del movimiento (debe ser mayor a 0)
  quantity: number;

  @Prop()
  @ApiProperty({
    description: 'Optional notes about the movement',
    example: 'Received new stock from supplier',
  }) // Notas opcionales sobre el movimiento
  notes: string;

  @Prop()
  @ApiProperty({
    description: 'ID of the user who performed the movement',
    example: '60d5f9b8c2a1a4567890abcd',
  }) // ID del usuario que realizó el movimiento
  performedBy: string;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
