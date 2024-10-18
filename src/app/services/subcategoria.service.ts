import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubCategoriaResponse } from '../models/subcategoria';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriaService {
  apiUrl: string = environment.API_URL + '/inventory/subcategoria';

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
  getSubCategorias(): Observable<SubCategoriaResponse[]> {
    return this.http.get<SubCategoriaResponse[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  deleteSubCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
