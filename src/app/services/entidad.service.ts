import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entidad } from '../models/entidad';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EntidadService {
  apiUrl: string = environment.API_URL + '/tenant/entidad';

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

  getEntidades(): Observable<Entidad[]> {
    return this.http.get<Entidad[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  postEntidad(entidad: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entidad, {
      headers: this.getHeaders(),
    });
  }
}
