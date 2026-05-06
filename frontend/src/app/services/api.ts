import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = 'http://localhost:5001/api';

  constructor(private http: HttpClient) {}

  // Get Auth Headers
  private getHeaders() {
    const token = localStorage.getItem('parkping_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Auth Methods
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, userData);
  }

  // Vehicle Methods
  getVehicles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles`, { headers: this.getHeaders() });
  }

  addVehicle(vehicleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicles`, vehicleData, { headers: this.getHeaders() });
  }

  getVehicleByQrId(qrId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles/scan/${qrId}`);
  }

  // Request Methods
  getRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/requests`, { headers: this.getHeaders() });
  }

  sendAlert(qrId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests/${qrId}`, {});
  }
}
