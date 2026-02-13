import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the product' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Category of the product' })
  category: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'Initial quantity of the product',
    required: false,
  }) //Cantidad inicial del producto, opcional y por defecto 0
  initialQuantity?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of the product',
    required: false,
  })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Whether the product is active',
    required: false,
  }) //Indica si el producto está activo o inactivo, opcional y por defecto true
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Date when the product was issued',
    required: false,
  })
  //Fecha en la que el producto fue emitido, opcional y por defecto la fecha actual
  issuedAt?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Expiration date of the product',
    required: false,
  })
  //Fecha de expiración del producto, opcional y por defecto 1 año después de la fecha de emisión
  expiresAt?: string;
}
