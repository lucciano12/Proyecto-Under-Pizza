import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
// We might want to import MovementType from shared, but referencing relative path in monorepo for backend can be tricky if not built. 
// Using hardcoded enum or duplicating is safer for strictly decoupled build, but workspaces allow symlinks.
// Let's try to use the shared package strictly via import if configured.
// For now, I'll redefine or just use string with enum validation to be safe, but I installed @rotulos/shared so I should use it.
import { MovementType } from '@rotulos/shared';

export type MovementDocument = HydratedDocument<Movement>;

@Schema({ timestamps: true })
export class Movement {
  @Prop({ required: true, unique: true })
  clientRequestId: string; // Idempotency key

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: MovementType })
  type: MovementType;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop()
  notes: string;

  @Prop()
  performedBy: string;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);
