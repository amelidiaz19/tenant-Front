import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { RegistrarVentaRequest, VentaResponse } from "../models/venta";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RegistroVentaService {
    private readonly Url = environment.API_URL + '/inventory/venta';
  
    constructor(private http: HttpClient) {}

    headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });
    registrar(ventaRequest: RegistrarVentaRequest): Observable<any> {
      ventaRequest.usuario_id = JSON.parse(localStorage.getItem('User')!).id;
      return this.http.post<any>(this.Url, ventaRequest, {
        headers: this.headers,
      });
    }
    Listar(): Observable<VentaResponse[]> {
      return this.http.get<VentaResponse[]>(this.Url, { headers: this.headers });
    }
}