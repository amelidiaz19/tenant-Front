import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../models/user';
import { CompraResponse, RegistrarCompraRequest } from '../models/compra';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroCompraService {
  private readonly Url = environment.API_URL + '/inventory/compra';

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

  registrar(compraRequest: RegistrarCompraRequest): Observable<any> {
    compraRequest.usuario_id = JSON.parse(localStorage.getItem('User')!).id;
    return this.http.post<any>(this.Url, compraRequest, {
      headers: this.getHeaders(),
    });
  }
  Listar(): Observable<CompraResponse[]> {
    return this.http.get<CompraResponse[]>(this.Url, {
      headers: this.getHeaders(),
    });
  }
}
