import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ProductoResponse } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  apiUrl: string = environment.API_URL + '/inventario/producto';
  tenantId: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.usuario$.subscribe((usuario) => {
      this.tenantId = usuario.TenantId; // Guardar el tenantId en una propiedad
      console.log('Tenant ID:', this.tenantId);
    });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      tenantid: this.tenantId || '', // Utilizar el valor del tenantId capturado
    });
  }
  getListaProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  getListaProductosFact(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fact`, {
      headers: this.getHeaders(),
    });
  }

  postNuevoProducto(productoNuevo: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, productoNuevo, {
      headers: this.getHeaders(),
    });
  }

  putProducto(productoNuevo: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, productoNuevo, {
      headers: this.getHeaders(),
    });
  }

  getProductoById(id: string): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(`${this.apiUrl}/${id}`);
  }

  deleteProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getListadoCategoriaProducto(limit: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/CategoriaProducto?limit=${limit}`
    );
  }
}
