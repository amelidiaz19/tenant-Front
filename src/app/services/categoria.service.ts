import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CategoriaRequest, CategoriaResponse } from "../models/categoria";
import { Observable } from "rxjs";
import { SubCategoriaRequest, SubCategoriaResponse } from "../models/subcategoria";
import { CategoriaMarcaRequest } from "../models/categoria-marca";

export class CategoriaService {

    apiUrl: string = environment.API_URL+"/inventory/categoria";
    Url: string = environment.API_URL+"/inventory/subcategoria";
  
    constructor(private http:HttpClient) {}

    headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });

    getAll(): Observable<CategoriaResponse[]> {
      return this.http.get<CategoriaResponse[]>(this.apiUrl);
    }
  
    postCategoria(categoria: CategoriaRequest): Observable<any> {
      return this.http.post<CategoriaRequest>(`${this.apiUrl}`, categoria, {headers: this.headers});
    }
  
    postSubCategoria(subCategoria: SubCategoriaRequest): Observable<any> {
      return this.http.post<any>(`${this.Url}`, subCategoria, {headers: this.headers});
    }
  
    getSubs(id: number): Observable<SubCategoriaResponse[]> {
      return this.http.get<SubCategoriaResponse[]>(`${this.apiUrl}/subs/${id}`, {headers: this.headers});
    }
  
    actualizarCategoria(id: number, categoria: CategoriaMarcaRequest): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, categoria, {headers: this.headers});
    }
}