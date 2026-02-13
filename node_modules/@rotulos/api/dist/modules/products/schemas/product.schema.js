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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Product = class Product {
    qrId;
    name;
    category;
    initialQuantity;
    description;
    isActive;
    issuedAt;
    expiresAt;
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    (0, swagger_1.ApiProperty)({
        description: 'QR code identifier for the product',
        example: 'QR1234567890',
    }),
    __metadata("design:type", String)
], Product.prototype, "qrId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Name of the product',
        example: 'Coca-Cola 500ml',
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Category of the product',
        example: 'Beverages',
    }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    (0, swagger_1.ApiProperty)({
        description: 'Initial quantity of the product in stock',
        example: 100,
    }),
    __metadata("design:type", Number)
], Product.prototype, "initialQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)({
        description: 'Description of the product',
        example: 'A refreshing carbonated soft drink.',
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the product is active',
        example: true,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    (0, swagger_1.ApiProperty)({
        description: 'Date when the product was issued',
        example: '2024-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], Product.prototype, "issuedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    (0, swagger_1.ApiProperty)({
        description: 'Date when the product expires',
        example: '2024-12-31T23:59:59.000Z',
    }),
    __metadata("design:type", Date)
], Product.prototype, "expiresAt", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.schema.js.map