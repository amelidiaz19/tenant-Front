import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { PedidoResponse } from "../models/pedido";
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    private readonly Url = environment.API_URL + '/inventory/pedidos';
    
    tenantId: string | null = null;
    constructor(private http: HttpClient, private authService: AuthService) {
      this.authService.usuario$.subscribe((usuario) => {
        this.tenantId = usuario.tenantId; 
        console.log('Tenant ID:', this.tenantId);
      });
    }

    getHeaders(): HttpHeaders {
      return new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        tenantId: this.tenantId || '', // Utilizar el valor del tenantId capturado
      });
    }
    
    registrar(pedidoRequest: any): Observable<void> {
      return this.http.post<void>(this.Url, pedidoRequest, {
        headers: this.getHeaders(),
      });
    }

    listar(): Observable<any> {
      return this.http.get<any>(this.Url, { headers: this.getHeaders() });
    }

    getPedidosByUsername(): Observable<any> {
      return this.http.get<any>(`${this.Url}`, { headers: this.getHeaders() });
    }

    aplicarcambio(pedido: PedidoResponse): Observable<void> {
      return this.http.put<void>(`${this.Url}`, pedido, {
        headers: this.getHeaders(),
      });
    }
}