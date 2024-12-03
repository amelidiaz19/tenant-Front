import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tenant } from '../models/Tenant';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  apiUrl: string = environment.API_URL + '/tenant';
  tenantSubject = new BehaviorSubject<Tenant | null>(null);
  constructor(private http: HttpClient) {}
  get tenant$(): Observable<Tenant | null> {
    return this.tenantSubject.asObservable();
  }
  loadTenant(): Observable<Tenant> {
    //const domain = 'fryzan.com';
    const domain = window.location.hostname;
    return this.http.get<Tenant>(`${this.apiUrl}/tenant/${domain}`).pipe(
      tap((tenantInfo) => {
        this.tenantSubject.next(tenantInfo);
      })
    );
  }
  postPasarela(pasarela: any) {
    let headers = new HttpHeaders();
    this.tenantSubject.asObservable().subscribe((res) => {
      headers = new HttpHeaders({
        tenantid: res?.id || '',
      });
    });

    return this.http.post(`${this.apiUrl}/tenant/pasarela`, pasarela, {
      headers: headers,
    });
  }
}
