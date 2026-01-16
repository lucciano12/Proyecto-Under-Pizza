import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  qrId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ default: 0 })
  initialQuantity: number;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: false })
  issuedAt: Date;

  @Prop({ required: false })
  expiresAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
