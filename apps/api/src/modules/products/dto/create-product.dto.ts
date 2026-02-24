import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  matches,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

//convierte  "dd/mm/yyyy" a Date valido para MongoDB
const parseDdMmYyyy = (value: string): string => {
  if (!value) return value; // Si no es, devuelve el valor original (undefined o null)
  const [day, month, year] = value.split('/');
  return new Date(`${year}-${month}-${day}`).toISOString();
};

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

  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'issuedAt must be in format dd/mm/yyyy',
  })
  @ApiProperty({
    description: 'Date when the product was issued',
    required: false,
    example: '19/09/2026',
  })
  //Fecha en la que el producto fue emitido, opcional y por defecto la fecha actual
  issuedAt?: string;

  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'expiresAt must be in format dd/mm/yyyy',
  })
  @ApiProperty({
    description: 'Expiration date of the product',
    required: false,
    example: '19/09/2026',
  })
  //Fecha de expiración del producto, opcional y por defecto 1 año después de la fecha de emisión
  expiresAt?: string;
}
