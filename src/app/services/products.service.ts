import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from './../models/product.model';

import { environment } from './../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/v1/products`;

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
    // Se utiliza .pipe() para manipular los datos que el observable emite antes que lleguen al componente
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error ->', error);
        if (error.status === HttpStatusCode.BadRequest) {
          return throwError(`Hay un request mal hecho: ${error.statusText}`);
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(
            `No tienes permitido entrar al sitio requerido: ${error.statusText}`
          );
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(
            `Algo ocurrió mal para ser un not found: ${error.statusText}`
          );
        }
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(`Hay un conflicto: ${error.statusText}`);
        }
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError(
            `Algo está fallando en el server: ${error.statusText}`
          );
        }

        return throwError(`Algo ha salido mal: ${error.message}`);
      })
    );
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
