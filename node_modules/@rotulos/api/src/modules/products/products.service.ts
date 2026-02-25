import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { MovementsService } from '../movements/movements.service';
import { MovementType } from '@rotulos/shared'; // Use shared enum

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>, //Inyectamos el modelo de producto para interactuar con la base de datos
    private movementsService: MovementsService,
  ) {}

  //#Ayduante
  private parseDdMmYyyy(value: string): Date {
    //Pasar de string a date con formato dd/mm/yyyy pensado para el campo de fechas de vencimiento (Siempre devuelve un objeto Date))
    const [day, month, year] = value.split('/'); //Divide el string cada vez que encuentra un /, devuelve un array
    return new Date(`${year}-${month}-${day}T00:00:00.000Z`); //Crear un template literal que construye el string en formato ISO 8601
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    //Crea un producto con un QR unico generado automaticamente
    const product = new this.productModel({
      ...createProductDto,
      qrId: uuidv4(), // Generate UUID

      //Convertir strings a Date para Mongoose
      issuedAt: createProductDto.issuedAt // Asignamos la fecha de emision,
        ? this.parseDdMmYyyy(createProductDto.issuedAt) //Si se proporciona una fecha de emision, la convertimos a Date con la funcion parseDdMmYyyy
        : undefined, //Si no, dejamos el campo como undefined
      expirationDate: createProductDto.expiresAt //Asignamos la fecha de vencimiento
        ? this.parseDdMmYyyy(createProductDto.expiresAt) //Si se proporciona una fecha de vencimiento, la convertimos a Date con la funcion parseDdMmYyyy
        : undefined, //Si no, dejamos el campo como undefined
    });
    return product.save(); //Guardamos el producto en la base de datos y lo devolvemos
  }

  async findAll(): Promise<Product[]> {
    //Encuentro o devuelve todos los productos, no se incluye el stock actual
    return this.productModel.find().exec();
  }

  async findByQr(qrId: string): Promise<any> {
    //Encuetra un producto por su QR y devuelve el producto junto con el stock actual calculado
    const product = await this.productModel.findOne({ qrId }).exec();
    if (!product) {
      throw new NotFoundException(`Product with QR ${qrId} not found`);
    }

    // Calcula el stock actual del producto
    const stock = await this.calculateStock(
      product._id.toString(),
      product.initialQuantity,
    );

    return {
      ...product.toObject(),
      currentStock: stock,
    };
  }

  async getStock(id: string): Promise<number> {
    //Obtiene el stock actual de un producto por su ID
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return this.calculateStock(id, product.initialQuantity);
  }

  private async calculateStock(
    productId: string,
    initialQuantity: number,
  ): Promise<number> {
    //Calcula el stock acutual de un producto sumando las entradas y restando las salidas a la cantidad inicial
    const movements = await this.movementsService.findByProduct(productId);

    const stock = movements.reduce((acc, mov) => {
      if (mov.type === MovementType.IN) {
        return acc + mov.quantity;
      } else if (mov.type === MovementType.OUT) {
        return acc - mov.quantity;
      }
      return acc;
    }, initialQuantity);

    return stock;
  }
}
