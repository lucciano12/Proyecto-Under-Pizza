import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IProduct, IMovement, ICategory } from './types';
import { API_BASE_URL_DEFAULT } from './constants';

export class RotulosApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL_DEFAULT) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Products
  async getProducts(): Promise<IProduct[]> {
    const res = await this.client.get<IProduct[]>('/products');
    return res.data;
  }

  async getProductByQr(qrId: string): Promise<IProduct> {
    const res = await this.client.get<IProduct>(`/products/by-qr/${qrId}`);
    return res.data;
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    const res = await this.client.post<IProduct>('/products', data);
    return res.data;
  }

  async getProductStock(id: string): Promise<{ stock: number }> {
    const res = await this.client.get<{ stock: number }>(`/products/${id}/stock`);
    return res.data;
  }

  // Movements
  async createMovement(data: Partial<IMovement>): Promise<IMovement> {
    const res = await this.client.post<IMovement>('/movements', data);
    return res.data;
  }

  async getMovements(productId: string): Promise<IMovement[]> {
    const res = await this.client.get<IMovement[]>(`/movements/${productId}`);
    return res.data;
  }

  // Categories
  async getCategories(): Promise<ICategory[]> {
    const res = await this.client.get<ICategory[]>('/categories');
    return res.data;
  }

  async createCategory(data: Partial<ICategory>): Promise<ICategory> {
    const res = await this.client.post<ICategory>('/categories', data);
    return res.data;
  }
}
