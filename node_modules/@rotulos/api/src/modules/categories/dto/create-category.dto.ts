import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the category',
    example: 'Beverages',
  }) // Nombre de la categoría
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of the category',
    example:
      'All kinds of drinks, including soft drinks, juices, and alcoholic beverages.',
  }) // Descripción de la categoría
  description?: string;
}
