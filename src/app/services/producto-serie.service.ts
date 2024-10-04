import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductoSerieResponse } from "../models/producto-serie";
import { Observable } from "rxjs";
import { ProductoResponse } from "../models/producto";

@Injectable({
    providedIn: 'root',
})

export class ProductoSerieService {
    apiUrl: string = environment.API_URL + '/inventory/productoserie';
  
    constructor(private http: HttpClient) {}
    
    headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    getListaProductoSerie(): Observable<ProductoSerieResponse[]> {
      return this.http.get<ProductoSerieResponse[]>(this.apiUrl);
    }

    getProductoSerie(serie: string): Observable<ProductoResponse> {
      return this.http.get<ProductoResponse>(`${this.apiUrl}/belong/${serie}`, {
        headers: this.headers,
      });
    }
  
    getSeriesByProductoId(
      id_producto: string | null | undefined,
    ): Observable<ProductoSerieResponse[]> {
      return this.http.get<ProductoSerieResponse[]>(
        `${this.apiUrl}/stock/${id_producto}`,
        { headers: this.headers },
      );
    }
}
  