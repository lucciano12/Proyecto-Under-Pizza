import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Name of the category',
    example: 'Beverages',
  }) // Nombre de la categoría
  name: string;

  @Prop()
  @ApiProperty({
    description: 'Description of the category',
    example:
      'All kinds of drinks, including soft drinks, juices, and alcoholic beverages.',
  }) // Descripción de la categoría
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
