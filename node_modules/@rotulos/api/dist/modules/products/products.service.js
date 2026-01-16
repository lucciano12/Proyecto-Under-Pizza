"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const product_schema_1 = require("./schemas/product.schema");
const movements_service_1 = require("../movements/movements.service");
const shared_1 = require("@rotulos/shared");
let ProductsService = class ProductsService {
    productModel;
    movementsService;
    constructor(productModel, movementsService) {
        this.productModel = productModel;
        this.movementsService = movementsService;
    }
    async create(createProductDto) {
        const product = new this.productModel({
            ...createProductDto,
            qrId: (0, uuid_1.v4)(),
        });
        return product.save();
    }
    async findAll() {
        return this.productModel.find().exec();
    }
    async findByQr(qrId) {
        const product = await this.productModel.findOne({ qrId }).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product with QR ${qrId} not found`);
        }
        const stock = await this.calculateStock(product._id.toString(), product.initialQuantity);
        return {
            ...product.toObject(),
            currentStock: stock,
        };
    }
    async getStock(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product not found`);
        }
        return this.calculateStock(id, product.initialQuantity);
    }
    async calculateStock(productId, initialQuantity) {
        const movements = await this.movementsService.findByProduct(productId);
        const stock = movements.reduce((acc, mov) => {
            if (mov.type === shared_1.MovementType.IN) {
                return acc + mov.quantity;
            }
            else if (mov.type === shared_1.MovementType.OUT) {
                return acc - mov.quantity;
            }
            return acc;
        }, initialQuantity);
        return stock;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        movements_service_1.MovementsService])
], ProductsService);
//# sourceMappingURL=products.service.js.map