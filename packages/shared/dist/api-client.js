"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotulosApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
class RotulosApiClient {
    constructor(baseURL = constants_1.API_BASE_URL_DEFAULT) {
        this.client = axios_1.default.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    // Products
    async getProducts() {
        const res = await this.client.get('/products');
        return res.data;
    }
    async getProductByQr(qrId) {
        const res = await this.client.get(`/products/by-qr/${qrId}`);
        return res.data;
    }
    async createProduct(data) {
        const res = await this.client.post('/products', data);
        return res.data;
    }
    async getProductStock(id) {
        const res = await this.client.get(`/products/${id}/stock`);
        return res.data;
    }
    // Movements
    async createMovement(data) {
        const res = await this.client.post('/movements', data);
        return res.data;
    }
    async getMovements(productId) {
        const res = await this.client.get(`/movements/${productId}`);
        return res.data;
    }
    // Categories
    async getCategories() {
        const res = await this.client.get('/categories');
        return res.data;
    }
    async createCategory(data) {
        const res = await this.client.post('/categories', data);
        return res.data;
    }
}
exports.RotulosApiClient = RotulosApiClient;
