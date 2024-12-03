import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Tenant } from '../models/Tenant';
import { TenantService } from './tenant.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.API_URL + '/tenant';

  public usuarioSubject = new BehaviorSubject<any | null>(null);
  public usuario$ = this.usuarioSubject.asObservable();
  public tenantId$ = this.usuario$.pipe(map((user) => user?.TenantId || null));
  tenant: Tenant | null = null;
  constructor(private http: HttpClient, private tenantService: TenantService) {
    this.cargarUsuario();
    this.tenantService.tenant$.subscribe((tenantInfo: Tenant | null) => {
      this.tenant = tenantInfo;
    });
  }

  cargarUsuario() {
    const token = this.getToken();
    if (token) {
      this.isLoggedIn().subscribe(
        (res) => {
          console.log(res);
          if (res.estado) {
            this.usuarioSubject.next(res.user);
          } else {
            this.logout();
          }
        },
        (error) => {
          console.error('Error al cargar el usuario', error);
          this.logout();
        }
      );
    }
  }

  register(registerRequest: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/entidad/register`, registerRequest)
      .pipe(
        tap((response) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('rol', response.rol);
          localStorage.setItem('User', JSON.stringify(response.usuario));
          this.usuarioSubject.next(response.user);
        })
      );
  }
  registerNewTenant(datos: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tenant`, datos).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('User', JSON.stringify(response.usuario));
        this.usuarioSubject.next(response.user);
      })
    );
  }
  registerNewTenantFormData(datos: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tenant/2`, datos).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('User', JSON.stringify(response.usuario));
        this.usuarioSubject.next(response.user);
      })
    );
  }
  create(registerRequest: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/entidad/register`,
      registerRequest
    );
  }

  isLoggedIn(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return of({ estado: false, rol: '', user: null });
    }
    const request = { token };
    return this.http.post<any>(`${this.apiUrl}/entidad/validate`, request).pipe(
      map((res) => ({
        estado: res.estado,
        rol: res.rol,
        user: res.usuario,
      }))
    );
  }

  Logged(email: string, password: string): Observable<any> {
    const loginRequest = {
      email,
      password,
    };
    return this.http
      .post<any>(`${this.apiUrl}/entidad/login`, loginRequest)
      .pipe(
        tap((response) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('rol', response.rol);
          localStorage.setItem('User', JSON.stringify(response.usuario));
          this.usuarioSubject.next(response.usuario);
        })
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rol');
    localStorage.removeItem('User');
    this.usuarioSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getRol(): string | null {
    return localStorage.getItem('rol');
  }
  getUsuario(): any | null {
    const user = localStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  }
  getHeadersAuthorization(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      tenantid: this.tenant?.id || '', // Utilizar el valor del tenantId capturado
    });
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      tenantid: this.tenant?.id || '',
    });
  }
}
