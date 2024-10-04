import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfo } from "../models/user";
import { CompraResponse, RegistrarCompraRequest } from "../models/compra";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RegistroCompraService {
    private readonly Url = environment.API_URL + '/inventory/compra';
  
    constructor(private http: HttpClient) {}

    headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });
    
    registrar(compraRequest: RegistrarCompraRequest): Observable<any> {
      compraRequest.usuario_id = JSON.parse(localStorage.getItem('User')!).id;
      return this.http.post<any>(this.Url, compraRequest, {
        headers: this.headers,
      });
    }
    Listar(): Observable<CompraResponse[]> {
      return this.http.get<CompraResponse[]>(this.Url, { headers: this.headers });
    }
}