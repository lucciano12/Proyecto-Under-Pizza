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
exports.CreateProductDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const parseDdMmYyyy = (value) => {
    if (!value)
        return value;
    const [day, month, year] = value.split('/');
    return new Date(`${year}-${month}-${day}`).toISOString();
};
class CreateProductDto {
    name;
    category;
    initialQuantity;
    description;
    isActive;
    issuedAt;
    expiresAt;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Name of the product' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Category of the product' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Initial quantity of the product',
        required: false,
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "initialQuantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Description of the product',
        required: false,
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Whether the product is active',
        required: false,
    }),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{2}\/\d{2}\/\d{4}$/, {
        message: 'issuedAt must be in format dd/mm/yyyy',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Date when the product was issued',
        required: false,
        example: '19/09/2026',
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "issuedAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\d{2}\/\d{2}\/\d{4}$/, {
        message: 'expiresAt must be in format dd/mm/yyyy',
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Expiration date of the product',
        required: false,
        example: '19/09/2026',
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "expiresAt", void 0);
//# sourceMappingURL=create-product.dto.js.map