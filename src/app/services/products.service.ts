import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByPage(limit: number, offset: number) {
    return (
      this.http
        .get<Product[]>(`${this.apiUrl}`, {
          params: { limit, offset },
        })
        // Intenta realizar una petición 3 veces si llega a dar un 404
        .pipe(retry(3))
    );
  }

  getProductId(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}`, dto);
  }

  updateProduct(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
