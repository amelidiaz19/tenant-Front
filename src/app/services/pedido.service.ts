import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { PedidoResponse } from "../models/pedido";

@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    private readonly Url = environment.API_URL + '/inventory/pedidos';
  
    constructor(private http: HttpClient) {}

    headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });
    
    registrar(pedidoRequest: any): Observable<void> {
      return this.http.post<void>(this.Url, pedidoRequest, {
        headers: this.headers,
      });
    }

    listar(): Observable<any> {
      return this.http.get<any>(this.Url, { headers: this.headers });
    }

    getPedidosByUsername(): Observable<any> {
      return this.http.get<any>(`${this.Url}`, { headers: this.headers });
    }

    aplicarcambio(pedido: PedidoResponse): Observable<void> {
      return this.http.put<void>(`${this.Url}`, pedido, {
        headers: this.headers,
      });
    }
}