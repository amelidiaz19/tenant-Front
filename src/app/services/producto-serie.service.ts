import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductoSerieResponse } from "../models/producto-serie";
import { Observable } from "rxjs";
import { ProductoResponse } from "../models/producto";
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class ProductoSerieService {
    apiUrl: string = environment.API_URL + '/inventory/productoserie';
  
    tenantId: string | null = null;
    constructor(private http: HttpClient, private authService: AuthService) {
      this.authService.usuario$.subscribe((usuario) => {
        this.tenantId = usuario.tenantId; // Guardar el tenantId en una propiedad
        console.log('Tenant ID:', this.tenantId);
      });
    }
    
    getHeaders(): HttpHeaders {
      return new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        tenantId: this.tenantId || '', // Utilizar el valor del tenantId capturado
      });
    }

    getListaProductoSerie(): Observable<ProductoSerieResponse[]> {
      return this.http.get<ProductoSerieResponse[]>(this.apiUrl);
    }

    getProductoSerie(serie: string): Observable<ProductoResponse> {
      return this.http.get<ProductoResponse>(`${this.apiUrl}/belong/${serie}`, {
        headers: this.getHeaders(),
      });
    }
  
    getSeriesByProductoId(
      id_producto: string | null | undefined,
    ): Observable<ProductoSerieResponse[]> {
      return this.http.get<ProductoSerieResponse[]>(
        `${this.apiUrl}/stock/${id_producto}`,
        { headers: this.getHeaders() },
      );
    }
}
  