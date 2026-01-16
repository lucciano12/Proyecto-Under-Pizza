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
exports.MovementsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const movement_schema_1 = require("./schemas/movement.schema");
const product_schema_1 = require("../products/schemas/product.schema");
let MovementsService = class MovementsService {
    movementModel;
    productModel;
    constructor(movementModel, productModel) {
        this.movementModel = movementModel;
        this.productModel = productModel;
    }
    async create(createMovementDto) {
        const { clientRequestId, productId } = createMovementDto;
        const existing = await this.movementModel.findOne({ clientRequestId });
        if (existing) {
            return existing;
        }
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        const createdMovement = new this.movementModel(createMovementDto);
        return createdMovement.save();
    }
    async findByProduct(productId) {
        return this.movementModel.find({ productId: new mongoose_2.Types.ObjectId(productId) }).sort({ createdAt: -1 }).exec();
    }
};
exports.MovementsService = MovementsService;
exports.MovementsService = MovementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movement_schema_1.Movement.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MovementsService);
//# sourceMappingURL=movements.service.js.map