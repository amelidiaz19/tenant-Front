import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MarcaRequest, MarcaResponse } from "../models/marca";
import { Observable } from "rxjs";
import { CategoriaMarcaRequest, CategoriaMarcaResponse } from "../models/categoria-marca";

@Injectable({
    providedIn: 'root'
})
export class MarcaService {
  
    apiUrl: string = environment.API_URL+"/inventory/marca";
    Url: string = environment.API_URL+"/inventory/categoriamarca";
  
    constructor(private http: HttpClient) {}
    headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    getAll(): Observable<MarcaResponse[]> {
      return this.http.get<MarcaResponse[]>(this.apiUrl);
    }
  
    postMarca(categoria: MarcaRequest): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, categoria, {headers: this.headers});
    }
  
    postCategoriaMarca(categoriaMarca:CategoriaMarcaRequest): Observable<any> {
      return this.http.post<any>(`${this.Url}`, categoriaMarca, {headers: this.headers});
    }
  
    getSubs(id: number): Observable<CategoriaMarcaResponse[]> {
      return this.http.get<CategoriaMarcaResponse[]>(`${this.apiUrl}/subs/${id}`, {headers: this.headers});
    }
}