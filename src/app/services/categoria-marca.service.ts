import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriaMarcaRequest } from '../models/categoria-marca';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriamarcaService {
  apiUrl: string = environment.API_URL + '/inventory/categoriamarca';

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

  getCategoriaMarcas(): Observable<CategoriaMarcaRequest[]> {
    return this.http.get<CategoriaMarcaRequest[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  deleteCategoriaMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
