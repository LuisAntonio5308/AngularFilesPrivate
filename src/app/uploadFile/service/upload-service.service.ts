import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
  private API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getToken() {
    return this.http.get<any>(`${this.API}/login`);
  }

  getArchivo(nombre: string, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.API}/archivo/${nombre}`, { headers, responseType: 'blob' });
  }
}
