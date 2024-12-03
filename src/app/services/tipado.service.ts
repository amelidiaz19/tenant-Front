import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipadoDocumentos } from '../models/tipado';

@Injectable({
  providedIn: 'root',
})
export class TipadoService {
  private Url = environment.API_URL + '/facturacion/tipado';

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });

  getTipadoDocumentos(): Observable<TipadoDocumentos> {
    return this.http.get<TipadoDocumentos>(this.Url, {
      headers: this.headers,
    });
  }

  private informacionSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  enviarInformacion(informacion: any): void {
    this.informacionSubject.next(informacion);
  }

  obtenerInformacion(): Observable<any> {
    return this.informacionSubject.asObservable();
  }
}
