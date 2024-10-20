import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegistrarVentaRequest, VentaResponse } from '../models/venta';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroVentaService {
  private readonly Url = environment.API_URL + '/inventory/venta';

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
  registrar(ventaRequest: RegistrarVentaRequest): Observable<any> {
    ventaRequest.usuario_id = JSON.parse(localStorage.getItem('User')!).id;
    return this.http.post<any>(this.Url, ventaRequest, {
      headers: this.getHeaders(),
    });
  }
  Listar(): Observable<VentaResponse[]> {
    return this.http.get<VentaResponse[]>(this.Url, {
      headers: this.getHeaders(),
    });
  }
}
