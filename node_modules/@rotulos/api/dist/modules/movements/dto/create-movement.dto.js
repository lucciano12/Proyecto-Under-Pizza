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
exports.CreateMovementDto = void 0;
const class_validator_1 = require("class-validator");
const shared_1 = require("@rotulos/shared");
const swagger_1 = require("@nestjs/swagger");
class CreateMovementDto {
    clientRequestId;
    productId;
    type;
    quantity;
    notes;
    performedBy;
}
exports.CreateMovementDto = CreateMovementDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for idempotency',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "clientRequestId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product associated with the movement',
        example: '60d5f9b8c2a1a4567890abcd',
    }),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(shared_1.MovementType),
    (0, swagger_1.ApiProperty)({
        description: 'Type of movement (IN or OUT)',
        example: 'IN',
    }),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of the movement (must be greater than 0)',
        example: 10,
    }),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateMovementDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Optional notes about the movement',
        example: 'Received new stock from supplier',
    }),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user who performed the movement',
        example: '60d5f9b8c2a1a4567890abcd',
    }),
    __metadata("design:type", String)
], CreateMovementDto.prototype, "performedBy", void 0);
//# sourceMappingURL=create-movement.dto.js.map