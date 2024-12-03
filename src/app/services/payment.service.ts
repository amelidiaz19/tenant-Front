import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.API_URL + '/tenant/payment';
  headersAuthorization: HttpHeaders;
  headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.authService.getHeaders();
    this.headersAuthorization = this.authService.getHeadersAuthorization();
  }

  postExternalData(paymentData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/external-data`,
      JSON.stringify(paymentData),
      { headers: this.headers.append('Content-Type', 'application/json') }
    );
  }
  validatePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate`, paymentData, {
      headers: this.headers,
    });
  }
  getPublicKey(): Observable<any> {
    return this.http.get(`${this.apiUrl}/public-key`, {
      headers: this.headers,
    });
  }
}
