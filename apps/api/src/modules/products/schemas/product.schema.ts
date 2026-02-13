import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'QR code identifier for the product',
    example: 'QR1234567890',
  }) // Identificador del código QR para el producto
  qrId: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'Name of the product',
    example: 'Coca-Cola 500ml',
  }) // Nombre del producto
  name: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'Category of the product',
    example: 'Beverages',
  }) // Categoría del producto
  category: string;

  @Prop({ default: 0 })
  @ApiProperty({
    description: 'Initial quantity of the product in stock',
    example: 100,
  }) // Cantidad inicial del producto en stock
  initialQuantity: number;

  @Prop()
  @ApiProperty({
    description: 'Description of the product',
    example: 'A refreshing carbonated soft drink.',
  }) // Descripción del producto
  description: string;

  @Prop({ default: true })
  @ApiProperty({
    description: 'Indicates if the product is active',
    example: true,
  }) // Indica si el producto está activo
  isActive: boolean;

  @Prop({ required: false })
  @ApiProperty({
    description: 'Date when the product was issued',
    example: '2024-01-01T00:00:00.000Z',
  }) // Fecha en que el producto fue emitido
  issuedAt: Date;

  @Prop({ required: false })
  @ApiProperty({
    description: 'Date when the product expires',
    example: '2024-12-31T23:59:59.000Z',
  }) // Fecha en que el producto expira
  expiresAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
