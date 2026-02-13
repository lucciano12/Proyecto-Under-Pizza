import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('createProduct')
  @ApiOperation({ summary: 'Create a new product' })
  
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('findAllProducts')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('by-qr/:qrId')
  findByQr(@Param('qrId') qrId: string) {
    return this.productsService.findByQr(qrId);
  }

  @Get(':id/stock')
  async getStock(@Param('id') id: string) {
    const stock = await this.productsService.getStock(id);
    return { stock };
  }
}
