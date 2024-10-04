import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Entidad } from "../models/entidad";

@Injectable({
    providedIn: 'root',
})
export class EntidadService {
    apiUrl: string = environment.API_URL;
  
    constructor(private http: HttpClient) {}
    headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    getEntidades(): Observable<Entidad[]> {
      return this.http.get<Entidad[]>(this.apiUrl + '/inventory/entidad', {
        headers: this.headers,
      });
    }
  
    postEntidad(entidad: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/inventory/entidad`, entidad, {
        headers: this.headers,
      });
    }
}
  